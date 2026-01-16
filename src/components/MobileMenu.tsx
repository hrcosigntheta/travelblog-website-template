import { useEffect, useRef } from 'react';
import { ROUTES } from '../config/paths';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
  currentPath: string;
}

export default function MobileMenu({ isOpen, onClose, t, currentPath }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      menuRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-50 bg-[var(--color-surface)] flex flex-col p-6 animate-fade-in"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      {/* Close button header */}
      <div className="flex justify-between items-center mb-8">
        <span className="font-display font-bold text-xl text-[var(--color-text-primary)]">
          Menu
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
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
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-6 text-xl">
        <a
          href={ROUTES.HOME}
          className={`animate-slide-up opacity-0 ${
            currentPath === ROUTES.HOME
              ? 'font-bold text-[var(--color-primary)]'
              : 'text-[var(--color-text-primary)]'
          }`}
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          onClick={onClose}
        >
          {t('nav.home')}
        </a>
        <a
          href={ROUTES.DESTINATIONS}
          className={`animate-slide-up opacity-0 ${
            currentPath === ROUTES.DESTINATIONS
              ? 'font-bold text-[var(--color-primary)]'
              : 'text-[var(--color-text-primary)]'
          }`}
          style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
          onClick={onClose}
        >
          {t('nav.destinations')}
        </a>
        <a
          href={ROUTES.GALLERY}
          className={`animate-slide-up opacity-0 ${
            currentPath === ROUTES.GALLERY
              ? 'font-bold text-[var(--color-primary)]'
              : 'text-[var(--color-text-primary)]'
          }`}
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          onClick={onClose}
        >
          {t('nav.gallery')}
        </a>
        <a
          href={ROUTES.ITINERARIES}
          className={`animate-slide-up opacity-0 ${
            currentPath === ROUTES.ITINERARIES
              ? 'font-bold text-[var(--color-primary)]'
              : 'text-[var(--color-text-primary)]'
          }`}
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
          onClick={onClose}
        >
          {t('nav.itineraries')}
        </a>
        <a
          href={ROUTES.ABOUT}
          className={`animate-slide-up opacity-0 ${
            currentPath === ROUTES.ABOUT
              ? 'font-bold text-[var(--color-primary)]'
              : 'text-[var(--color-text-primary)]'
          }`}
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          onClick={onClose}
        >
          {t('nav.about')}
        </a>
        <a
          href={ROUTES.CONTACT}
          className={`animate-slide-up opacity-0 ${
            currentPath === ROUTES.CONTACT
              ? 'font-bold text-[var(--color-primary)]'
              : 'text-[var(--color-text-primary)]'
          }`}
          style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
          onClick={onClose}
        >
          {t('nav.contact')}
        </a>
      </nav>

      {/* Footer controls */}
      <div className="mt-auto pt-6 border-t border-[var(--color-border)] flex justify-between items-center">
        <span className="text-[var(--color-text-secondary)]">Switch Theme</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
