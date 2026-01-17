import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

export type MarkerCategory = 'beach' | 'mountain' | 'cultural' | 'food' | 'adventure' | 'default';

interface IconProps {
  color: string;
  className?: string;
}

const BeachIcon = ({ color, className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12h20" />
    <path d="M2 17h20" />
    <path d="M2 7h20" />
    <path d="M12 2a5 5 0 0 1 5 5" />
    <path d="M7 7a5 5 0 0 1 5-5" />
  </svg>
);

const MountainIcon = ({ color, className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);

const CulturalIcon = ({ color, className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21h18" />
    <path d="M5 21v-7" />
    <path d="M19 21v-7" />
    <path d="M5 10a5 5 0 0 1 14 0" />
    <path d="M12 10V3" />
    <path d="M8 7a4 4 0 0 0 8 0" />
  </svg>
);

const FoodIcon = ({ color, className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const AdventureIcon = ({ color, className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const DefaultIcon = ({ color, className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const getCategoryFromTags = (tags: string[]): MarkerCategory => {
  const lowerTags = tags.map((t) => t.toLowerCase());
  if (
    lowerTags.includes('beach') ||
    lowerTags.includes('island') ||
    lowerTags.includes('coastal') ||
    lowerTags.includes('surfing') ||
    lowerTags.includes('diving')
  )
    return 'beach';
  if (
    lowerTags.includes('hiking') ||
    lowerTags.includes('nature') ||
    lowerTags.includes('mountain') ||
    lowerTags.includes('mountains') ||
    lowerTags.includes('volcano') ||
    lowerTags.includes('waterfalls') ||
    lowerTags.includes('river') ||
    lowerTags.includes('forest') ||
    lowerTags.includes('wildlife')
  )
    return 'mountain';
  if (
    lowerTags.includes('culture') ||
    lowerTags.includes('history') ||
    lowerTags.includes('landmark') ||
    lowerTags.includes('sightseeing') ||
    lowerTags.includes('heritage') ||
    lowerTags.includes('temple') ||
    lowerTags.includes('museum') ||
    lowerTags.includes('cultural') ||
    lowerTags.includes('city') ||
    lowerTags.includes('urban') ||
    lowerTags.includes('town')
  )
    return 'cultural';
  if (
    lowerTags.includes('food') ||
    lowerTags.includes('culinary') ||
    lowerTags.includes('restaurant') ||
    lowerTags.includes('dining') ||
    lowerTags.includes('local cuisine')
  )
    return 'food';
  if (
    lowerTags.includes('adventure') ||
    lowerTags.includes('activity') ||
    lowerTags.includes('trekking') ||
    lowerTags.includes('trails')
  )
    return 'adventure';
  return 'default';
};

const getIconComponent = (category: MarkerCategory) => {
  switch (category) {
    case 'beach':
      return { Component: BeachIcon, color: '#006d77', bgColor: '#ccecef' }; // Ocean Blue
    case 'mountain':
      return { Component: MountainIcon, color: '#005a63', bgColor: '#83c5be' }; // Jungle Green
    case 'cultural':
      return { Component: CulturalIcon, color: '#e29578', bgColor: '#fdf4f1' }; // Sunset Coral
    case 'food':
      return { Component: FoodIcon, color: '#d07d5d', bgColor: '#ffe4e6' }; // Warm Amber/Pink
    case 'adventure':
      return { Component: AdventureIcon, color: '#b45309', bgColor: '#fef3c7' }; // Amber
    default:
      return { Component: DefaultIcon, color: '#6c757d', bgColor: '#f3f4f6' }; // Neutral
  }
};

export const createCustomIcon = (category: MarkerCategory) => {
  const { Component, color, bgColor } = getIconComponent(category);

  // We create a "pin" shape with the icon inside
  const iconMarkup = renderToStaticMarkup(
    <div className="relative group transition-transform duration-300 ease-out hover:scale-110">
      <div
        style={{
          backgroundColor: bgColor,
          borderColor: color,
        }}
        className="w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg relative z-10"
      >
        <Component color={color} className="w-6 h-6" />
      </div>
      {/* Triangle for pin point */}
      <div
        style={{
          backgroundColor: color,
        }}
        className="w-3 h-3 absolute left-1/2 -translate-x-1/2 -bottom-1 rotate-45 z-0"
      />
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: 'custom-marker-icon', // Use this class for global styles if needed
    iconSize: [40, 48],
    iconAnchor: [20, 48], // Tip of the pin
    popupAnchor: [0, -48], // Above the pin
  });
};
