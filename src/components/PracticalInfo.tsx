import React, { useState } from 'react';

interface PracticalInfoData {
  gettingThere: string;
  accommodation: string;
  tips: string;
}

interface PracticalInfoProps {
  info: PracticalInfoData;
  className?: string;
}

const PracticalInfo: React.FC<PracticalInfoProps> = ({ info, className = '' }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // SVG Icons
  const Icons = {
    Plane: () => (
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
        <path d="M2 12h20" />
        <path d="M13 5l7 7-7 7" />
      </svg>
    ), // Simple arrow/plane metaphor
    Hotel: () => (
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
        <path d="M6 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
        <path d="M10 22v-6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v6" />
        <path d="M6 10h12" />
        <path d="M6 14h12" />
        <path d="M6 18h12" />
      </svg>
    ),
    Tips: () => (
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
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5a6 6 0 0 0-11 0c0 1.5.5 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    ChevronDown: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    ),
  };

  const sections = [
    {
      id: 'gettingThere',
      title: 'Getting There',
      icon: <span className="text-xl">✈️</span>,
      content: info.gettingThere,
    },
    {
      id: 'accommodation',
      title: 'Where to Stay',
      icon: <span className="text-xl">🏨</span>,
      content: info.accommodation,
    },
    {
      id: 'tips',
      title: 'Travel Tips',
      icon: <span className="text-xl">💡</span>,
      content: info.tips,
    },
  ];

  return (
    <div
      className={`bg-[var(--bg-surface-raised)] rounded-[var(--radius-xl)] border border-[var(--border-subtle)] overflow-hidden ${className}`}
    >
      <div className="p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-[var(--text-primary)]">
          Practical Information
        </h2>

        {/* Desktop Grid View (md+) */}
        <div className="hidden md:grid md:grid-cols-3 gap-8" data-testid="practical-info-desktop">
          {sections.map((section) => (
            <div key={section.id} className="flex flex-col h-full">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
                {section.icon} {section.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Mobile Accordion View (<md) */}
        <div className="md:hidden space-y-4" data-testid="practical-info-mobile">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border-b border-[var(--border-subtle)] last:border-0 pb-4 last:pb-0"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between py-2 text-left focus:outline-none"
                aria-expanded={openSection === section.id}
              >
                <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--text-primary)]">
                  {section.icon} {section.title}
                </h3>
                <span
                  className={`transition-transform duration-200 ${openSection === section.id ? 'rotate-180' : ''} text-[var(--text-secondary)]`}
                >
                  <Icons.ChevronDown />
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSection === section.id ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-[var(--text-secondary)] leading-relaxed pb-2">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticalInfo;
