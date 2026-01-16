import type { SocialLink } from '../components/BloggerHero';
import type { Milestone } from '../components/TravelTimeline';
import type { EquipmentItem } from '../components/EquipmentShowcase';

export interface TravelStat {
  label: string;
  value: number;
  suffix?: string;
  icon: 'globe' | 'map' | 'compass' | 'calendar' | 'camera' | 'navigation';
}

export interface SocialLinkExtended extends SocialLink {
  handle: string;
  description: string;
  color: string;
}

export interface BloggerProfile {
  name: string;
  tagline: string;
  shortBio: string;
  fullBio: string[];
  portraitSrc: string;
  heroSrc: string;
  email: string;
  socialLinks: SocialLinkExtended[];
  travelStats: TravelStat[];
  philosophy: {
    quote: string;
    content: string;
    missionStatement: string;
  };
  equipment: EquipmentItem[];
  milestones: Milestone[];
}

export const bloggerProfile: BloggerProfile = {
  name: 'MasuRii',
  tagline: 'Our Story',
  shortBio:
    'Meet the explorers behind the guide. Learn about our travel philosophy, gear, and mission to showcase the Philippines.',
  fullBio: [
    "It started with a single backpack and a one-way ticket to Cebu. Seven years later, I'm still discovering hidden lagoons, mountain peaks, and cultural treasures across the Philippines.",
    'My mission is simple: to show you that the Philippines is more than just Boracay and Palawan. There are thousands of islands waiting to be explored, each with its own story, flavor, and rhythm.',
    "Whether you're a luxury traveler or a budget backpacker, this blog is your guide to authentic experiences, responsible tourism, and unforgettable memories.",
  ],
  portraitSrc: '/images/placeholders/people/people-1.jpg',
  heroSrc: '/images/placeholders/beaches/beaches-1.jpg',
  email: 'hello@travelblog-template.com',
  socialLinks: [
    {
      platform: 'instagram',
      url: 'https://instagram.com/masurii',
      label: 'Instagram',
      handle: '@masurii_travels',
      color: 'hover:border-pink-500 hover:text-pink-500',
      description: 'Daily travel photos & stories',
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com/@masurii',
      label: 'YouTube',
      handle: 'MasuRii Vlogs',
      color: 'hover:border-red-600 hover:text-red-600',
      description: 'Full travel guides & vlogs',
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/masurii',
      label: 'X (Twitter)',
      handle: '@masurii_tweets',
      color: 'hover:border-blue-400 hover:text-blue-400',
      description: 'Travel updates & thoughts',
    },
    {
      platform: 'facebook',
      url: 'https://facebook.com/masurii',
      label: 'Facebook',
      handle: 'MasuRii Travels',
      color: 'hover:border-blue-700 hover:text-blue-700',
      description: 'Community & events',
    },
    {
      platform: 'pinterest',
      url: 'https://pinterest.com/masurii',
      label: 'Pinterest',
      handle: '@masurii_pins',
      color: 'hover:border-red-500 hover:text-red-500',
      description: 'Travel inspiration boards',
    },
    {
      platform: 'tiktok',
      url: 'https://tiktok.com/@masurii',
      label: 'TikTok',
      handle: '@masurii_tok',
      color: 'hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white',
      description: 'Short-form travel clips',
    },
  ],
  travelStats: [
    { label: 'Countries Visited', value: 12, icon: 'globe' },
    { label: 'Destinations', value: 81, icon: 'map' },
    { label: 'Islands Visited', value: 45, suffix: '+', icon: 'compass' },
    { label: 'Years Traveling', value: 7, icon: 'calendar' },
    { label: 'Photos Taken', value: 15000, suffix: '+', icon: 'camera' },
    { label: 'Km Traveled', value: 50000, suffix: '+', icon: 'navigation' },
  ],
  philosophy: {
    quote:
      "We believe in slow travel, respecting local cultures, and leaving places better than we found them. It's not about checking items off a bucket list, but about the connections we make and the understanding we gain along the way.",
    content:
      "Travel is more than just sightseeing; it's about immersion. It's waking up to the sound of waves in Siargao, sharing a meal with a local family in Batanes, and understanding the rich tapestry of cultures that make up the Philippines. With over 7,000 islands, the Philippines offers endless opportunities for discovery.",
    missionStatement:
      'My mission is to promote responsible tourism and help you discover the authentic beauty of the Philippines, one island at a time.',
  },
  equipment: [
    {
      id: 'camera',
      name: 'Sony A7 IV',
      description:
        'My daily driver for both photo and video. The autofocus is reliable and the dynamic range is perfect for travel scenes.',
      category: 'Camera',
      imageUrl: '/images/placeholders/adventure/adventure-1.jpg',
      shopUrl: 'https://amazon.com/dp/B09JZT6Y55',
    },
    {
      id: 'lens-wide',
      name: 'Sony 16-35mm GM',
      description:
        'Essential for capturing sweeping landscapes and tight indoor spaces. Sharp from corner to corner.',
      category: 'Lens',
      imageUrl: '/images/placeholders/adventure/adventure-2.jpg',
      shopUrl: 'https://amazon.com/dp/B074V56463',
    },
    {
      id: 'drone',
      name: 'DJI Mavic 3',
      description:
        'For those aerial perspectives that show the true scale of the Philippine islands and coastlines.',
      category: 'Drone',
      imageUrl: '/images/placeholders/adventure/adventure-3.jpg',
      shopUrl: 'https://amazon.com/dp/B09JZT6Y55',
    },
    {
      id: 'action',
      name: 'GoPro Hero 11',
      description:
        'Waterproof and rugged. Perfect for diving, canyoneering, and rainy days when the big camera stays dry.',
      category: 'Action Cam',
      imageUrl: '/images/placeholders/beaches/beaches-1.jpg',
      shopUrl: 'https://amazon.com/dp/B09JZT6Y55',
    },
    {
      id: 'bag',
      name: 'Wandrd Prvke 31L',
      description:
        'The best travel camera bag I have found. Weather resistant, expandable, and looks good in the city too.',
      category: 'Bag',
      imageUrl: '/images/placeholders/beaches/beaches-2.jpg',
      shopUrl: 'https://amazon.com/dp/B09JZT6Y55',
    },
    {
      id: 'tripod',
      name: 'Peak Design Travel Tripod',
      description:
        'Compact enough to fit in a water bottle pocket but stable enough for long exposures.',
      category: 'Accessory',
      imageUrl: '/images/placeholders/beaches/beaches-3.jpg',
      shopUrl: 'https://amazon.com/dp/B09JZT6Y55',
    },
    {
      id: 'laptop',
      name: 'MacBook Pro 14"',
      description:
        'My mobile editing studio. Powerful enough to handle 4K video editing on the go.',
      category: 'Tech',
      imageUrl: '/images/placeholders/beaches/beaches-4.jpg',
      shopUrl: 'https://amazon.com/dp/B09JZT6Y55',
    },
    {
      id: 'power',
      name: 'Anker PowerCore 24K',
      description: 'Keeps everything charged during long travel days on ferries and buses.',
      category: 'Accessory',
      imageUrl: '/images/placeholders/beaches/beaches-5.jpg',
      shopUrl: 'https://amazon.com/dp/B09JZT6Y55',
    },
  ],
  milestones: [
    {
      date: '2016',
      title: 'The Journey Begins',
      description:
        'Quit my corporate job and bought a one-way ticket to Cebu. My first solo trip that changed everything.',
      image: {
        src: '/images/destinations/siargao-island-main.jpg',
        alt: 'First trip to Cebu',
      },
    },
    {
      date: '2017',
      title: 'First Viral Post',
      description:
        'My guide to the hidden waterfalls of Samboan went viral, reaching 100k people and launching my blogging career.',
    },
    {
      date: '2019',
      title: 'Explored Batanes',
      description:
        'A dream come true. Spent 2 weeks in the northernmost islands of the Philippines, experiencing Ivatan culture.',
      image: {
        src: '/images/destinations/batanes-main.jpg',
        alt: 'Batanes landscape',
      },
    },
    {
      date: '2021',
      title: 'Sustainable Tourism Advocate',
      description:
        'Partnered with local LGUs to promote responsible tourism practices and beach cleanups.',
    },
    {
      date: '2023',
      title: 'Best Travel Blog Award',
      description:
        'Honored to receive the "Best Philippine Travel Blog" award at the Tourism Summit.',
      image: { src: '/images/destinations/coron-palawan-main.jpg', alt: 'Holding award' },
    },
  ],
};
