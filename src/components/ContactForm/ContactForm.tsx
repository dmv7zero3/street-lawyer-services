// src/components/ContactForm/ContactForm.tsx

import React, { useState, useCallback } from "react";
import {
  submitContactForm,
  validateField,
  validateForm,
  sanitizeInput,
  getErrorMessage,
} from "./ContactForm.utils";
import type {
  ContactFormData,
  FormErrors,
  FormState,
} from "./ContactForm.types";

interface ContactFormProps {
  onSuccess?: (data: ContactFormData) => void;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSuccess,
  className = "",
}) => {
  // Form data
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    company: "",
    honeypot: "", // Bot protection
  });

  // Validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Form state
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    errorMessage: null,
  });

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  // Handle field blur - validate on blur
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const error = validateField(name as keyof ContactFormData, value);

      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    []
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot (bot protection)
    if (formData.honeypot) {
      console.warn("Bot detected");
      return;
    }

    // Validate all fields
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Start submission
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      errorMessage: null,
    });

    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      name: sanitizeInput(formData.name),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone?.trim(),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message),
      company: formData.company ? sanitizeInput(formData.company) : undefined,
    };

    // Submit to Lambda
    const response = await submitContactForm(sanitizedData);

    if (response.success) {
      // Success
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        errorMessage: null,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        company: "",
        honeypot: "",
      });
      setErrors({});

      // Callback
      onSuccess?.(sanitizedData);

      // Reset success after 5 seconds
      setTimeout(() => {
        setFormState((prev) => ({ ...prev, isSuccess: false }));
      }, 5000);
    } else {
      // Error
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        errorMessage: getErrorMessage(response),
      });
    }
  };

  // Check if form has errors
  const hasErrors = Object.values(errors).some(
    (error) => error !== "" && error !== undefined
  );
  const isButtonDisabled = formState.isSubmitting || hasErrors;

  // Input classes
  const inputClass = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
    focus:border-transparent transition-colors disabled:opacity-50`;

  const errorClass = `border-red-500 focus:ring-red-500`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
      noValidate
    >
      {/* Success Message */}
      {formState.isSuccess && (
        <div
          className="p-4 text-green-800 border border-green-200 rounded-lg bg-green-50"
          role="alert"
          aria-live="polite"
        >
          <p className="font-medium">Thank you for your message!</p>
          <p className="mt-1 text-sm">We'll get back to you soon.</p>
        </div>
      )}

      {/* Error Message */}
      {formState.errorMessage && (
        <div
          className="p-4 text-red-800 border border-red-200 rounded-lg bg-red-50"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-sm">{formState.errorMessage}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block mb-1 text-sm font-medium text-sls-marble-200"
        >
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={formState.isSubmitting}
          className={`${inputClass} ${errors.name ? errorClass : "border-gray-300"}`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block mb-1 text-sm font-medium text-sls-marble-200"
        >
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={formState.isSubmitting}
          className={`${inputClass} ${errors.email ? errorClass : "border-gray-300"}`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p
            id="email-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone (Optional) */}
      <div>
        <label
          htmlFor="phone"
          className="block mb-1 text-sm font-medium text-sls-marble-200"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={formState.isSubmitting}
          className={`${inputClass} ${errors.phone ? errorClass : "border-gray-300"}`}
          placeholder="(555) 123-4567"
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p
            id="phone-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.phone}
          </p>
        )}
      </div>

      {/* Company (Optional) */}
      <div>
        <label
          htmlFor="company"
          className="block mb-1 text-sm font-medium text-sls-marble-200"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={formState.isSubmitting}
          className={`${inputClass} border-gray-300`}
        />
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block mb-1 text-sm font-medium text-sls-marble-200"
        >
          Subject *
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={formState.isSubmitting}
          className={`${inputClass} ${errors.subject ? errorClass : "border-gray-300"}`}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <p
            id="subject-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block mb-1 text-sm font-medium text-sls-marble-200"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={formState.isSubmitting}
          className={`${inputClass} ${errors.message ? errorClass : "border-gray-300"} resize-y`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-count"}
        />
        {errors.message && (
          <p
            id="message-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.message}
          </p>
        )}
        <p id="message-count" className="mt-1 text-xs text-gray-500">
          {formData.message.length}/1000 characters
        </p>
      </div>

      {/* Honeypot Field - Hidden from users */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isButtonDisabled}
        className="inline-flex items-center justify-center w-full gap-3 px-6 py-3 font-semibold tracking-wider uppercase transition-all duration-300 rounded-lg shadow-lg bg-sls-gold text-sls-charcoal-950 hover:bg-sls-gold/90 group disabled:opacity-50 disabled:cursor-not-allowed"
        aria-busy={formState.isSubmitting}
        style={{ boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)" }}
      >
        {formState.isSubmitting ? (
          <>
            <svg
              className="w-5 h-5 mr-3 -ml-1 text-sls-charcoal-950 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-center text-gray-500">* Required fields</p>
    </form>
  );
};

export default ContactForm;
