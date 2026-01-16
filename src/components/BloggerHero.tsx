import React from 'react';
import { openDemoModal } from '../store/demo-modal';

interface Stat {
  label: string;
  value: string;
}

export interface SocialLink {
  platform: 'instagram' | 'twitter' | 'facebook' | 'youtube' | 'pinterest' | 'tiktok';
  url: string;
  label: string;
}

interface BloggerHeroProps {
  name: string;
  tagline: string;
  portraitSrc: string;
  stats: Stat[];
  socialLinks: readonly SocialLink[];
  children?: React.ReactNode;
}

export const BloggerHero: React.FC<BloggerHeroProps> = ({
  name,
  tagline,
  portraitSrc,
  children,
  stats,
  socialLinks,
}) => {
  const handleSocialClick = (e: React.MouseEvent, link: SocialLink) => {
    e.preventDefault();
    openDemoModal({
      url: link.url,
      label: `${link.platform.charAt(0).toUpperCase() + link.platform.slice(1)} Profile`,
      category: 'Social Media',
    });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
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
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case 'twitter':
        return (
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
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 13.6.2 8.6 6 2.6 6 2.6s.4 4.5 4.3 8c1.6-4.5 9-4.3 9-4.3z"></path>
          </svg>
        );
      case 'facebook':
        return (
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
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        );
      case 'youtube':
        return (
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
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        );
      case 'pinterest':
        return (
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
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        ); // Fallback icon as feather-icons doesn't have pinterest in default set usually, using plus for now or generic social
      case 'tiktok':
        return (
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
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
          </svg>
        );
      default:
        return (
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
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        );
    }
  };

  return (
    <section className="py-20 bg-[var(--bg-surface)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-8 border-[var(--bg-surface)]">
              <img
                src={portraitSrc}
                alt={`Portrait of ${name}`}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase mb-2 block">
              {tagline}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
              Hi, I&apos;m {name}
            </h2>
            <div className="prose prose-lg text-[var(--text-secondary)] mb-8">{children}</div>

            {/* Social Links */}
            <div className="flex gap-4 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  onClick={(e) => handleSocialClick(e, link)}
                  className="w-10 h-10 rounded-full bg-[var(--bg-surface-raised)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                  aria-label={link.label}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 bg-[var(--bg-surface-raised)] rounded-xl border border-[var(--border-default)]"
                >
                  <div className="text-3xl font-bold text-[var(--color-primary)]">{stat.value}</div>
                  <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
