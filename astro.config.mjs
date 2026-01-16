import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://astro.build/config
export default defineConfig({
  site: 'https://travelblog-template.vercel.app', // Placeholder URL
  output: 'static',

  integrations: [react()],
  build: {
    inlineStylesheets: 'always',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: ['images.unsplash.com'],
  },

  vite: {
    plugins: [
      tailwindcss(),
      process.env.ANALYZE === 'true' &&
        visualizer({
          filename: 'dist/stats.html',
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),
  },
});
