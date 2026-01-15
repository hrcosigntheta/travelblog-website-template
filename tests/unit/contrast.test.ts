import { describe, it, expect, beforeAll } from 'vitest';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import fs from 'node:fs';
import path from 'node:path';

extend([a11yPlugin]);

// Define the critical pairs we want to test for contrast
const CRITICAL_PAIRS = [
  // Background vs Text
  { fg: '--text-primary', bg: '--bg-default', level: 'AA', size: 'normal' },
  { fg: '--text-secondary', bg: '--bg-default', level: 'AA', size: 'normal' }, // Might fail if secondary is too light
  { fg: '--text-inverse', bg: '--color-primary', level: 'AA', size: 'large' }, // Buttons usually large/bold or require 4.5
  { fg: '--btn-primary-text', bg: '--btn-primary-bg', level: 'AA', size: 'normal' },

  // Card context
  { fg: '--text-primary', bg: '--card-bg', level: 'AA', size: 'normal' },

  // Nav context
  { fg: '--nav-text', bg: '--nav-bg', level: 'AA', size: 'normal' },

  // Input context
  { fg: '--text-primary', bg: '--input-bg', level: 'AA', size: 'normal' },
];

describe('Theme Contrast Compliance', () => {
  const lightTheme: Record<string, string> = {};
  let darkTheme: Record<string, string> = {};
  const palette: Record<string, string> = {};

  beforeAll(() => {
    const cssPath = path.resolve(process.cwd(), 'src/styles/global.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // 1. Extract Palette (Primitive tokens)
    // Looking for --palette-* definitions in :root
    // We'll just grab all -- variables from the file to be safe and resolve them

    // Simple regex to grab all variables
    const varRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
    let match;
    const allVars: Record<string, string> = {};

    // 2. Parse the CSS content into blocks to separate :root and dark theme
    const rootBlockMatch = cssContent.match(/:root\s*{([^}]+)}/);
    const darkBlockMatch = cssContent.match(/\[data-theme='dark'\]\s*{([^}]+)}/);

    if (!rootBlockMatch) throw new Error('Could not find :root block in global.css');

    // Parse :root for palette and light theme
    const rootContent = rootBlockMatch[1];
    while ((match = varRegex.exec(rootContent)) !== null) {
      const key = `--${match[1]}`;
      const value = match[2].trim();
      allVars[key] = value;
      lightTheme[key] = value;

      if (key.startsWith('--palette-')) {
        palette[key] = value;
      }
    }

    // Parse dark theme overrides
    if (darkBlockMatch) {
      const darkContent = darkBlockMatch[1];
      // Start with light theme as base (though typically dark theme overrides specific semantic tokens)
      darkTheme = { ...lightTheme };

      // Reset regex for new string
      const darkVarRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
      while ((match = darkVarRegex.exec(darkContent)) !== null) {
        const key = `--${match[1]}`;
        const value = match[2].trim();
        darkTheme[key] = value;
      }
    }
  });

  // Helper to resolve var(--name) to a hex/rgb value
  const resolveColor = (varName: string, theme: Record<string, string>): string => {
    // If it's a hex or rgb, return it
    if (!varName.startsWith('var(') && !varName.startsWith('--')) return varName;

    // Handle var(--name)
    let token = varName;
    if (varName.startsWith('var(')) {
      const inner = varName.match(/var\(([^)]+)\)/);
      if (inner) token = inner[1];
    }

    const value = theme[token];
    if (!value) {
      // If not found in theme, might be in the global vars (palette) if we missed it
      // But our parsing put everything in 'lightTheme' initially
      return '#000000'; // Fallback for debugging (or throw)
    }

    if (value.startsWith('var(') || value.startsWith('--')) {
      return resolveColor(value, theme);
    }

    return value;
  };

  describe('Light Theme', () => {
    CRITICAL_PAIRS.forEach(({ fg, bg, level, size }) => {
      it(`should have ${level} contrast for ${fg} on ${bg}`, () => {
        const fgColor = resolveColor(fg, lightTheme);
        const bgColor = resolveColor(bg, lightTheme);

        // Handle transparency for nav-bg if needed (colord handles alpha blending if we mix)
        // For simplicity, we assume solid backgrounds or typical usage

        const contrast = colord(bgColor).contrast(fgColor);
        const required = level === 'AA' ? (size === 'large' ? 3 : 4.5) : 7;

        expect(contrast).toBeGreaterThanOrEqual(required);
      });
    });
  });

  describe('Dark Theme', () => {
    CRITICAL_PAIRS.forEach(({ fg, bg, level, size }) => {
      it(`should have ${level} contrast for ${fg} on ${bg}`, () => {
        const fgColor = resolveColor(fg, darkTheme);
        const bgColor = resolveColor(bg, darkTheme);

        const contrast = colord(bgColor).contrast(fgColor);
        const required = level === 'AA' ? (size === 'large' ? 3 : 4.5) : 7;

        expect(contrast).toBeGreaterThanOrEqual(required);
      });
    });
  });
});
