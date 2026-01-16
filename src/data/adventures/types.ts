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
  author: {
    name: string;
    url: string;
    image: string;
  };
  relatedDestinations: string[]; // Array of destination slugs
}
