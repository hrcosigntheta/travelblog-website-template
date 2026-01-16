import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { FAQAccordion } from '../../../src/components/FAQAccordion';
import { CONTACT_FAQS } from '../../../src/data/faqs';

describe('FAQAccordion', () => {
  it('renders all FAQ questions', () => {
    render(<FAQAccordion />);
    CONTACT_FAQS.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });

  it('renders answers but hides them initially', () => {
    render(<FAQAccordion />);
    CONTACT_FAQS.forEach((faq) => {
      const answer = screen.getByText(faq.answer);
      expect(answer).toBeInTheDocument();
      // Since we use CSS grid/opacity for visibility, we check the parent container's classes or style
      // But testing library focuses on accessibility.
      // The button has aria-expanded="false" initially
      const button = screen.getByText(faq.question).closest('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('toggles answer visibility on click', () => {
    render(<FAQAccordion />);
    const firstQuestion = CONTACT_FAQS[0];
    const button = screen.getByText(firstQuestion.question).closest('button');

    // Click to open
    fireEvent.click(button!);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Click to close
    fireEvent.click(button!);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles answer visibility on Enter key', () => {
    render(<FAQAccordion />);
    const firstQuestion = CONTACT_FAQS[0];
    const button = screen.getByText(firstQuestion.question).closest('button');

    // Press Enter to open
    fireEvent.keyDown(button!, { key: 'Enter', code: 'Enter' });
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Press Enter to close
    fireEvent.keyDown(button!, { key: 'Enter', code: 'Enter' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports keyboard navigation (Space key)', () => {
    render(<FAQAccordion />);
    const firstQuestion = CONTACT_FAQS[0];
    const button = screen.getByText(firstQuestion.question).closest('button');

    // Press Space to open
    fireEvent.keyDown(button!, { key: ' ', code: 'Space' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('only allows one item open at a time (accordion behavior)', () => {
    render(<FAQAccordion />);
    const firstQuestion = CONTACT_FAQS[0];
    const secondQuestion = CONTACT_FAQS[1];

    const button1 = screen.getByText(firstQuestion.question).closest('button');
    const button2 = screen.getByText(secondQuestion.question).closest('button');

    // Open first
    fireEvent.click(button1!);
    expect(button1).toHaveAttribute('aria-expanded', 'true');

    // Open second
    fireEvent.click(button2!);
    expect(button2).toHaveAttribute('aria-expanded', 'true');
    expect(button1).toHaveAttribute('aria-expanded', 'false'); // First should close
  });
});
