// src/components/ContactForm/ContactForm.utils.ts

import type { ContactFormData, LambdaResponse } from "./ContactForm.types";

// API endpoint - set via environment variable at build time or use default
// Avoid referencing process.env at runtime in the browser
const API_ENDPOINT =
  (typeof window !== "undefined" &&
    (window as any).REACT_APP_CONTACT_FORM_API) ||
  "https://your-api.execute-api.us-east-1.amazonaws.com/prod/forms/contact";

/**
 * Submit contact form to AWS Lambda
 */
export const submitContactForm = async (
  data: ContactFormData
): Promise<LambdaResponse> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Parse response - handle Lambda proxy format
    const result = await response.json();

    // Lambda proxy response has body field
    if (result.body) {
      const body =
        typeof result.body === "string" ? JSON.parse(result.body) : result.body;
      return body;
    }

    // Direct response format
    return result;
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
      errorCode: "SERVER_ERROR",
    };
  }
};

/**
 * Get user-friendly error message based on Lambda response
 */
export const getErrorMessage = (response: LambdaResponse): string => {
  if (response.success) return "";

  switch (response.errorCode) {
    case "RATE_LIMIT":
      return response.retryAfter
        ? `Too many submissions. Please try again in ${response.retryAfter} minutes.`
        : "Too many submissions. Please try again later.";

    case "SPAM_DETECTED":
      return "Your message was flagged for review. We'll respond if legitimate.";

    case "VALIDATION":
      return response.message || "Please check your information and try again.";

    case "SERVER_ERROR":
      return "Server error. Please try again in a few moments.";

    default:
      return response.message || "Something went wrong. Please try again.";
  }
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (US format, optional)
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\d\s\-().]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .slice(0, 1000); // Limit length
};

/**
 * Validate single field
 */
export const validateField = (
  field: keyof ContactFormData,
  value: string
): string => {
  switch (field) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      break;

    case "email":
      if (!value.trim()) return "Email is required";
      if (!validateEmail(value)) return "Please enter a valid email";
      break;

    case "phone":
      if (value && !validatePhone(value))
        return "Please enter a valid phone number";
      break;

    case "subject":
      if (!value.trim()) return "Subject is required";
      if (value.trim().length < 3)
        return "Subject must be at least 3 characters";
      break;

    case "message":
      if (!value.trim()) return "Message is required";
      if (value.trim().length < 10)
        return "Message must be at least 10 characters";
      if (value.length > 1000)
        return "Message must be less than 1000 characters";
      break;

    case "company":
      if (value.length > 100)
        return "Company name must be less than 100 characters";
      break;
  }

  return "";
};

/**
 * Validate entire form
 */
export const validateForm = (data: ContactFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  (Object.keys(data) as Array<keyof ContactFormData>).forEach((field) => {
    if (field === "honeypot") return; // Skip honeypot validation
    const error = validateField(field, data[field] || "");
    if (error) errors[field] = error;
  });

  return errors;
};

/**
 * Format phone number for display
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return phone;
};
