/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        secondary: 'var(--color-secondary)',
        background: {
          DEFAULT: 'var(--bg-default)',
          surface: 'var(--bg-surface)',
          raised: 'var(--bg-surface-raised)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          inverse: 'var(--text-inverse)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          subtle: 'var(--border-subtle)',
        },
        card: {
          bg: 'var(--card-bg)',
          border: 'var(--card-border)',
          shadow: 'var(--card-shadow)',
        },
        input: {
          bg: 'var(--input-bg)',
          border: 'var(--input-border)',
          focus: 'var(--input-focus)',
        },
        btn: {
          primary: {
            bg: 'var(--btn-primary-bg)',
            text: 'var(--btn-primary-text)',
            hover: 'var(--btn-primary-hover)',
          },
        },
        nav: {
          bg: 'var(--nav-bg)',
          text: 'var(--nav-text)',
          border: 'var(--nav-border)',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        accent: ['"Caveat"', 'cursive'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
};
