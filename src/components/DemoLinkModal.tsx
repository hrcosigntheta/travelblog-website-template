import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { isDemoModalOpen, demoLinkData, closeDemoModal } from '../store/demo-modal';

export const DemoLinkModal: React.FC = () => {
  const isOpen = useStore(isDemoModalOpen);
  const data = useStore(demoLinkData);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus trap could be implemented here or with a library.
      // For now, simple focus management.
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        closeDemoModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen || !data) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeDemoModal();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.url).then(() => {
      alert('URL copied to clipboard!'); // Replace with better feedback later
    });
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] shadow-2xl w-full max-w-md p-6 relative transform transition-all scale-100 opacity-100"
      >
        <button
          ref={closeButtonRef}
          onClick={closeDemoModal}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-4 text-yellow-600 dark:text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>

          <h2
            id="modal-title"
            className="text-xl font-display font-bold text-[var(--text-primary)] mb-2"
          >
            Demo Link Intercepted
          </h2>

          <p className="text-[var(--text-secondary)] mb-6">
            You clicked a link to <strong>{data.label}</strong>.<br />
            In a production site, this would navigate to:
          </p>

          <code className="block w-full bg-[var(--bg-default)] border border-[var(--border-subtle)] rounded p-3 text-sm text-[var(--text-primary)] break-all mb-6 font-mono">
            {data.url}
          </code>

          <div className="flex gap-3 w-full">
            <button
              onClick={closeDemoModal}
              className="flex-1 px-4 py-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-default)] transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="flex-1 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
