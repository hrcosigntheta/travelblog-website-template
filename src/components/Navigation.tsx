import React, { useState, useEffect, Suspense } from 'react';
import { ROUTES } from '../config/paths';
import { ui, defaultLang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
import ThemeToggle from './ThemeToggle';

const MobileMenu = React.lazy(() => import('./MobileMenu'));

export default function Navigation({
  currentPath = '',
  lang = defaultLang,
}: {
  currentPath?: string;
  lang?: keyof typeof ui;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = useTranslations(lang);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scrolled));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: ROUTES.HOME, label: t('nav.home') },
    { href: ROUTES.DESTINATIONS, label: t('nav.destinations') },
    { href: ROUTES.GALLERY, label: t('nav.gallery') },
    { href: ROUTES.ITINERARIES, label: t('nav.itineraries') },
    { href: ROUTES.BLOG, label: t('nav.blog') },
    { href: ROUTES.ABOUT, label: t('nav.about') },
    { href: ROUTES.CONTACT, label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-[var(--nav-bg)] backdrop-blur-md shadow-sm py-2 border-b border-[var(--nav-border)]' : 'bg-transparent py-4'}`}
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
              className={`text-sm font-medium transition-colors hover:text-[var(--color-primary)] relative py-1 group ${currentPath === link.href ? 'text-[var(--color-primary)]' : 'text-[var(--text-primary)]'}`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ease-out ${currentPath === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}
              ></span>
            </a>
          ))}
          <div className="w-px h-6 bg-[var(--border-subtle)] mx-2"></div>
          <ThemeToggle />
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors group"
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
            className="overflow-visible"
          >
            <line
              x1="3"
              y1="12"
              x2="21"
              y2="12"
              className="transition-all duration-300 group-hover:opacity-0"
            ></line>
            <line
              x1="3"
              y1="6"
              x2="21"
              y2="6"
              className="transition-all duration-300 origin-center group-hover:-translate-y-[1px] group-hover:translate-x-[2px]"
            ></line>
            <line
              x1="3"
              y1="18"
              x2="21"
              y2="18"
              className="transition-all duration-300 origin-center group-hover:translate-y-[1px] group-hover:translate-x-[2px]"
            ></line>
          </svg>
        </button>
      </div>

      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[var(--color-primary)] transition-all duration-100 ease-out z-50"
        style={{ width: `${scrollProgress * 100}%`, opacity: isScrolled ? 1 : 0 }}
      ></div>

      <Suspense fallback={null}>
        <MobileMenu
          isOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
          t={t}
          currentPath={currentPath}
        />
      </Suspense>
    </header>
  );
}
