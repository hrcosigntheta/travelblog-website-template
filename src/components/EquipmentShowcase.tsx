import React from 'react';
import { openDemoModal } from '../store/demo-modal';
import { ImageWithFallback } from './ImageWithFallback';

export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  shopUrl: string;
}

interface EquipmentShowcaseProps {
  items: EquipmentItem[];
  title?: string;
  subtitle?: string;
}

export const EquipmentShowcase: React.FC<EquipmentShowcaseProps> = ({
  items,
  title = 'Essential Gear',
  subtitle = "What's in the bag",
}) => {
  const handleShopClick = (e: React.MouseEvent, item: EquipmentItem) => {
    e.preventDefault();
    openDemoModal({
      url: item.shopUrl,
      label: `Shop: ${item.name}`,
      category: 'Affiliate Link',
    });
  };

  return (
    <section className="py-20 bg-[var(--bg-surface)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase mb-2 block">
            {subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-[var(--bg-surface-raised)] rounded-2xl overflow-hidden border border-[var(--border-default)] hover:border-[var(--color-primary)] transition-all duration-200 ease-out hover:shadow-xl hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden bg-[var(--bg-default)]">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {item.category}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-bold text-xl text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-6 flex-grow">
                  {item.description}
                </p>

                <a
                  href={item.shopUrl}
                  onClick={(e) => handleShopClick(e, item)}
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-[var(--bg-surface)] hover:bg-[var(--color-primary)] text-[var(--text-primary)] hover:text-[var(--text-inverse)] border border-[var(--border-default)] hover:border-transparent rounded-lg transition-all duration-300 font-medium text-sm gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Check Price
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
