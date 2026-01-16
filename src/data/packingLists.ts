export interface PackingItem {
  id: string;
  label: string;
  category: string;
}

export interface PackingListCategory {
  id: string;
  title: string;
  items: PackingItem[];
}

export const generalPackingList: PackingListCategory[] = [
  {
    id: 'documents',
    title: 'Documents & Essentials',
    items: [
      { id: 'doc-passport', label: 'Passport & ID', category: 'documents' },
      { id: 'doc-tickets', label: 'Flight Tickets / Boarding Passes', category: 'documents' },
      { id: 'doc-insurance', label: 'Travel Insurance', category: 'documents' },
      { id: 'doc-cash', label: 'Cash (PHP) & Credit Cards', category: 'documents' },
      { id: 'doc-sim', label: 'SIM Card / E-SIM', category: 'documents' },
    ],
  },
  {
    id: 'clothing',
    title: 'Clothing',
    items: [
      { id: 'clothes-shirts', label: 'T-Shirts / Tops', category: 'clothing' },
      { id: 'clothes-shorts', label: 'Shorts / Skirts', category: 'clothing' },
      { id: 'clothes-underwear', label: 'Underwear & Socks', category: 'clothing' },
      { id: 'clothes-swimwear', label: 'Swimwear', category: 'clothing' },
      { id: 'clothes-hat', label: 'Sun Hat / Cap', category: 'clothing' },
    ],
  },
  {
    id: 'toiletries',
    title: 'Toiletries & Health',
    items: [
      { id: 'health-toothbrush', label: 'Toothbrush & Toothpaste', category: 'toiletries' },
      { id: 'health-sunscreen', label: 'Sunscreen (Reef Safe)', category: 'toiletries' },
      { id: 'health-insect', label: 'Insect Repellent', category: 'toiletries' },
      { id: 'health-meds', label: 'Personal Medications', category: 'toiletries' },
      { id: 'health-sanitizer', label: 'Hand Sanitizer', category: 'toiletries' },
    ],
  },
  {
    id: 'electronics',
    title: 'Electronics',
    items: [
      { id: 'tech-phone', label: 'Phone & Charger', category: 'electronics' },
      { id: 'tech-powerbank', label: 'Power Bank', category: 'electronics' },
      { id: 'tech-adapter', label: 'Universal Adapter', category: 'electronics' },
      { id: 'tech-camera', label: 'Camera & Memory Cards', category: 'electronics' },
    ],
  },
];

export const beachPackingList: PackingItem[] = [
  { id: 'beach-towel', label: 'Microfiber Beach Towel', category: 'beach' },
  { id: 'beach-bag', label: 'Dry Bag', category: 'beach' },
  { id: 'beach-sunglasses', label: 'Polarized Sunglasses', category: 'beach' },
  { id: 'beach-shoes', label: 'Aqua Shoes', category: 'beach' },
  { id: 'beach-snorkel', label: 'Snorkel Gear', category: 'beach' },
];

export const hikingPackingList: PackingItem[] = [
  { id: 'hike-shoes', label: 'Hiking Shoes / Sandals', category: 'hiking' },
  { id: 'hike-bottle', label: 'Reusable Water Bottle', category: 'hiking' },
  { id: 'hike-raincoat', label: 'Lightweight Raincoat', category: 'hiking' },
  { id: 'hike-headlamp', label: 'Headlamp / Flashlight', category: 'hiking' },
  { id: 'hike-pole', label: 'Trekking Poles', category: 'hiking' },
];
