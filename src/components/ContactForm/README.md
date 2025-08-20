# ContactForm Component

A production-ready React contact form component with AWS Lambda integration, built-in security features, and comprehensive error handling.

## Quick Start

```bash
# 1. Copy the ContactForm folder to your components directory
cp -r ContactForm src/components/

# 2. Set your API endpoint in .env
echo "REACT_APP_CONTACT_FORM_API=https://your-api.execute-api.us-east-1.amazonaws.com/prod/forms/contact" >> .env

# 3. Import and use
```

```tsx
import ContactForm from "./components/ContactForm";

function ContactPage() {
  return (
    <ContactForm
      onSuccess={(data) => console.log("Submitted:", data)}
      className="max-w-lg mx-auto"
    />
  );
}
```

## File Structure

```
ContactForm/
├── ContactForm.tsx          # Main component (150 lines)
├── ContactForm.types.ts     # TypeScript types (50 lines)
├── ContactForm.utils.ts     # Validation & API (100 lines)
└── index.ts                  # Exports (2 lines)
```

## Features

- **Security**: Honeypot bot protection, input sanitization, XSS prevention
- **Validation**: Real-time field validation on blur, submit button disabled when errors exist
- **AWS Lambda Ready**: Handles Lambda proxy responses with error codes
- **Rate Limiting**: Displays retry times from Lambda responses
- **User Feedback**: Success/error messages with appropriate context
- **Accessible**: ARIA labels, live regions, screen reader announcements, error descriptions
- **Enhanced UX**: Loading spinner animation, disabled state for invalid forms

## Configuration

### Environment Variables

```bash
# Required
REACT_APP_CONTACT_FORM_API=https://your-api.execute-api.us-east-1.amazonaws.com/prod/forms/contact
```

### Lambda Response Format

The component expects your AWS Lambda to return responses in this format:

```javascript
// Success Response
{
  "statusCode": 200,
  "body": {
    "success": true,
    "message": "Message sent successfully",
    "formId": "unique-id-123"  // Optional
  }
}

// Error Response with Code
{
  "statusCode": 429,
  "body": {
    "success": false,
    "message": "Rate limit exceeded",
    "errorCode": "RATE_LIMIT",  // RATE_LIMIT | VALIDATION | SPAM_DETECTED | SERVER_ERROR
    "retryAfter": 60  // Minutes until retry (for rate limiting)
  }
}
```

## Component Props

```typescript
interface ContactFormProps {
  onSuccess?: (data: ContactFormData) => void; // Callback on successful submission
  className?: string; // Additional CSS classes
}
```

## Form Fields

| Field    | Type   | Required | Validation         |
| -------- | ------ | -------- | ------------------ |
| name     | string | Yes      | Min 2 characters   |
| email    | string | Yes      | Valid email format |
| phone    | string | No       | US phone format    |
| company  | string | No       | Max 100 characters |
| subject  | string | Yes      | Min 3 characters   |
| message  | string | Yes      | 10-1000 characters |
| honeypot | string | Hidden   | Bot protection     |

## Customization Guide

### Modify Fields

To add/remove fields, update three locations:

1. **Types** (`ContactForm.types.ts`):

```typescript
export interface ContactFormData {
  name: string;
  email: string;
  customField?: string; // Add new field
  // ...
}
```

2. **Validation** (`ContactForm.utils.ts`):

```typescript
case 'customField':
  if (!value.trim()) return 'Custom field is required';
  break;
```

3. **Component** (`ContactForm.tsx`):

```tsx
<div>
  <label htmlFor="customField">Custom Field</label>
  <input
    id="customField"
    name="customField"
    value={formData.customField}
    onChange={handleChange}
    onBlur={handleBlur}
  />
</div>
```

### Styling

The component uses Tailwind classes by default. To use custom styles:

```tsx
// Override all styles
<ContactForm className="your-custom-class" />;

// Or modify the component's internal classes
const inputClass = `your-input-styles`;
```

### Error Messages

Customize error messages in `ContactForm.utils.ts`:

```typescript
export const getErrorMessage = (response: LambdaResponse): string => {
  switch (response.errorCode) {
    case "RATE_LIMIT":
      return "Your custom rate limit message";
    // ...
  }
};
```

## Security Features

### Honeypot Field

- Hidden field that bots typically fill out
- Form submission blocked if honeypot contains data
- No visual or keyboard access for real users

### Input Sanitization

- Removes HTML/script tags
- Limits input length (1000 chars for message)
- Trims whitespace

### Rate Limiting

- Handled by Lambda backend
- Component displays retry time to users
- Prevents spam and abuse

## Testing

### Manual Testing Checklist

- [ ] Submit valid form - should show success message
- [ ] Submit with empty required fields - should show validation errors
- [ ] Submit invalid email - should show email error
- [ ] Submit invalid phone - should show phone error
- [ ] Submit with message > 1000 chars - should show length error
- [ ] Fill honeypot field - form should not submit
- [ ] Test with network offline - should show network error
- [ ] Tab through all fields - proper keyboard navigation
- [ ] Use screen reader - proper ARIA labels

### Test API Response

```bash
# Test your endpoint
curl -X POST https://your-api.execute-api.us-east-1.amazonaws.com/prod/forms/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message content"
  }'
```

## Troubleshooting

### Form Not Submitting

1. Check browser console for errors
2. Verify API endpoint in `.env`
3. Check Lambda function logs in CloudWatch
4. Ensure CORS is configured on API Gateway

### CORS Errors

```javascript
// Lambda must return these headers
{
  "headers": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  }
}
```

### Rate Limit Issues

- Check Lambda rate limiting configuration
- Verify DynamoDB rate limit table exists
- Review CloudWatch logs for rate limit entries

## For LLMs/AI Assistants

When working with this component:

1. **File Locations**: All files are in `src/components/ContactForm/`
2. **Keep Files Short**: Each file is intentionally under 150 lines for token efficiency
3. **Modify in Order**: Types → Utils → Component when adding features
4. **Test Lambda Format**: Always ensure Lambda returns the expected response structure
5. **Environment Variable**: Must set `REACT_APP_CONTACT_FORM_API` before use

### Common Modifications

**Add a field**: Update types, add validation case, add input to component
**Change validation**: Modify `validateField()` in utils
**Customize messages**: Edit `getErrorMessage()` in utils
**Style changes**: Update className strings in component
**API endpoint**: Change `REACT_APP_CONTACT_FORM_API` in .env

### Do NOT:

- Over-engineer with unnecessary abstractions
- Split into more files (keep it simple)
- Add complex state management (local state is sufficient)
- Remove security features (honeypot, sanitization)

## Lambda Function Requirements

Your AWS Lambda should:

1. Accept POST requests with JSON body
2. Validate the honeypot field is empty
3. Implement rate limiting (recommended: 5/hour per IP)
4. Return responses in the specified format
5. Include CORS headers in response
6. Log submissions to DynamoDB or S3
7. Send notification emails as needed

## To Do / Future Updates

### Internationalization (i18n)

- Extract all user-facing strings to a translation file or use a library like `react-i18next`.
- Support multiple languages and locale-specific formats (dates, numbers, etc).
- Ensure UI accommodates longer/shorter translations and RTL languages if needed.

### Analytics Integration

- Add event tracking for form views, submissions, and errors (e.g., Google Analytics, Plausible, or Segment).
