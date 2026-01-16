import React, { useState } from 'react';
import { openDemoModal } from '../store/demo-modal';
import { Button } from './UI/Button';
import { Input } from './UI/Input';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Trigger demo modal
    openDemoModal({
      url: `https://api.travelblog.demo/subscribe?email=${encodeURIComponent(email)}`,
      label: 'Newsletter Subscription',
      category: 'newsletter',
    });

    setIsLoading(false);
    // Simulate success
    setStatus('success');
    setEmail('');

    // Reset status after a delay
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-16 bg-[var(--bg-surface-raised)] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)] opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-secondary)] opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)] mb-4">
            Join the Adventure
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8">
            Get travel tips, destination guides, and inspiration delivered straight to your inbox.
            No spam, just wanderlust.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            noValidate
          >
            <div className="flex-grow text-left">
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                placeholder="Enter your email"
                aria-label="Email address"
                className="h-12"
              />
              {status === 'success' && (
                <p className="mt-2 text-sm text-green-600 font-medium animate-fade-in">
                  Thanks for subscribing!
                </p>
              )}
            </div>
            <div className="sm:mt-0 mt-2">
              <Button
                type="submit"
                isLoading={isLoading}
                isSuccess={status === 'success'}
                successText="Subscribed!"
                className="h-12 shadow-lg w-full sm:w-auto"
              >
                Subscribe
              </Button>
            </div>
          </form>

          <p className="mt-4 text-sm text-[var(--text-muted)]">
            By subscribing, you agree to our{' '}
            <button
              onClick={() =>
                openDemoModal({
                  url: 'https://travelblog.demo/privacy-policy',
                  label: 'Privacy Policy',
                  category: 'legal',
                })
              }
              type="button"
              className="text-[var(--text-primary)] underline hover:text-[var(--color-primary)] transition-colors"
            >
              Privacy Policy
            </button>
            . Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
