"""
Email Service Module for Contact Form Lambda
Handles sending notification and confirmation emails via AWS SES
"""

import os
import boto3
import logging
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

# Initialize SES
ses = boto3.client('ses')

# Email configuration
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'noreply@yourwebsite.com')
SENDER_NAME = os.environ.get('SENDER_NAME', 'Your Website')

def send_emails(form_data, form_id, website_name, website_url, notification_email):
    """
    Send both notification and confirmation emails
    
    Args:
        form_data: Form submission data
        form_id: Unique form identifier
        website_name: Name of the website
        website_url: Website URL
        notification_email: Admin email for notifications
        
    Returns:
        Tuple (notification_sent, confirmation_sent)
    """
    notification_sent = False
    confirmation_sent = False
    
    # Send notification email to admin
    try:
        send_notification_email(form_data, form_id, website_name, website_url, notification_email)
        notification_sent = True
    except Exception as e:
        logger.error(f"Failed to send notification email: {str(e)}")
    
    # Send confirmation email to user
    try:
        send_confirmation_email(form_data, website_name, website_url)
        confirmation_sent = True
    except Exception as e:
        logger.error(f"Failed to send confirmation email: {str(e)}")
    
    return notification_sent, confirmation_sent

def send_notification_email(form_data, form_id, website_name, website_url, to_email):
    """
    Send notification email to admin about new submission
    
    Args:
        form_data: Form submission data
        form_id: Unique form identifier
        website_name: Name of the website
        website_url: Website URL
        to_email: Admin email address
    """
    subject = f"New Contact Form Submission - {website_name}"
    
    # HTML email body
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; color: #555; }}
            .value {{ margin-left: 10px; }}
            .message-box {{ background: #f8f9fa; padding: 15px; border-left: 3px solid #007bff; margin: 20px 0; }}
            .footer {{ margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Contact Form Submission</h2>
                <p>Form ID: <strong>{form_id}</strong></p>
            </div>
            
            <div class="field">
                <span class="label">Name:</span>
                <span class="value">{form_data.get('name', 'N/A')}</span>
            </div>
            
            <div class="field">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:{form_data.get('email', '')}">{form_data.get('email', 'N/A')}</a></span>
            </div>
            
            <div class="field">
                <span class="label">Phone:</span>
                <span class="value">{form_data.get('phone', 'Not provided')}</span>
            </div>
            
            <div class="field">
                <span class="label">Company:</span>
                <span class="value">{form_data.get('company', 'Not provided')}</span>
            </div>
            
            <div class="field">
                <span class="label">Subject:</span>
                <span class="value">{form_data.get('subject', 'N/A')}</span>
            </div>
            
            <div class="field">
                <span class="label">Message:</span>
            </div>
            <div class="message-box">
                {form_data.get('message', 'No message provided').replace(chr(10), '<br>')}
            </div>
            
            <div class="footer">
                <p>Submitted at: {form_data.get('metadata', {}).get('submittedAt', 'Unknown')}</p>
                <p>IP Address: {form_data.get('metadata', {}).get('ipAddress', 'Unknown')}</p>
                <p>&copy; {website_name} | <a href="{website_url}">{website_url}</a></p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Plain text version
    text_body = f"""
New Contact Form Submission

Form ID: {form_id}

Name: {form_data.get('name', 'N/A')}
Email: {form_data.get('email', 'N/A')}
Phone: {form_data.get('phone', 'Not provided')}
Company: {form_data.get('company', 'Not provided')}
Subject: {form_data.get('subject', 'N/A')}

Message:
{form_data.get('message', 'No message provided')}

---
Submitted at: {form_data.get('metadata', {}).get('submittedAt', 'Unknown')}
IP Address: {form_data.get('metadata', {}).get('ipAddress', 'Unknown')}

{website_name} | {website_url}
    """
    
    # Send email
    send_email(
        to_addresses=[to_email],
        subject=subject,
        html_body=html_body,
        text_body=text_body,
        reply_to=form_data.get('email')
    )

def send_confirmation_email(form_data, website_name, website_url):
    """
    Send confirmation email to the person who submitted the form
    
    Args:
        form_data: Form submission data
        website_name: Name of the website
        website_url: Website URL
    """
    user_email = form_data.get('email')
    if not user_email:
        logger.warning("No email address provided for confirmation email")
        return
    
    subject = f"Thank you for contacting {website_name}"
    user_name = form_data.get('name', 'there')
    
    # HTML email body
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: #007bff; color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }}
            .content {{ background: #fff; padding: 30px; border: 1px solid #dee2e6; border-radius: 0 0 5px 5px; }}
            .footer {{ margin-top: 30px; text-align: center; font-size: 12px; color: #6c757d; }}
            a {{ color: #007bff; text-decoration: none; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Thank You for Contacting Us!</h1>
            </div>
            
            <div class="content">
                <p>Hi {user_name},</p>
                
                <p>We've received your message and appreciate you taking the time to contact us.</p>
                
                <p>Our team will review your inquiry and get back to you as soon as possible, typically within 1-2 business days.</p>
                
                <p><strong>Your submission details:</strong></p>
                <ul>
                    <li>Subject: {form_data.get('subject', 'N/A')}</li>
                    <li>Message: {form_data.get('message', 'N/A')[:100]}{'...' if len(form_data.get('message', '')) > 100 else ''}</li>
                </ul>
                
                <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
                
                <p>Best regards,<br>
                The {website_name} Team</p>
            </div>
            
            <div class="footer">
                <p>&copy; {website_name} | <a href="{website_url}">{website_url}</a></p>
                <p>This is an automated message, please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Plain text version
    text_body = f"""
Hi {user_name},

Thank you for contacting {website_name}!

We've received your message and appreciate you taking the time to contact us.

Our team will review your inquiry and get back to you as soon as possible, typically within 1-2 business days.

Your submission details:
- Subject: {form_data.get('subject', 'N/A')}
- Message: {form_data.get('message', 'N/A')[:100]}{'...' if len(form_data.get('message', '')) > 100 else ''}

If you have any urgent questions, please don't hesitate to contact us directly.

Best regards,
The {website_name} Team

---
{website_name} | {website_url}
This is an automated message, please do not reply directly to this email.
    """
    
    # Send email
    send_email(
        to_addresses=[user_email],
        subject=subject,
        html_body=html_body,
        text_body=text_body
    )

def send_email(to_addresses, subject, html_body, text_body, reply_to=None):
    """
    Send email via AWS SES
    
    Args:
        to_addresses: List of recipient email addresses
        subject: Email subject
        html_body: HTML version of email
        text_body: Plain text version of email
        reply_to: Reply-to email address (optional)
        
    Raises:
        Exception if email sending fails
    """
    try:
        # Build email parameters
        email_params = {
            'Source': f"{SENDER_NAME} <{SENDER_EMAIL}>",
            'Destination': {
                'ToAddresses': to_addresses
            },
            'Message': {
                'Subject': {
                    'Data': subject,
                    'Charset': 'UTF-8'
                },
                'Body': {
                    'Text': {
                        'Data': text_body,
                        'Charset': 'UTF-8'
                    },
                    'Html': {
                        'Data': html_body,
                        'Charset': 'UTF-8'
                    }
                }
            }
        }
        
        # Add reply-to if provided
        if reply_to:
            email_params['ReplyToAddresses'] = [reply_to]
        
        # Send email
        response = ses.send_email(**email_params)
        
        logger.info(f"Email sent successfully to {', '.join(to_addresses)}. Message ID: {response['MessageId']}")
        
    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        
        if error_code == 'MessageRejected':
            logger.error(f"SES rejected message: {error_message}")
        elif error_code == 'MailFromDomainNotVerified':
            logger.error(f"Sender email domain not verified in SES: {SENDER_EMAIL}")
        elif error_code == 'ConfigurationSetDoesNotExist':
            logger.error("SES configuration set does not exist")
        else:
            logger.error(f"SES error: {error_code} - {error_message}")
        
        raise Exception(f"Failed to send email: {error_code}")