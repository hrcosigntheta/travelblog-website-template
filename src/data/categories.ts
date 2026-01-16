export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string; // SVG path or name
  image: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: '1',
    slug: 'beaches',
    name: 'Beaches & Islands',
    icon: 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z', // Sun
    image: '/images/placeholders/beaches/beaches-1.jpg',
    count: 12,
  },
  {
    id: '2',
    slug: 'mountains',
    name: 'Mountains & Hiking',
    icon: 'M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L10.5 12l.375.375m-.75-3.375h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm10.5-8.25V6a2.25 2.25 0 00-2.25-2.25h-6.375a2.25 2.25 0 00-2.25 2.25v1.312c0 .618.255 1.21.713 1.643l.942.89c.142.135.342.164.51.074a20.088 20.088 0 005.86-5.86c.09-.168.061-.368-.074-.51l-.89-.942a2.247 2.247 0 00-1.643-.713z', // Mountain (approx)
    image: '/images/placeholders/mountains/mountains-1.jpg',
    count: 8,
  },
  {
    id: '3',
    slug: 'cultural',
    name: 'Cultural & History',
    icon: 'M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z', // Monument
    image: '/images/placeholders/cultural/cultural-1.jpg',
    count: 6,
  },
  {
    id: '4',
    slug: 'adventure',
    name: 'Adventure',
    icon: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z', // Fire/Adventure
    image: '/images/placeholders/adventure/adventure-1.jpg',
    count: 10,
  },
  {
    id: '5',
    slug: 'food',
    name: 'Food & Culinary',
    icon: 'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z', // Pie/Food (approx)
    image: '/images/placeholders/food/food-1.jpg',
    count: 15,
  },
  {
    id: '6',
    slug: 'gems',
    name: 'Hidden Gems',
    icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z', // Eye
    image: '/images/placeholders/beaches/beaches-2.jpg',
    count: 4,
  },
];
