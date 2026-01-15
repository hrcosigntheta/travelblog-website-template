import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Can I use your photos for my blog?',
    answer:
      'All photos on this website are copyrighted. Please contact us if you would like to license any images for commercial or personal use.',
  },
  {
    question: 'Do you accept guest posts?',
    answer:
      'Yes! We are always looking for authentic travel stories from the Philippines. Please select "Collaboration" in the contact form to pitch your idea.',
  },
  {
    question: 'What camera gear do you use?',
    answer:
      'We primarily shoot with a Sony A7IV and a variety of G Master lenses. Check out our About page for a full breakdown of our gear bag.',
  },
  {
    question: 'How do you fund your travels?',
    answer:
      'Our travels are funded through a mix of savings, freelance photography work, and partnerships with brands that align with our values.',
  },
];

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {FAQS.map((faq, index) => (
        <div
          key={index}
          className="border border-[var(--border-subtle)] rounded-[var(--radius-lg)] bg-[var(--bg-surface-raised)] overflow-hidden transition-all duration-200"
        >
          <button
            onClick={() => toggleIndex(index)}
            className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none focus:bg-[var(--bg-surface-neutral-subtle)] hover:bg-[var(--bg-surface-neutral-subtle)] transition-colors"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="font-display font-bold text-[var(--text-primary)] text-lg">
              {faq.question}
            </span>
            <span
              className={`transform transition-transform duration-200 text-[var(--text-secondary)] ${
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
            className={`transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-6 text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-4">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
