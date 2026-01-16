import React, { useState } from 'react';
import { openDemoModal } from '../store/demo-modal';

interface ShareButtonsProps {
  title?: string;
  url?: string;
  description?: string;
  image?: string;
  showLabel?: boolean;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  title = 'Amazing Destination in the Philippines',
  url,
  description = 'Check out this amazing travel destination!',
  image,
  showLabel = true,
}) => {
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  // Use current window location if url is not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = encodeURIComponent(title);
  const shareDescription = encodeURIComponent(description);
  const shareImage = image ? encodeURIComponent(image) : '';
  const shareUrlEncoded = encodeURIComponent(shareUrl);

  const handleShare = (e: React.MouseEvent, platform: string, link: string) => {
    e.preventDefault();
    openDemoModal({
      url: link,
      label: `Share on ${platform}`,
      category: 'Social Share',
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback or error handling could go here
    }
  };

  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`,
      color: 'hover:bg-[#1877F2] hover:text-white',
      icon: (
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
      ),
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrlEncoded}`,
      color: 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black',
      icon: (
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
      ),
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      url: `https://pinterest.com/pin/create/button/?url=${shareUrlEncoded}&description=${shareDescription}${shareImage ? `&media=${shareImage}` : ''}`,
      color: 'hover:bg-[#E60023] hover:text-white',
      icon: (
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
      ),
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: `https://wa.me/?text=${shareTitle}%20${shareUrlEncoded}`,
      color: 'hover:bg-[#25D366] hover:text-white',
      icon: (
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
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {showLabel && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            Share This
          </span>
          <div className="h-px flex-1 bg-[var(--border-subtle)]"></div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <a
            key={platform.id}
            href={platform.url}
            onClick={(e) => handleShare(e, platform.name, platform.url)}
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] transition-all duration-300 ${platform.color} hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
            aria-label={`Share on ${platform.name}`}
            title={`Share on ${platform.name}`}
          >
            {platform.icon}
          </a>
        ))}

        <button
          onClick={handleCopyLink}
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] relative"
          aria-label="Copy Link"
          title="Copy Link"
        >
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
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>

          {/* Toast Notification */}
          <div
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 transition-opacity pointer-events-none ${showCopiedToast ? 'opacity-100' : ''}`}
            role="alert"
          >
            Link Copied!
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black"></div>
          </div>
        </button>
      </div>
    </div>
  );
};
