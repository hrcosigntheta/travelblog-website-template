import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Input } from '../../../../src/components/UI/Input';
import { Textarea } from '../../../../src/components/UI/Textarea';
import { Select } from '../../../../src/components/UI/Select';

describe('UI Components', () => {
  describe('Input', () => {
    it('renders with label and handles focus', () => {
      render(<Input label="Test Label" id="test-input" />);
      const input = screen.getByLabelText('Test Label');
      const label = screen.getByText('Test Label');

      expect(input).toBeInTheDocument();
      // Check initial label class for text-secondary
      expect(label.className).toContain('text-[var(--text-secondary)]');

      fireEvent.focus(input);
      // Check label class for color-primary on focus
      expect(label.className).toContain('text-[var(--color-primary)]');

      fireEvent.blur(input);
      expect(label.className).toContain('text-[var(--text-secondary)]');
    });

    it('displays error message and styles', () => {
      render(<Input label="Error Input" id="error-input" error="Invalid input" />);
      expect(screen.getByText('Invalid input')).toBeInTheDocument();
      const input = screen.getByLabelText('Error Input');
      // Check for error border class
      expect(input.className).toContain('border-red-500');
    });
  });

  describe('Textarea', () => {
    it('displays character count when showCount is true', () => {
      render(<Textarea label="Message" id="msg" showCount maxLength={100} defaultValue="Hello" />);
      expect(screen.getByText('5 / 100')).toBeInTheDocument();

      const textarea = screen.getByLabelText('Message');
      fireEvent.change(textarea, { target: { value: 'Hello World' } });
      expect(screen.getByText('11 / 100')).toBeInTheDocument();
    });

    it('highlights character count near limit', () => {
      render(
        <Textarea label="Limit" id="limit" showCount maxLength={10} defaultValue="1234567890" />
      );
      // 10/10 is > 90%
      const counter = screen.getByText('10 / 10');
      expect(counter.className).toContain('text-orange-500');
    });
  });

  describe('Select', () => {
    it('renders options correctly', () => {
      const options = [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' },
      ];
      render(<Select label="Choose" id="select-opt" options={options} />);
      expect(screen.getByLabelText('Choose')).toBeInTheDocument();
      // expect(screen.getByRole('combobox')).toHaveValue('opt1');
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });
});
