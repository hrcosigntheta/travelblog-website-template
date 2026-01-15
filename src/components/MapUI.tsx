import React from 'react';
import { useTranslations } from '../i18n/utils';
import type { ui } from '../i18n/ui';

export function MapSkeleton({
  className = 'h-[400px] w-full',
  lang = 'en',
}: {
  className?: string;
  lang?: keyof typeof ui;
}) {
  const t = useTranslations(lang);
  return (
    <div
      className={`bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg flex items-center justify-center ${className}`}
    >
      <span className="text-neutral-500 font-medium">{t('map.loading')}</span>
    </div>
  );
}

export function MapError({
  className = 'h-[400px] w-full',
  lang = 'en',
}: {
  className?: string;
  lang?: keyof typeof ui;
}) {
  const t = useTranslations(lang);
  return (
    <div
      className={`bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg flex items-center justify-center ${className}`}
    >
      <div className="text-center p-4">
        <span className="block text-red-500 font-medium mb-1">{t('map.error')}</span>
        <span className="text-sm text-neutral-500">{t('common.error')}</span>
      </div>
    </div>
  );
}
