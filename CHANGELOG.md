# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-17

### Added

- **Core Framework**: Initial setup with Astro 5, React 19, and Tailwind CSS v4.
- **Theme System**: Adaptive light/dark mode with system detection and persistence.
- **Destinations Map**: Full-page interactive Leaflet map with clustering, custom category markers, and theme-aware tiles.
- **Search Engine**: Intelligent, client-side fuzzy search powered by Fuse.js.
- **Destination Data**: Structured TypeScript data for 20+ Philippine destinations (Cebu, Bohol, Palawan, etc.).
- **Blog System**: Markdown-like adventure posts with author metadata and related destinations.
- **PWA Capabilities**: Service worker for offline caching and manifest for app-like installation.
- **SEO & Schema**: Comprehensive JSON-LD markup for WebSite, Person, TouristDestination, and FAQPage.
- **Performance**: Automated image optimization pipeline using Sharp and Astro's Picture components.
- **Accessibility**: WCAG AA compliance verified with axe-core and automated contrast validation.
- **Documentation**: Detailed guides for setup, testing, configuration, and project structure.

### Changed

- Migrated external fonts to local Fontsource variable fonts for improved privacy and performance.
- Optimized hydration strategies (load, visible, idle) to minimize main-thread work.
- Localized all external assets to ensure build-time optimization and reliable LCP.

### Fixed

- Multiple accessibility violations in high-contrast and dark mode themes.
- E2E routing issues in subpath environments.
- Data integrity issues in destination coordinates and internal links.

## [0.0.1] - 2026-01-12

### Added

- Project initialization and base architecture.
- Research phase for tech stack and design guidelines.
