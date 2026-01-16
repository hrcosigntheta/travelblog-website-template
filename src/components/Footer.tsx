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
    <footer className="bg-surface-raised border-t border-subtle text-text-primary py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand + Bio */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-primary">TravelBlog</h2>
            <p className="text-text-secondary text-sm leading-relaxed">{t('footer.bio')}</p>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.explore')}</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a href={ROUTES.DESTINATIONS} className="hover:text-primary transition-colors">
                  {t('nav.destinations')}
                </a>
              </li>
              <li>
                <a href={ROUTES.GALLERY} className="hover:text-primary transition-colors">
                  {t('nav.gallery')}
                </a>
              </li>
              <li>
                <a href={ROUTES.ITINERARIES} className="hover:text-primary transition-colors">
                  {t('nav.itineraries')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a href={ROUTES.ABOUT} className="hover:text-primary transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href={ROUTES.CONTACT} className="hover:text-primary transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
              <li>
                <a href={ROUTES.PRIVACY} className="hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href={ROUTES.TERMS} className="hover:text-primary transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.newsletter')}</h3>
            <p className="text-text-secondary text-sm mb-4">{t('home.newsletterDesc')}</p>
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder={t('footer.newsletterPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-default border border-default rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-text-inverse font-bold rounded-md hover:bg-primary-hover transition-colors cursor-pointer"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-secondary">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="flex space-x-4">
            {/* Social Placeholders */}
            <a
              href="https://instagram.com"
              onClick={(e) => handleSocialClick(e, 'Instagram', 'https://instagram.com')}
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              onClick={(e) => handleSocialClick(e, 'Twitter', 'https://twitter.com')}
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
