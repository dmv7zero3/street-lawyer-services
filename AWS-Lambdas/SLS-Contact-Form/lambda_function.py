"""
AWS Lambda Function for Contact Form Processing
Handles form submissions with rate limiting, validation, and email notifications
"""

import json
import os
import logging
from datetime import datetime

# Import modules
from validation import validate_contact_form, check_honeypot
from rate_limiting import check_rate_limit
from storage import save_to_dynamodb
from email_service import send_emails

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Environment variables
WEBSITE_NAME = os.environ.get('WEBSITE_NAME', 'Your Website')
WEBSITE_URL = os.environ.get('WEBSITE_URL', 'https://yourwebsite.com')
TABLE_NAME = os.environ.get('TABLE_NAME', 'contact-form-submissions')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'admin@yourwebsite.com')

def lambda_handler(event, context):
    """
    Main handler for contact form submissions
    Matches frontend ContactForm component expectations
    """
    try:
        # Handle CORS preflight
        if event.get('httpMethod') == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': get_cors_headers(),
                'body': ''
            }
        
        # Parse request body
        body = parse_request_body(event)
        
        # Extract IP address for rate limiting
        ip_address = extract_ip_address(event)
        
        # Check rate limiting
        is_allowed, rate_limit_message, retry_after = check_rate_limit(ip_address)
        if not is_allowed:
            logger.warning(f"Rate limit exceeded for IP: {ip_address}")
            return create_response(
                status_code=429,
                success=False,
                message=rate_limit_message,
                error_code='RATE_LIMIT',
                retry_after=retry_after
            )
        
        # Check honeypot (bot protection)
        if not check_honeypot(body):
            logger.warning(f"Bot detected via honeypot from IP: {ip_address}")
            # Return success to confuse bots, but don't process
            return create_response(
                status_code=200,
                success=True,
                message="Your message has been sent successfully."
            )
        
        # Validate form data
        validation_errors = validate_contact_form(body)
        if validation_errors:
            logger.info(f"Validation failed: {validation_errors}")
            return create_response(
                status_code=400,
                success=False,
                message="Please check your form and try again.",
                error_code='VALIDATION',
                errors=validation_errors
            )
        
        # Prepare form data for storage
        form_data = {
            'name': body.get('name', ''),
            'email': body.get('email', '').lower().strip(),
            'phone': body.get('phone', ''),
            'company': body.get('company', ''),
            'subject': body.get('subject', ''),
            'message': body.get('message', ''),
            'metadata': {
                'submittedAt': datetime.now().isoformat(),
                'ipAddress': ip_address,
                'userAgent': event.get('headers', {}).get('User-Agent', ''),
                'sourceUrl': event.get('headers', {}).get('Referer', '')
            }
        }
        
        # Save to DynamoDB
        try:
            form_id = save_to_dynamodb(form_data, TABLE_NAME)
            logger.info(f"Form saved with ID: {form_id}")
        except Exception as e:
            logger.error(f"Database error: {str(e)}")
            return create_response(
                status_code=500,
                success=False,
                message="Failed to process your submission. Please try again.",
                error_code='SERVER_ERROR'
            )
        
        # Send emails (non-blocking - don't fail if email fails)
        try:
            send_emails(
                form_data=form_data,
                form_id=form_id,
                website_name=WEBSITE_NAME,
                website_url=WEBSITE_URL,
                notification_email=NOTIFICATION_EMAIL
            )
        except Exception as e:
            logger.error(f"Email sending failed: {str(e)}")
            # Continue - don't fail the submission
        
        # Return success response
        return create_response(
            status_code=200,
            success=True,
            message="Your message has been sent successfully. We'll get back to you soon.",
            form_id=form_id
        )
        
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return create_response(
            status_code=500,
            success=False,
            message="An unexpected error occurred. Please try again later.",
            error_code='SERVER_ERROR'
        )

def parse_request_body(event):
    """Parse and return request body from Lambda event"""
    try:
        if isinstance(event.get('body'), str):
            return json.loads(event['body'])
        elif event.get('body'):
            return event['body']
        else:
            return {}
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse request body: {str(e)}")
        return {}

def extract_ip_address(event):
    """Extract client IP address from Lambda event"""
    # Try multiple sources for IP address
    ip = event.get('requestContext', {}).get('identity', {}).get('sourceIp')
    if not ip:
        ip = event.get('headers', {}).get('X-Forwarded-For', '').split(',')[0].strip()
    if not ip:
        ip = event.get('headers', {}).get('X-Real-IP', '')
    
    return ip or 'unknown'

def get_cors_headers():
    """Return CORS headers for responses"""
    return {
        'Access-Control-Allow-Origin': '*',  # Update to your domain in production
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Max-Age': '86400'
    }

def create_response(status_code, success, message, error_code=None, retry_after=None, errors=None, form_id=None):
    """
    Create standardized Lambda response matching frontend expectations
    
    Args:
        status_code: HTTP status code
        success: Boolean success flag
        message: User-friendly message
        error_code: One of 'RATE_LIMIT', 'VALIDATION', 'SPAM_DETECTED', 'SERVER_ERROR'
        retry_after: Minutes until retry allowed (for rate limiting)
        errors: Validation errors object
        form_id: Unique form submission ID
    """
    body = {
        'success': success,
        'message': message
    }
    
    if error_code:
        body['errorCode'] = error_code
    
    if retry_after is not None:
        body['retryAfter'] = retry_after
    
    if errors:
        body['errors'] = errors
    
    if form_id:
        body['formId'] = form_id
    
    return {
        'statusCode': status_code,
        'headers': get_cors_headers(),
        'body': json.dumps(body)
    }