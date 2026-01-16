// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ItineraryDay from '../../../src/components/ItineraryDay';
import ItineraryActivity from '../../../src/components/ItineraryActivity';
import React from 'react';

describe('Print Styles', () => {
  it('ItineraryDay should have print:break-inside-avoid class', () => {
    const { container } = render(<ItineraryDay dayNumber={1} title="Test Day" activities={[]} />);
    const dayElement = container.firstChild as HTMLElement;
    expect(dayElement.className).toContain('print:break-inside-avoid');
  });

  it('ItineraryActivity should have print:break-inside-avoid class', () => {
    const { container } = render(
      <ItineraryActivity title="Test Activity" description="Test Description" />
    );
    const activityElement = container.firstChild as HTMLElement;
    expect(activityElement.className).toContain('print:break-inside-avoid');
  });

  it('ItineraryDay content should be visible in print', () => {
    const { container } = render(<ItineraryDay dayNumber={1} title="Test Day" activities={[]} />);
    // The content div
    // We need to find the specific div. It has transition-all.
    // We can query selector by class.
    const contentDiv = container.querySelector('.transition-all');
    expect(contentDiv?.className).toContain('print:max-h-none');
    expect(contentDiv?.className).toContain('print:opacity-100');
    expect(contentDiv?.className).toContain('print:overflow-visible');
  });
});
