// src/components/ContactForm/ContactForm.types.ts

/**
 * Contact form data structure
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  company?: string;
  honeypot?: string; // Bot protection field
}

/**
 * Lambda function response structure
 */
export interface LambdaResponse {
  success: boolean;
  message: string;
  errorCode?: "RATE_LIMIT" | "VALIDATION" | "SPAM_DETECTED" | "SERVER_ERROR";
  retryAfter?: number; // Minutes until retry allowed (for rate limiting)
  formId?: string; // Unique identifier for successful submissions
}

/**
 * Form validation errors
 */
export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  company?: string;
}

/**
 * Form state
 */
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
}
