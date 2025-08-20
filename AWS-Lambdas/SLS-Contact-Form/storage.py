"""
Storage Module for Contact Form Lambda
Handles saving form submissions to DynamoDB
"""

import os
import boto3
import logging
import uuid
from datetime import datetime
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')

def save_to_dynamodb(form_data, table_name):
    """
    Save contact form submission to DynamoDB
    
    Args:
        form_data: Validated and sanitized form data
        table_name: DynamoDB table name
        
    Returns:
        Unique form ID
        
    Raises:
        Exception if save fails
    """
    try:
        table = dynamodb.Table(table_name)
        
        # Generate unique form ID
        form_id = f"CONTACT_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:8]}"
        
        # Prepare item for DynamoDB
        item = {
            'formId': form_id,
            'timestamp': datetime.now().isoformat(),
            'name': form_data.get('name', ''),
            'email': form_data.get('email', ''),
            'phone': form_data.get('phone', ''),
            'company': form_data.get('company', ''),
            'subject': form_data.get('subject', ''),
            'message': form_data.get('message', ''),
            'status': 'new',
            'formType': 'contact'
        }
        
        # Add metadata if present
        if form_data.get('metadata'):
            item['metadata'] = form_data['metadata']
        
        # Save to DynamoDB
        table.put_item(Item=item)
        
        logger.info(f"Contact form saved with ID: {form_id}")
        return form_id
        
    except ClientError as e:
        logger.error(f"DynamoDB error saving form: {str(e)}")
        raise Exception("Failed to save form submission")
    except Exception as e:
        logger.error(f"Unexpected error saving form: {str(e)}")
        raise Exception("Failed to save form submission")

def get_form_by_id(form_id, table_name):
    """
    Retrieve a form submission by ID
    
    Args:
        form_id: Unique form identifier
        table_name: DynamoDB table name
        
    Returns:
        Form data dict or None if not found
    """
    try:
        table = dynamodb.Table(table_name)
        
        response = table.get_item(
            Key={'formId': form_id}
        )
        
        if 'Item' in response:
            return response['Item']
        return None
        
    except ClientError as e:
        logger.error(f"Error retrieving form {form_id}: {str(e)}")
        return None

def update_form_status(form_id, status, table_name):
    """
    Update the status of a form submission
    
    Args:
        form_id: Unique form identifier
        status: New status (e.g., 'processed', 'replied', 'spam')
        table_name: DynamoDB table name
        
    Returns:
        Boolean indicating success
    """
    try:
        table = dynamodb.Table(table_name)
        
        table.update_item(
            Key={'formId': form_id},
            UpdateExpression='SET #status = :status, #updated = :updated',
            ExpressionAttributeNames={
                '#status': 'status',
                '#updated': 'lastUpdated'
            },
            ExpressionAttributeValues={
                ':status': status,
                ':updated': datetime.now().isoformat()
            }
        )
        
        logger.info(f"Updated form {form_id} status to {status}")
        return True
        
    except ClientError as e:
        logger.error(f"Error updating form status: {str(e)}")
        return False

def create_contact_form_table(table_name):
    """
    Create DynamoDB table for contact forms (run this once during setup)
    This is a helper function for initial setup, not used during runtime
    """
    dynamodb_client = boto3.client('dynamodb')
    
    try:
        response = dynamodb_client.create_table(
            TableName=table_name,
            KeySchema=[
                {
                    'AttributeName': 'formId',
                    'KeyType': 'HASH'  # Partition key
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'formId',
                    'AttributeType': 'S'
                }
            ],
            BillingMode='PAY_PER_REQUEST',  # On-demand pricing
            Tags=[
                {
                    'Key': 'Purpose',
                    'Value': 'ContactFormSubmissions'
                }
            ]
        )
        
        print(f"Table {table_name} created successfully")
        return response
        
    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceInUseException':
            print(f"Table {table_name} already exists")
        else:
            print(f"Error creating table: {str(e)}")
            raise