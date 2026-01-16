import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsletterSignup from '../../../src/components/NewsletterSignup';
import * as demoModalStore from '../../../src/store/demo-modal';

// Mock the openDemoModal function
vi.mock('../../../src/store/demo-modal', () => ({
  openDemoModal: vi.fn(),
}));

describe('NewsletterSignup Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<NewsletterSignup />);

    expect(screen.getByText('Join the Adventure')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/)).toBeInTheDocument();
  });

  it('shows error for empty email', () => {
    render(<NewsletterSignup />);

    const button = screen.getByRole('button', { name: 'Subscribe' });
    fireEvent.click(button);

    expect(screen.getByText('Please enter your email address.')).toBeInTheDocument();
    expect(demoModalStore.openDemoModal).not.toHaveBeenCalled();
  });

  it('shows error for invalid email', () => {
    render(<NewsletterSignup />);

    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: 'Subscribe' });

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(button);

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(demoModalStore.openDemoModal).not.toHaveBeenCalled();
  });

  it('triggers demo modal on valid submission', async () => {
    render(<NewsletterSignup />);

    const input = screen.getByPlaceholderText('Enter your email');
    const button = screen.getByRole('button', { name: 'Subscribe' });

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(demoModalStore.openDemoModal).toHaveBeenCalledWith({
        url: 'https://api.travelblog.demo/subscribe?email=test%40example.com',
        label: 'Newsletter Subscription',
        category: 'newsletter',
      });
    });

    expect(screen.getByText('Thanks for subscribing!')).toBeInTheDocument();
  });

  it('triggers demo modal on privacy policy click', () => {
    render(<NewsletterSignup />);

    const privacyLink = screen.getByRole('button', { name: 'Privacy Policy' });
    fireEvent.click(privacyLink);

    expect(demoModalStore.openDemoModal).toHaveBeenCalledWith({
      url: 'https://travelblog.demo/privacy-policy',
      label: 'Privacy Policy',
      category: 'legal',
    });
  });
});
