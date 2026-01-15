import { describe, it, expect } from 'vitest';
import { getLangFromUrl, useTranslations } from '../../src/i18n/utils';

describe('i18n utils', () => {
  describe('getLangFromUrl', () => {
    it('returns default lang for root', () => {
      const url = new URL('https://example.com/');
      expect(getLangFromUrl(url)).toBe('en');
    });

    it('returns default lang for unknown lang', () => {
      const url = new URL('https://example.com/fr/page');
      // Since 'fr' is not in ui, it should return 'en'
      expect(getLangFromUrl(url)).toBe('en');
    });

    // If we add more languages later, we can test valid extraction
    // For now, only 'en' exists.
    it('returns en for en path', () => {
      const url = new URL('https://example.com/en/page');
      expect(getLangFromUrl(url)).toBe('en');
    });
  });

  describe('useTranslations', () => {
    it('translates simple key', () => {
      const t = useTranslations('en');
      expect(t('common.loading')).toBe('Loading...');
    });

    it('translates nested key', () => {
      const t = useTranslations('en');
      expect(t('nav.home')).toBe('Home');
    });

    it('returns key if missing', () => {
      const t = useTranslations('en');
      expect(t('missing.key')).toBe('missing.key');
    });

    it('interpolates params', () => {
      const t = useTranslations('en');
      // ui.footer.copyright is "© {year} Travel Blog. All rights reserved."
      expect(t('footer.copyright', { year: 2026 })).toBe(
        '© 2026 Travel Blog. All rights reserved.'
      );
    });
  });
});
