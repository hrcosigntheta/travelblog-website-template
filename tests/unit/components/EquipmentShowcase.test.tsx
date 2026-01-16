import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { EquipmentShowcase, type EquipmentItem } from '../../../src/components/EquipmentShowcase';
import * as demoModalStore from '../../../src/store/demo-modal';

// Mock the openDemoModal function
const openDemoModalSpy = vi.spyOn(demoModalStore, 'openDemoModal');

describe('EquipmentShowcase', () => {
  const mockItems: EquipmentItem[] = [
    {
      id: '1',
      name: 'Test Camera',
      description: 'A great camera',
      category: 'Camera',
      imageUrl: '/test-camera.jpg',
      shopUrl: 'https://example.com/camera',
    },
    {
      id: '2',
      name: 'Test Drone',
      description: 'A fast drone',
      category: 'Drone',
      imageUrl: '/test-drone.jpg',
      shopUrl: 'https://example.com/drone',
    },
  ];

  beforeEach(() => {
    openDemoModalSpy.mockClear();
  });

  it('renders all equipment items', () => {
    render(<EquipmentShowcase items={mockItems} />);

    expect(screen.getByText('Test Camera')).toBeTruthy();
    expect(screen.getByText('A great camera')).toBeTruthy();
    expect(screen.getByText('Test Drone')).toBeTruthy();
    expect(screen.getByText('A fast drone')).toBeTruthy();
  });

  it('triggers demo modal when shop link is clicked', () => {
    render(<EquipmentShowcase items={mockItems} />);

    const buttons = screen.getAllByText('Check Price');
    fireEvent.click(buttons[0]);

    expect(openDemoModalSpy).toHaveBeenCalledWith({
      url: 'https://example.com/camera',
      label: 'Shop: Test Camera',
      category: 'Affiliate Link',
    });

    fireEvent.click(buttons[1]);

    expect(openDemoModalSpy).toHaveBeenCalledWith({
      url: 'https://example.com/drone',
      label: 'Shop: Test Drone',
      category: 'Affiliate Link',
    });
  });

  it('renders custom title and subtitle', () => {
    render(<EquipmentShowcase items={mockItems} title="Custom Title" subtitle="Custom Subtitle" />);

    expect(screen.getByText('Custom Title')).toBeTruthy();
    expect(screen.getByText('Custom Subtitle')).toBeTruthy();
  });
});
