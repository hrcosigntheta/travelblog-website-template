// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SocialLinksSection } from '../../../src/components/SocialLinksSection';
import { isDemoModalOpen, demoLinkData } from '../../../src/store/demo-modal';

describe('SocialLinksSection', () => {
  beforeEach(() => {
    isDemoModalOpen.set(false);
    demoLinkData.set(null);
  });

  it('renders all social platforms', () => {
    render(<SocialLinksSection />);

    expect(screen.getByText('Connect With Me')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('YouTube')).toBeInTheDocument();
    expect(screen.getByText('X (Twitter)')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Pinterest')).toBeInTheDocument();
    expect(screen.getByText('TikTok')).toBeInTheDocument();
  });

  it('renders handles and descriptions', () => {
    render(<SocialLinksSection />);
    expect(screen.getByText('@masurii_travels')).toBeInTheDocument();
    expect(screen.getByText('Daily travel photos & stories')).toBeInTheDocument();
  });

  it('opens demo modal when a link is clicked', () => {
    render(<SocialLinksSection />);

    const instagramLink = screen.getByLabelText('Visit my Instagram');
    fireEvent.click(instagramLink);

    expect(isDemoModalOpen.get()).toBe(true);
    expect(demoLinkData.get()).toEqual({
      url: 'https://instagram.com',
      label: 'Instagram Profile',
      category: 'Social Media',
    });
  });

  it('has correct styling classes', () => {
    render(<SocialLinksSection />);
    const link = screen.getByLabelText('Visit my Instagram');
    expect(link.className).toContain('hover:border-pink-500');
  });
});
