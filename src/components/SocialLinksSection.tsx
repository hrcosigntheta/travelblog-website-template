import React from 'react';
import { openDemoModal } from '../store/demo-modal';
import { bloggerProfile, type SocialLinkExtended } from '../data/blogger';

const SocialIcon = ({ id }: { id: string }) => {
  switch (id) {
    case 'instagram':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
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
    case 'youtube':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
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
    case 'twitter':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
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
          width="32"
          height="32"
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
    case 'pinterest':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 20l4-9 4 9"></path>
          <path d="M12 11V3"></path>
        </svg>
      );
    case 'tiktok':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
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
      return null;
  }
};

export const SocialLinksSection: React.FC = () => {
  const handleClick = (e: React.MouseEvent, platform: SocialLinkExtended) => {
    e.preventDefault();
    openDemoModal({
      url: platform.url,
      label: `${platform.label} Profile`,
      category: 'Social Media',
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6">
        Connect With Me
      </h2>
      <p className="text-[var(--text-secondary)] mb-8">
        Follow my adventures in real-time. I share daily updates, behind-the-scenes content, and
        travel tips on these platforms.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {bloggerProfile.socialLinks.map((platform) => (
          <a
            key={platform.platform}
            href={platform.url}
            onClick={(e) => handleClick(e, platform)}
            className={`group flex items-center p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-default)] transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${platform.color}`}
            aria-label={`Visit my ${platform.label}`}
          >
            <div className="flex-shrink-0 mr-4 text-[var(--text-secondary)] group-hover:text-inherit transition-colors">
              <SocialIcon id={platform.platform} />
            </div>
            <div>
              <div className="font-bold text-[var(--text-primary)] group-hover:text-inherit transition-colors">
                {platform.label}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">{platform.handle}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{platform.description}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
