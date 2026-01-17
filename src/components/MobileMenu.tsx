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
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = menuRef.current?.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small delay to ensure menu is rendered
      setTimeout(() => menuRef.current?.focus(), 100);
      window.addEventListener('keydown', handleEscape);
      window.addEventListener('keydown', handleTab);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('keydown', handleTab);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={menuRef}
        className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[1000] bg-background-surface flex flex-col p-6 shadow-2xl animate-fade-in border-l border-border-subtle"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button header */}
        <div className="flex justify-between items-center mb-8">
          <span className="font-display font-bold text-xl text-text-primary">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-text-primary hover:text-primary transition-colors"
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
              currentPath === ROUTES.HOME ? 'font-bold text-primary' : 'text-text-primary'
            }`}
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
            onClick={onClose}
          >
            {t('nav.home')}
          </a>
          <a
            href={ROUTES.DESTINATIONS}
            className={`animate-slide-up opacity-0 ${
              currentPath === ROUTES.DESTINATIONS ? 'font-bold text-primary' : 'text-text-primary'
            }`}
            style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
            onClick={onClose}
          >
            {t('nav.destinations')}
          </a>
          <a
            href={ROUTES.GALLERY}
            className={`animate-slide-up opacity-0 ${
              currentPath === ROUTES.GALLERY ? 'font-bold text-primary' : 'text-text-primary'
            }`}
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            onClick={onClose}
          >
            {t('nav.gallery')}
          </a>
          <a
            href={ROUTES.ITINERARIES}
            className={`animate-slide-up opacity-0 ${
              currentPath === ROUTES.ITINERARIES ? 'font-bold text-primary' : 'text-text-primary'
            }`}
            style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
            onClick={onClose}
          >
            {t('nav.itineraries')}
          </a>
          <a
            href={ROUTES.BLOG}
            className={`animate-slide-up opacity-0 ${
              currentPath === ROUTES.BLOG ? 'font-bold text-primary' : 'text-text-primary'
            }`}
            style={{ animationDelay: '0.275s', animationFillMode: 'forwards' }}
            onClick={onClose}
          >
            {t('nav.blog')}
          </a>
          <a
            href={ROUTES.ABOUT}
            className={`animate-slide-up opacity-0 ${
              currentPath === ROUTES.ABOUT ? 'font-bold text-primary' : 'text-text-primary'
            }`}
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            onClick={onClose}
          >
            {t('nav.about')}
          </a>
          <a
            href={ROUTES.CONTACT}
            className={`animate-slide-up opacity-0 ${
              currentPath === ROUTES.CONTACT ? 'font-bold text-primary' : 'text-text-primary'
            }`}
            style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
            onClick={onClose}
          >
            {t('nav.contact')}
          </a>
        </nav>

        {/* Footer controls */}
        <div className="mt-auto pt-6 border-t border-border flex justify-between items-center">
          <span className="text-text-secondary">Switch Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
