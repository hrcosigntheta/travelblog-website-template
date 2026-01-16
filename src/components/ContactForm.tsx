import React, { useState } from 'react';
import { openDemoModal } from '../store/demo-modal';
import { Button } from './UI/Button';
import { Input } from './UI/Input';
import { Textarea } from './UI/Textarea';
import { Select } from './UI/Select';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Collaboration/Partnership',
  'Travel Consultation',
  'Photo Licensing',
  'Website Feedback',
  'Other',
];

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: SUBJECT_OPTIONS[0],
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Trigger demo modal instead of actual submission
    openDemoModal({
      url: '#',
      label: `Send Message: ${formData.subject}`,
      category: 'Contact Form',
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: SUBJECT_OPTIONS[0],
      message: '',
    });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[var(--bg-surface)] p-6 md:p-8 rounded-2xl shadow-lg border border-[var(--border-default)]">
      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Send me a message</h3>

      {submitSuccess && (
        <div
          role="alert"
          className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800 flex items-center animate-fade-in"
        >
          <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-medium">Message sent successfully! (Demo)</p>
            <p className="text-sm mt-1">Thanks for reaching out. I&apos;ll get back to you soon.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Your Name"
            disabled={isSubmitting}
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
            required
          />
        </div>

        <Select
          id="subject"
          name="subject"
          label="Subject"
          value={formData.subject}
          onChange={handleChange}
          options={SUBJECT_OPTIONS}
          error={errors.subject}
          disabled={isSubmitting}
          required
        />

        <Textarea
          id="message"
          name="message"
          label="Message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          placeholder="How can I help you?"
          disabled={isSubmitting}
          required
          rows={5}
          showCount
          minLength={20}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isSubmitting}
            fullWidth
            className="md:w-auto min-w-[160px]"
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};
