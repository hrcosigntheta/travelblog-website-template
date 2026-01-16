import React, { useState } from 'react';
import { CONTACT_FAQS } from '../data/faqs';

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleIndex(index);
    }
  };

  return (
    <div className="space-y-4">
      {CONTACT_FAQS.map((faq, index) => (
        <div
          key={index}
          className="border border-[var(--border-subtle)] rounded-[var(--radius-lg)] bg-[var(--bg-surface-raised)] overflow-hidden"
        >
          <button
            onClick={() => toggleIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-inset hover:bg-[var(--bg-surface-neutral-subtle)] transition-colors cursor-pointer"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="font-display font-bold text-[var(--text-primary)] text-lg pr-4">
              {faq.question}
            </span>
            <span
              className={`transform transition-transform duration-300 text-[var(--text-secondary)] flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`grid transition-all duration-300 ease-in-out ${
              openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
            aria-hidden={openIndex !== index}
          >
            <div className="overflow-hidden">
              <div className="px-6 pb-6 text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-4">
                {faq.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
