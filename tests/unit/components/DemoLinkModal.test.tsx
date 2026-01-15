// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import { DemoLinkModal } from '../../../src/components/DemoLinkModal';
import { openDemoModal, isDemoModalOpen, demoLinkData } from '../../../src/store/demo-modal';

describe('DemoLinkModal', () => {
  beforeEach(() => {
    // Reset store
    isDemoModalOpen.set(false);
    demoLinkData.set(null);
  });

  afterEach(() => {
    isDemoModalOpen.set(false);
    demoLinkData.set(null);
  });

  it('does not render when closed', () => {
    render(<DemoLinkModal />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders correctly when open', () => {
    act(() => {
      openDemoModal({
        url: 'https://example.com',
        label: 'Example Link',
        category: 'External',
      });
    });

    render(<DemoLinkModal />);

    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText(/Demo Link Intercepted/i)).toBeDefined();
    expect(screen.getByText(/Example Link/i)).toBeDefined();
    expect(screen.getByText('https://example.com')).toBeDefined();
  });

  it('closes when close button is clicked', async () => {
    act(() => {
      openDemoModal({
        url: 'https://example.com',
        label: 'Example Link',
        category: 'External',
      });
    });

    render(<DemoLinkModal />);

    const closeButtons = screen.getAllByLabelText(/Close/i);
    // There are two close buttons (icon and text)
    fireEvent.click(closeButtons[0]);

    await waitFor(() => {
      expect(isDemoModalOpen.get()).toBe(false);
    });
  });
});
