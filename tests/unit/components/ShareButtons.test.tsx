// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import React from 'react';
import { ShareButtons } from '../../../src/components/ShareButtons';
import * as demoModalStore from '../../../src/store/demo-modal';

// Mock clipboard
const writeTextMock = vi.fn().mockResolvedValue(undefined);
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: writeTextMock,
  },
  writable: true,
});

describe('ShareButtons', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    writeTextMock.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders all share buttons', () => {
    render(<ShareButtons title="Test Title" url="https://example.com" />);

    expect(screen.getByLabelText('Share on Facebook')).toBeTruthy();
    expect(screen.getByLabelText('Share on X (Twitter)')).toBeTruthy();
    expect(screen.getByLabelText('Share on Pinterest')).toBeTruthy();
    expect(screen.getByLabelText('Share on WhatsApp')).toBeTruthy();
    expect(screen.getByLabelText('Copy Link')).toBeTruthy();
  });

  it('opens demo modal when clicking external share buttons', () => {
    const openDemoModalSpy = vi.spyOn(demoModalStore, 'openDemoModal');
    render(<ShareButtons title="Test Title" url="https://example.com" />);

    const facebookBtn = screen.getByLabelText('Share on Facebook');
    fireEvent.click(facebookBtn);

    expect(openDemoModalSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Share on Facebook',
        category: 'Social Share',
      })
    );
  });

  it('copies link to clipboard when clicking copy button', async () => {
    render(<ShareButtons title="Test Title" url="https://example.com" />);

    const copyBtn = screen.getByLabelText('Copy Link');

    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(writeTextMock).toHaveBeenCalledWith('https://example.com');

    const toast = screen.getByText('Link Copied!');
    expect(toast).toBeTruthy();
    expect(toast.className).toContain('opacity-100');
  });
});

describe('ShareButtons', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    writeTextMock.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders all share buttons', () => {
    render(<ShareButtons title="Test Title" url="https://example.com" />);

    expect(screen.getByLabelText('Share on Facebook')).toBeTruthy();
    expect(screen.getByLabelText('Share on X (Twitter)')).toBeTruthy();
    expect(screen.getByLabelText('Share on Pinterest')).toBeTruthy();
    expect(screen.getByLabelText('Share on WhatsApp')).toBeTruthy();
    expect(screen.getByLabelText('Copy Link')).toBeTruthy();
  });

  it('opens demo modal when clicking external share buttons', () => {
    const openDemoModalSpy = vi.spyOn(demoModalStore, 'openDemoModal');
    render(<ShareButtons title="Test Title" url="https://example.com" />);

    const facebookBtn = screen.getByLabelText('Share on Facebook');
    fireEvent.click(facebookBtn);

    expect(openDemoModalSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Share on Facebook',
        category: 'Social Share',
      })
    );
  });

  it('copies link to clipboard when clicking copy button', async () => {
    render(<ShareButtons title="Test Title" url="https://example.com" />);

    const copyBtn = screen.getByLabelText('Copy Link');

    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(writeTextMock).toHaveBeenCalledWith('https://example.com');

    const toast = screen.getByText('Link Copied!');
    expect(toast).toBeTruthy();
    expect(toast.className).toContain('opacity-100');
  });
});
