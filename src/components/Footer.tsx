import React, { useState } from 'react';
import { useTranslations } from '../i18n/utils';
import { defaultLang, ui } from '../i18n/ui';
import { ROUTES } from '../config/paths';
import { openDemoModal } from '../store/demo-modal';

interface FooterProps {
  lang?: string;
}

export default function Footer({ lang = defaultLang }: FooterProps) {
  const currentLang = lang in ui ? (lang as keyof typeof ui) : defaultLang;
  const t = useTranslations(currentLang);
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    openDemoModal({
      url: '#',
      label: `Newsletter Subscription: ${email}`,
      category: 'Newsletter',
    });
    setEmail('');
  };

  const handleSocialClick = (e: React.MouseEvent, platform: string, url: string) => {
    e.preventDefault();
    openDemoModal({
      url,
      label: `${platform} Profile`,
      category: 'Social Media',
    });
  };

  return (
    <footer className="bg-[var(--bg-surface-raised)] border-t border-[var(--border-subtle)] text-[var(--text-primary)] py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand + Bio */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-[var(--color-primary)]">
              TravelBlog
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {t('footer.bio')}
            </p>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.explore')}</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>
                <a
                  href={ROUTES.DESTINATIONS}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('nav.destinations')}
                </a>
              </li>
              <li>
                <a
                  href={ROUTES.GALLERY}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('nav.gallery')}
                </a>
              </li>
              <li>
                <a
                  href={ROUTES.ITINERARIES}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('nav.itineraries')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>
                <a
                  href={ROUTES.ABOUT}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a
                  href={ROUTES.CONTACT}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('nav.contact')}
                </a>
              </li>
              <li>
                <a
                  href={ROUTES.PRIVACY}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a
                  href={ROUTES.TERMS}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.newsletter')}</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">{t('home.newsletterDesc')}</p>
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder={t('footer.newsletterPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-[var(--bg-default)] border border-[var(--border-default)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[var(--color-primary)] text-[var(--text-inverse)] font-bold rounded-md hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-[var(--text-secondary)] text-center md:text-left">
            <p>{t('footer.copyright', { year: currentYear })}</p>
            <p className="mt-1">
              Template by{' '}
              <a
                href="https://github.com/MasuRii"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                MasuRii
              </a>
            </p>
          </div>
          <div className="flex space-x-4">
            {/* Social Placeholders */}
            <a
              href="https://instagram.com"
              onClick={(e) => handleSocialClick(e, 'Instagram', 'https://instagram.com')}
              className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors font-medium"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              onClick={(e) => handleSocialClick(e, 'Twitter', 'https://twitter.com')}
              className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors font-medium"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
