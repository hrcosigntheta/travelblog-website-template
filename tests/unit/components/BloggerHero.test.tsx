import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BloggerHero } from '../../../src/components/BloggerHero';
import * as demoModalStore from '../../../src/store/demo-modal';

// Mock the openDemoModal function
const openDemoModalSpy = vi.spyOn(demoModalStore, 'openDemoModal');

describe('BloggerHero', () => {
  const defaultProps = {
    name: 'MasuRii',
    tagline: 'Our Story',
    portraitSrc: '/images/test-portrait.jpg',
    stats: [
      { label: 'Islands', value: '10' },
      { label: 'Years', value: '5' },
    ],
    socialLinks: [
      { platform: 'instagram' as const, url: 'https://instagram.com/test', label: 'Instagram' },
      { platform: 'twitter' as const, url: 'https://twitter.com/test', label: 'Twitter' },
    ],
  };

  beforeEach(() => {
    openDemoModalSpy.mockClear();
  });

  it('renders profile information correctly', () => {
    render(
      <BloggerHero {...defaultProps}>
        <p>Test bio content</p>
      </BloggerHero>
    );

    expect(screen.getByText("Hi, I'm MasuRii")).toBeTruthy();
    expect(screen.getByText('Our Story')).toBeTruthy();
    expect(screen.getByText('Test bio content')).toBeTruthy();
    expect(screen.getByAltText('Portrait of MasuRii')).toBeTruthy();
  });

  it('renders statistics correctly', () => {
    render(
      <BloggerHero {...defaultProps}>
        <p>Bio</p>
      </BloggerHero>
    );

    expect(screen.getByText('10')).toBeTruthy();
    expect(screen.getByText('Islands')).toBeTruthy();
    expect(screen.getByText('5')).toBeTruthy();
    expect(screen.getByText('Years')).toBeTruthy();
  });

  it('triggers demo modal when social link is clicked', () => {
    render(
      <BloggerHero {...defaultProps}>
        <p>Bio</p>
      </BloggerHero>
    );

    const instaLink = screen.getByLabelText('Instagram');
    fireEvent.click(instaLink);

    expect(openDemoModalSpy).toHaveBeenCalledWith({
      url: 'https://instagram.com/test',
      label: 'Instagram Profile',
      category: 'Social Media',
    });
  });
});
