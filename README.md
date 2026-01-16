# 🌴 Philippine Travel Blog & Destination Showcase

[![Deploy to GitHub Pages](https://github.com/MasuRii/travelblog-website-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/MasuRii/travelblog-website-template/actions/workflows/deploy.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Built with Astro](https://img.shields.io/badge/built%20with-Astro-ff5d01.svg)](https://astro.build)
[![Powered by React](https://img.shields.io/badge/powered%20by-React-61dafb.svg)](https://reactjs.org)

A high-performance, SEO-optimized travel blog template built with **Astro 5**, **React 19**, and **Tailwind CSS v4**. Specifically designed for showcasing Philippine beaches, islands, and hidden gems with an editorial magazine aesthetic.

[**Live Demo**](https://masurii.github.io/travelblog-website-template/)

---

## ✨ Features

- **🚀 Extreme Performance**: Built with Astro's "Islands Architecture" for zero JavaScript by default.
- **🗺️ Interactive Destinations Map**: Full-page Leaflet map with custom category markers, clustering, and theme-aware tiles (CartoDB).
- **🌓 Adaptive Theme System**: Seamless light and dark mode support with system preference detection and persistence.
- **🔍 Intelligent Search**: Fast, client-side fuzzy search powered by Fuse.js.
- **📱 PWA Ready**: Offline support via Service Workers and a manifest for app-like installation.
- **📈 SEO & Social Sharing**: Complete JSON-LD schema markup (TouristDestination, Person, Breadcrumbs, FAQ) and Open Graph/Twitter cards.
- **♿ Accessibility First**: WCAG AA compliance verified with axe-core and automated contrast validation.
- **🖼️ Image Optimization**: Automated build-time image processing using Sharp and responsive Picture components.
- **📄 Print Friendly**: Optimized stylesheets for printing travel itineraries.

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build)
- **UI Components**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **State Management**: [Nano Stores](https://github.com/nanostores/nanostores)
- **Maps**: [Leaflet](https://leafletjs.com) & [React Leaflet](https://react-leaflet.js.org)
- **Search**: [Fuse.js](https://www.fusejs.io)
- **Testing**: [Vitest](https://vitest.dev), [Playwright](https://playwright.dev), [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- **Runtime**: [Bun](https://bun.sh)

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MasuRii/travelblog-website-template.git
   ```
2. Install dependencies:
   ```bash
   bun install
   ```

### Development

Start the development server:

```bash
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

---

## 📸 Content Management

### Destination Data

Destinations are managed as structured TypeScript files in `src/data/destinations/`. Adding a new destination is as simple as creating a new file and exporting the data object.

### Image Pipeline

The project includes automated scripts for managing placeholder images:

- **Fetch images**: `bun run images:fetch` (Downloads diverse travel images from Unsplash)
- **Validate diversity**: `bun run images:validate` (Checks color and subject variety)
- **Verify processing**: `bun run images:verify` (Tests Sharp and ThumbHash integration)

---

## 🧪 Testing & Quality

The project maintains a rigorous quality bar with over 300+ tests:

- **Unit Tests**: `bun run test` (Vitest)
- **E2E Journeys**: `bun run test:e2e` (Playwright)
- **Accessibility**: `bun run test:a11y` (axe-core)
- **Performance**: `bun run test:lighthouse` (Lighthouse CI)
- **Data Integrity**: `bun run data:validate:all`

---

## 🚢 Deployment

Automatically deployed to GitHub Pages via GitHub Actions on every push to `main`.

- **Build Output**: `dist/` (Static Site Generation)
- **Base Path**: `/travelblog-website-template/`

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ for travelers by [MasuRii](https://github.com/MasuRii).
