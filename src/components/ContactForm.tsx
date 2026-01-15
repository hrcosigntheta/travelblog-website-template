import React, { useState } from 'react';
import { openDemoModal } from '../store/demo-modal';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openDemoModal({
      url: '/api/contact-submit',
      label: 'Submit Contact Form',
      category: 'action',
    });
    // Optional: Reset form or show success message locally if not using modal
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)]">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-[var(--radius-md)] bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-[var(--radius-md)] bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-secondary)]">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-[var(--radius-md)] bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow appearance-none"
        >
          <option value="" disabled>
            Select a subject
          </option>
          <option value="general">General Inquiry</option>
          <option value="collaboration">Collaboration / Partnership</option>
          <option value="feedback">Website Feedback</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-[var(--radius-md)] bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow resize-y"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-8 py-3 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--color-btn-primary-text)] hover:bg-[var(--color-primary-hover)] transition-colors font-bold shadow-lg shadow-[var(--color-primary)]/20"
      >
        Send Message
      </button>
    </form>
  );
};
