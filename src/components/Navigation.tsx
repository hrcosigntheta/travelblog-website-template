import { useState, useEffect } from 'react';
import { ROUTES } from '../config/paths';
import { ui, defaultLang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

export default function Navigation({
  currentPath = '',
  lang = defaultLang,
}: {
  currentPath?: string;
  lang?: keyof typeof ui;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const t = useTranslations(lang);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: ROUTES.HOME, label: t('nav.home') },
    { href: ROUTES.DESTINATIONS, label: t('nav.destinations') },
    { href: ROUTES.GALLERY, label: t('nav.gallery') },
    { href: ROUTES.ITINERARIES, label: t('nav.itineraries') },
    { href: ROUTES.ABOUT, label: t('nav.about') },
    { href: ROUTES.CONTACT, label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-[var(--color-surface)]/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href={ROUTES.HOME}
          className="text-2xl font-display font-bold text-[var(--color-primary)]"
        >
          TravelBlog
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-primary)] ${currentPath === link.href ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}
            >
              {link.label}
            </a>
          ))}
          <div className="w-px h-6 bg-[var(--color-border)] mx-2"></div>
          <ThemeToggle />
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open menu"
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
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        t={t}
        currentPath={currentPath}
      />
    </header>
  );
}
