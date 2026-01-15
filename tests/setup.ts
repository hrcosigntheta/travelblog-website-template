import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';
import { mockMatchMedia } from './mocks/media-query';

// Setup global mocks
beforeAll(() => {
  mockMatchMedia();
});

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
