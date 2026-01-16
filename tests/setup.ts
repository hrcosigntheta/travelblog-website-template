import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { mockMatchMedia } from './mocks/media-query';
import { mockIntersectionObserver } from './mocks/intersection-observer';

// Setup global mocks immediately
mockMatchMedia();
mockIntersectionObserver();

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
