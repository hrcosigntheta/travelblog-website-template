import { render, screen, act } from '@testing-library/react';
import { useScrollAnimation } from '../../../src/hooks/useScrollAnimation';
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import React from 'react';

describe('useScrollAnimation', () => {
  let observe: Mock;
  let unobserve: Mock;
  let disconnect: Mock;
  let triggerIntersect: (entry: IntersectionObserverEntry) => void;

  beforeEach(() => {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();

    global.IntersectionObserver = class IntersectionObserverMock {
      constructor(callback: IntersectionObserverCallback) {
        triggerIntersect = (entry: IntersectionObserverEntry) => {
          act(() => {
            callback([entry], this as unknown as IntersectionObserver);
          });
        };
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
      root = null;
      rootMargin = '';
      thresholds = [];
      takeRecords = () => [];
    } as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  function TestComponent() {
    const { ref, isVisible } = useScrollAnimation();
    return (
      <div ref={ref} data-testid="test-div" className={isVisible ? 'visible' : 'hidden'}>
        Content
      </div>
    );
  }

  it('should initialize as hidden', () => {
    render(<TestComponent />);
    const element = screen.getByTestId('test-div');
    expect(element.className).toBe('hidden');
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it('should become visible when intersecting', () => {
    render(<TestComponent />);
    const element = screen.getByTestId('test-div');

    // Simulate intersection
    triggerIntersect({ isIntersecting: true } as IntersectionObserverEntry);

    expect(element.className).toBe('visible');
  });

  it('should stop observing after intersection', () => {
    render(<TestComponent />);

    // Simulate intersection
    triggerIntersect({ isIntersecting: true } as IntersectionObserverEntry);

    expect(unobserve).toHaveBeenCalledTimes(1);
  });
});
