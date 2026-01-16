export interface Adventure {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  categories: string[];
  image: string;
  imageAlt: string;
  relatedDestinations: string[]; // Array of destination slugs
}
