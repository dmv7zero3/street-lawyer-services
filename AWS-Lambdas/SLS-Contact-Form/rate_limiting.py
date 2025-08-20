"""
Rate Limiting Module for Contact Form Lambda
Uses DynamoDB for distributed rate limiting across Lambda invocations
"""

import os
import boto3
import logging
from datetime import datetime, timedelta
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')

# Configuration
RATE_LIMIT_TABLE = os.environ.get('RATE_LIMIT_TABLE', 'contact-form-rate-limits')
HOURLY_LIMIT = int(os.environ.get('MAX_HOURLY_SUBMISSIONS', '5'))
DAILY_LIMIT = int(os.environ.get('MAX_DAILY_SUBMISSIONS', '10'))

def check_rate_limit(ip_address):
    """
    Check if IP address has exceeded rate limits
    
    Args:
        ip_address: Client IP address
        
    Returns:
        Tuple (is_allowed, message, retry_after_minutes)
    """
    if not ip_address or ip_address == 'unknown':
        logger.warning("Unknown IP address, allowing request")
        return True, None, None
    
    try:
        table = dynamodb.Table(RATE_LIMIT_TABLE)
        current_time = datetime.now()
        
        # Create rate limit keys
        hour_key = f"{ip_address}#{current_time.strftime('%Y%m%d%H')}"
        day_key = f"{ip_address}#{current_time.strftime('%Y%m%d')}"
        
        # Check hourly limit
        hourly_count = get_submission_count(table, hour_key)
        if hourly_count >= HOURLY_LIMIT:
            retry_after = 60  # Try again in 60 minutes
            message = f"Too many submissions this hour ({hourly_count}/{HOURLY_LIMIT})"
            logger.warning(f"Hourly rate limit exceeded for {ip_address}")
            return False, message, retry_after
        
        # Check daily limit
        daily_count = get_submission_count(table, day_key)
        if daily_count >= DAILY_LIMIT:
            # Calculate minutes until midnight
            tomorrow = current_time + timedelta(days=1)
            midnight = tomorrow.replace(hour=0, minute=0, second=0, microsecond=0)
            minutes_until_midnight = int((midnight - current_time).total_seconds() / 60)
            
            message = f"Daily submission limit reached ({daily_count}/{DAILY_LIMIT})"
            logger.warning(f"Daily rate limit exceeded for {ip_address}")
            return False, message, minutes_until_midnight
        
        # Update counters
        update_submission_count(table, hour_key, hourly_count + 1, 7200)  # 2 hour TTL
        update_submission_count(table, day_key, daily_count + 1, 172800)  # 2 day TTL
        
        logger.info(f"Rate limit passed for {ip_address}: hour={hourly_count+1}/{HOURLY_LIMIT}, day={daily_count+1}/{DAILY_LIMIT}")
        return True, None, None
        
    except ClientError as e:
        logger.error(f"DynamoDB error in rate limiting: {str(e)}")
        # Fail open - allow request if rate limiting fails
        return True, None, None
    except Exception as e:
        logger.error(f"Unexpected error in rate limiting: {str(e)}")
        return True, None, None

def get_submission_count(table, rate_key):
    """
    Get current submission count for a rate limit key
    
    Args:
        table: DynamoDB table
        rate_key: Rate limiting key
        
    Returns:
        Current count
    """
    try:
        response = table.get_item(
            Key={'rate_key': rate_key}
        )
        
        if 'Item' in response:
            return response['Item'].get('submission_count', 0)
        return 0
        
    except ClientError as e:
        logger.error(f"Error getting submission count: {str(e)}")
        return 0

def update_submission_count(table, rate_key, new_count, ttl_seconds):
    """
    Update submission count with TTL for automatic cleanup
    
    Args:
        table: DynamoDB table
        rate_key: Rate limiting key
        new_count: New submission count
        ttl_seconds: TTL in seconds
    """
    try:
        expires_at = int((datetime.now() + timedelta(seconds=ttl_seconds)).timestamp())
        
        table.put_item(
            Item={
                'rate_key': rate_key,
                'submission_count': new_count,
                'expires_at': expires_at,
                'last_updated': datetime.now().isoformat()
            }
        )
        
    except ClientError as e:
        logger.error(f"Error updating submission count: {str(e)}")
        # Don't fail the request if we can't update the counter

def create_rate_limit_table():
    """
    Create DynamoDB table for rate limiting (run this once during setup)
    This is a helper function for initial setup, not used during runtime
    """
    dynamodb_client = boto3.client('dynamodb')
    
    try:
        response = dynamodb_client.create_table(
            TableName=RATE_LIMIT_TABLE,
            KeySchema=[
                {
                    'AttributeName': 'rate_key',
                    'KeyType': 'HASH'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'rate_key',
                    'AttributeType': 'S'
                }
            ],
            BillingMode='PAY_PER_REQUEST',
            TimeToLiveSpecification={
                'Enabled': True,
                'AttributeName': 'expires_at'
            }
        )
        
        print(f"Table {RATE_LIMIT_TABLE} created successfully")
        return response
        
    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceInUseException':
            print(f"Table {RATE_LIMIT_TABLE} already exists")
        else:
            print(f"Error creating table: {str(e)}")
            raise