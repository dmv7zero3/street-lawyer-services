"""
Validation Module for Contact Form
Handles input validation, sanitization, and bot protection
"""

import re
import logging

logger = logging.getLogger(__name__)

# Spam keywords for detection
SPAM_KEYWORDS = [
    'bitcoin', 'cryptocurrency', 'forex', 'casino', 'viagra', 
    'weight loss', 'make money fast', 'work from home', 'lottery',
    'inheritance', 'nigerian prince', 'guarantee', 'no risk',
    'click here', 'buy now', 'limited time', 'act now'
]

# Suspicious email domains
SUSPICIOUS_DOMAINS = [
    '10minutemail', 'tempmail', 'guerrillamail', 'mailinator',
    'throwaway', 'yopmail', 'trashmail', 'fake-mail'
]

def validate_contact_form(body):
    """
    Validate contact form data matching frontend fields
    
    Args:
        body: Request body with form data
        
    Returns:
        Dict of field errors or None if valid
    """
    errors = {}
    
    # Name validation
    name = body.get('name', '').strip()
    if not name:
        errors['name'] = 'Name is required'
    elif len(name) < 2:
        errors['name'] = 'Name must be at least 2 characters'
    elif len(name) > 100:
        errors['name'] = 'Name must be less than 100 characters'
    
    # Email validation
    email = body.get('email', '').strip().lower()
    if not email:
        errors['email'] = 'Email is required'
    elif not validate_email_format(email):
        errors['email'] = 'Please enter a valid email address'
    
    # Phone validation (optional)
    phone = body.get('phone', '').strip()
    if phone and not validate_phone_format(phone):
        errors['phone'] = 'Please enter a valid phone number'
    
    # Subject validation
    subject = body.get('subject', '').strip()
    if not subject:
        errors['subject'] = 'Subject is required'
    elif len(subject) < 3:
        errors['subject'] = 'Subject must be at least 3 characters'
    elif len(subject) > 200:
        errors['subject'] = 'Subject must be less than 200 characters'
    
    # Message validation
    message = body.get('message', '').strip()
    if not message:
        errors['message'] = 'Message is required'
    elif len(message) < 10:
        errors['message'] = 'Message must be at least 10 characters'
    elif len(message) > 1000:
        errors['message'] = 'Message must be less than 1000 characters'
    
    # Company validation (optional)
    company = body.get('company', '').strip()
    if company and len(company) > 100:
        errors['company'] = 'Company name must be less than 100 characters'
    
    return errors if errors else None

def validate_email_format(email):
    """
    Validate email format using regex
    
    Args:
        email: Email address to validate
        
    Returns:
        Boolean indicating if email is valid
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_phone_format(phone):
    """
    Validate phone number format (US/International)
    
    Args:
        phone: Phone number to validate
        
    Returns:
        Boolean indicating if phone is valid
    """
    # Remove all non-digit characters for validation
    digits_only = re.sub(r'\D', '', phone)
    
    # Check if it's between 10-15 digits (US and international)
    if len(digits_only) < 10 or len(digits_only) > 15:
        return False
    
    # Basic pattern check for common formats
    patterns = [
        r'^\+?1?\d{10,14}$',  # International format
        r'^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$',  # US format
        r'^\d{10,15}$'  # Just digits
    ]
    
    for pattern in patterns:
        if re.match(pattern, phone):
            return True
    
    return False

def check_honeypot(body):
    """
    Check honeypot field for bot detection
    
    Args:
        body: Request body with form data
        
    Returns:
        Boolean - True if legitimate (honeypot empty), False if bot detected
    """
    honeypot = body.get('honeypot', '')
    
    # If honeypot has any value, it's likely a bot
    if honeypot:
        logger.warning(f"Honeypot triggered with value: {honeypot[:50]}")
        return False
    
    return True

def sanitize_input(text, max_length=1000):
    """
    Sanitize user input to prevent XSS and injection attacks
    
    Args:
        text: Input text to sanitize
        max_length: Maximum allowed length
        
    Returns:
        Sanitized text
    """
    if not text:
        return ''
    
    # Convert to string if not already
    text = str(text)
    
    # Remove HTML/XML tags
    text = re.sub(r'<[^>]*>', '', text)
    
    # Remove script tags and content
    text = re.sub(r'<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>', '', text, flags=re.IGNORECASE)
    
    # Remove javascript: and data: protocols
    text = re.sub(r'javascript:', '', text, flags=re.IGNORECASE)
    text = re.sub(r'data:', '', text, flags=re.IGNORECASE)
    
    # Remove SQL keywords (basic protection)
    sql_keywords = ['DROP', 'DELETE', 'INSERT', 'UPDATE', 'EXEC', 'EXECUTE']
    for keyword in sql_keywords:
        text = re.sub(rf'\b{keyword}\b', '', text, flags=re.IGNORECASE)
    
    # Trim whitespace and limit length
    text = text.strip()[:max_length]
    
    return text

def check_spam_indicators(body):
    """
    Check for spam indicators in form submission
    
    Args:
        body: Form data to check
        
    Returns:
        Tuple (is_spam, spam_reasons)
    """
    spam_reasons = []
    
    # Check message and subject for spam keywords
    message = body.get('message', '').lower()
    subject = body.get('subject', '').lower()
    combined_text = f"{subject} {message}"
    
    for keyword in SPAM_KEYWORDS:
        if keyword in combined_text:
            spam_reasons.append(f"Contains spam keyword: {keyword}")
    
    # Check for suspicious email domains
    email = body.get('email', '').lower()
    email_domain = email.split('@')[-1] if '@' in email else ''
    
    for suspicious_domain in SUSPICIOUS_DOMAINS:
        if suspicious_domain in email_domain:
            spam_reasons.append(f"Suspicious email domain: {suspicious_domain}")
    
    # Check for excessive URLs in message
    url_pattern = r'https?://[^\s]+'
    urls = re.findall(url_pattern, message)
    if len(urls) > 2:
        spam_reasons.append(f"Too many URLs ({len(urls)})")
    
    # Check for excessive capitalization
    if message:
        uppercase_ratio = sum(1 for c in message if c.isupper()) / len(message)
        if uppercase_ratio > 0.5:
            spam_reasons.append("Excessive capitalization")
    
    # Check for repeated characters (common in spam)
    repeated_chars = re.findall(r'(.)\1{9,}', message)
    if repeated_chars:
        spam_reasons.append("Excessive character repetition")
    
    is_spam = len(spam_reasons) > 0
    
    if is_spam:
        logger.warning(f"Spam indicators detected: {spam_reasons}")
    
    return is_spam, spam_reasons

def sanitize_form_data(body):
    """
    Sanitize all form fields
    
    Args:
        body: Form data to sanitize
        
    Returns:
        Sanitized form data
    """
    sanitized = {}
    
    # Define max lengths for each field
    field_limits = {
        'name': 100,
        'email': 254,  # RFC 5321
        'phone': 20,
        'company': 100,
        'subject': 200,
        'message': 1000
    }
    
    for field, max_length in field_limits.items():
        if field in body:
            if field == 'email':
                # Don't sanitize email content, just trim
                sanitized[field] = body[field].strip()[:max_length]
            else:
                sanitized[field] = sanitize_input(body[field], max_length)
    
    # Pass through honeypot without sanitization (we check it separately)
    if 'honeypot' in body:
        sanitized['honeypot'] = body['honeypot']
    
    return sanitized