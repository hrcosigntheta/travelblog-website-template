import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import fs from 'node:fs';
import path from 'node:path';

extend([a11yPlugin]);

const OUTPUT_FILE = path.resolve(process.cwd(), 'docs/reports/CONTRAST_REPORT.md');
const CSS_FILE = path.resolve(process.cwd(), 'src/styles/global.css');

// Define pairs to check
const PAIRS = [
  { name: 'Primary Text on Background', fg: '--text-primary', bg: '--bg-default' },
  { name: 'Secondary Text on Background', fg: '--text-secondary', bg: '--bg-default' },
  { name: 'Muted Text on Background', fg: '--text-muted', bg: '--bg-default' },
  { name: 'Inverse Text on Primary Color (Button)', fg: '--text-inverse', bg: '--color-primary' },
  { name: 'Button Text on Button Bg', fg: '--btn-primary-text', bg: '--btn-primary-bg' },
  { name: 'Primary Text on Card', fg: '--text-primary', bg: '--card-bg' },
  { name: 'Secondary Text on Card', fg: '--text-secondary', bg: '--card-bg' },
  { name: 'Muted Text on Card', fg: '--text-muted', bg: '--card-bg' },
  { name: 'Nav Text on Nav Bg', fg: '--nav-text', bg: '--nav-bg' },
  { name: 'Primary Text on Input', fg: '--text-primary', bg: '--input-bg' },
  { name: 'Secondary Text on Tag (bg-default)', fg: '--text-secondary', bg: '--bg-default' },
  {
    name: 'Secondary Text on White (Secondary Tag)',
    fg: '--color-secondary-text',
    bg: '--palette-white',
    themeOnly: 'light',
  },
  {
    name: 'Jungle Text on White (Jungle Tag)',
    fg: '--color-jungle-text',
    bg: '--palette-white',
    themeOnly: 'light',
  },
  { name: 'Rating Text on Card Bg', fg: '--color-text-rating', bg: '--card-bg' },
  {
    name: 'Region Tag (Primary on Light/Dark)',
    fg: '--color-primary',
    bg: '--palette-white',
    themeOnly: 'light',
  },
  {
    name: 'Region Tag (Primary on Dark Bg)',
    fg: '--color-primary',
    bg: '#000000',
    themeOnly: 'dark',
  },
];

function resolveColor(varName: string, theme: Record<string, string>): string {
  if (varName === '#000000') return '#000000';
  if (varName === '#ffffff') return '#ffffff';
  if (!varName.startsWith('var(') && !varName.startsWith('--')) return varName;

  let token = varName;
  if (varName.startsWith('var(')) {
    const inner = varName.match(/var\(([^)]+)\)/);
    if (inner) token = inner[1];
  }

  const value = theme[token];
  if (!value) return '#000000'; // Fallback

  if (value.startsWith('var(') || value.startsWith('--')) {
    return resolveColor(value, theme);
  }
  return value;
}

function parseCss() {
  const cssContent = fs.readFileSync(CSS_FILE, 'utf-8');
  const lightTheme: Record<string, string> = {};
  const darkTheme: Record<string, string> = {};

  const varRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
  let match;

  const rootBlockMatch = cssContent.match(/:root\s*{([^}]+)}/);
  const darkBlockMatch = cssContent.match(/\[data-theme='dark'\]\s*{([^}]+)}/);

  if (rootBlockMatch) {
    const rootContent = rootBlockMatch[1];
    while ((match = varRegex.exec(rootContent)) !== null) {
      lightTheme[`--${match[1]}`] = match[2].trim();
    }
  }

  if (darkBlockMatch) {
    const darkContent = darkBlockMatch[1];
    // Start with light theme clone
    Object.assign(darkTheme, lightTheme);

    // Reset regex for new string
    const darkVarRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
    while ((match = darkVarRegex.exec(darkContent)) !== null) {
      darkTheme[`--${match[1]}`] = match[2].trim();
    }
  }

  return { lightTheme, darkTheme };
}

function generateReport() {
  const { lightTheme, darkTheme } = parseCss();
  let markdown = `# Theme Contrast Compliance Report\n\nGenerated on: ${new Date().toLocaleString()}\n\n`;
  let hasFailures = false;

  markdown += `## Summary\n\nChecking compliance with WCAG AA standards (Minimum 4.5:1 for normal text).\n\n`;

  // Light Theme Table
  markdown += `### ☀️ Light Theme\n\n`;
  markdown += `| Context | Foreground | Background | Ratio | Grade |\n`;
  markdown += `| :--- | :--- | :--- | :--- | :--- |\n`;

  PAIRS.forEach((pair) => {
    if (pair.themeOnly && pair.themeOnly !== 'light') return;
    const fg = resolveColor(pair.fg, lightTheme);
    const bg = resolveColor(pair.bg, lightTheme);
    const contrast = colord(bg).contrast(fg);
    const pass = contrast >= 4.5 ? '✅ PASS' : contrast >= 3 ? '⚠️ LARGE ONLY' : '❌ FAIL';

    if (pass === '❌ FAIL') hasFailures = true;

    markdown += `| ${pair.name} | \`${pair.fg}\`<br>${fg} | \`${pair.bg}\`<br>${bg} | **${contrast.toFixed(2)}:1** | ${pass} |\n`;
  });

  // Dark Theme Table
  markdown += `\n### 🌙 Dark Theme\n\n`;
  markdown += `| Context | Foreground | Background | Ratio | Grade |\n`;
  markdown += `| :--- | :--- | :--- | :--- | :--- |\n`;

  PAIRS.forEach((pair) => {
    if (pair.themeOnly && pair.themeOnly !== 'dark') return;
    const fg = resolveColor(pair.fg, darkTheme);
    const bg = resolveColor(pair.bg, darkTheme);
    const contrast = colord(bg).contrast(fg);
    const pass = contrast >= 4.5 ? '✅ PASS' : contrast >= 3 ? '⚠️ LARGE ONLY' : '❌ FAIL';

    if (pass === '❌ FAIL') hasFailures = true;

    markdown += `| ${pair.name} | \`${pair.fg}\`<br>${fg} | \`${pair.bg}\`<br>${bg} | **${contrast.toFixed(2)}:1** | ${pass} |\n`;
  });

  // Ensure directory exists
  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, markdown);
  console.log(`Report generated at: ${OUTPUT_FILE}`);

  if (hasFailures) {
    console.error('❌ Contrast validation failed. See report for details.');
    process.exit(1);
  }
}

generateReport();
