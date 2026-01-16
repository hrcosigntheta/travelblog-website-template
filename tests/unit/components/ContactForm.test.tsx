import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { ContactForm } from '../../../src/components/ContactForm';
import { openDemoModal } from '../../../src/store/demo-modal';

// Mock the demo modal store
vi.mock('../../../src/store/demo-modal', () => ({
  openDemoModal: vi.fn(),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    render(<ContactForm />);

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates message length', async () => {
    render(<ContactForm />);

    const messageInput = screen.getByLabelText(/message/i);
    fireEvent.change(messageInput, { target: { value: 'too short' } });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/message must be at least 20 characters/i)).toBeInTheDocument();
    });
  });

  it('submits successfully with valid data', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'General Inquiry' } });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'This is a test message that is long enough.' },
    });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    // Should show loading state (button disabled and spinner)
    expect(submitBtn).toBeDisabled();
    // Verify spinner exists inside button
    const spinner = submitBtn.querySelector('svg.animate-spin');
    expect(spinner).toBeInTheDocument();

    // Wait for submission to complete (mock delay is 800ms)
    await waitFor(() => {
      expect(openDemoModal).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'Send Message: General Inquiry',
          category: 'Contact Form',
        })
      );
    });

    // Should show success message
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });

    // Form should be reset
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
  });
});
