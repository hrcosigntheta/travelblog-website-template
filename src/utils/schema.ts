import type { Destination } from '../data/destinations';
import type { BloggerProfile } from '../data/blogger';
import type { Adventure } from '../data/adventures';

export function generateDestinationSchema(destination: Destination, siteUrl: string | URL) {
  const urlString = typeof siteUrl === 'string' ? siteUrl : siteUrl.href;
  const baseUrl = new URL(urlString);

  const images =
    destination.images?.map((img) => {
      try {
        return new URL(img.src, baseUrl).href;
      } catch {
        return img.src;
      }
    }) || [];

  const destinationSchema = {
    '@type': 'TouristDestination',
    '@id': `${urlString}#destination`,
    name: destination.title,
    description: destination.description,
    url: urlString,
    image: images,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: destination.coordinates.lat,
      longitude: destination.coordinates.lng,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: destination.region,
      addressCountry: 'PH',
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`,
    touristType: destination.tags,
  };

  const gallerySchema = {
    '@type': 'ImageGallery',
    '@id': `${urlString}#gallery`,
    name: `Photos of ${destination.title}`,
    url: `${urlString}#gallery`,
    image: images,
    author: {
      '@type': 'Person',
      name: destination.author.name,
      url: new URL(destination.author.url, baseUrl).href,
      image: new URL(destination.author.image, baseUrl).href,
    },
    about: {
      '@id': `${urlString}#destination`,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [destinationSchema, gallerySchema],
  };
}

export function generateCollectionPageSchema(
  title: string,
  description: string,
  url: string | URL
) {
  const urlString = typeof url === 'string' ? url : url.href;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: description,
    url: urlString,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Philippines Travel Blog',
      url: new URL('/', urlString).href,
    },
  };

  return schema;
}

export function generateGalleryPageSchema(
  title: string,
  description: string,
  url: string | URL,
  images: Array<{ src: string; caption?: string }>
) {
  const urlString = typeof url === 'string' ? url : url.href;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: title,
    description: description,
    url: urlString,
    image: images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: img.src,
      caption: img.caption,
    })),
    isPartOf: {
      '@type': 'WebSite',
      name: 'Philippines Travel Blog',
      url: new URL('/', urlString).href,
    },
  };

  return schema;
}

export function generateAdventureSchema(adventure: Adventure, siteUrl: string | URL) {
  const urlString = typeof siteUrl === 'string' ? siteUrl : siteUrl.href;
  const baseUrl = new URL(urlString);

  // Try to parse the date, fallback to current date if invalid
  let datePublished: string;
  try {
    datePublished = new Date(adventure.date).toISOString();
  } catch {
    datePublished = new Date().toISOString();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: adventure.title,
    description: adventure.excerpt,
    image: adventure.image,
    datePublished,
    author: {
      '@type': 'Person',
      name: adventure.author.name,
      url: new URL(adventure.author.url, baseUrl).href,
      image: new URL(adventure.author.image, baseUrl).href,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Philippines Travel Blog',
      logo: {
        '@type': 'ImageObject',
        url: new URL('/favicon.svg', baseUrl).href,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': urlString,
    },
  };

  return schema;
}

export function generateWebSiteSchema(siteUrl: string | URL) {
  const urlString = typeof siteUrl === 'string' ? siteUrl : siteUrl.href;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Philippines Travel Blog',
    url: urlString,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${urlString.endsWith('/') ? urlString : urlString + '/'}destinations?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return schema;
}

export function generateBreadcrumbSchema(
  items: Array<{ label: string; href: string }>,
  siteUrl: string | URL
) {
  const urlString = typeof siteUrl === 'string' ? siteUrl : siteUrl.href;
  const baseUrl = new URL(urlString);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: new URL(item.href, baseUrl).href,
    })),
  };
}

export function generatePersonSchema(profile: BloggerProfile, siteUrl: string | URL) {
  const urlString = typeof siteUrl === 'string' ? siteUrl : siteUrl.href;
  const baseUrl = new URL(urlString);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: new URL('/about', baseUrl).href,
    image: new URL(profile.portraitSrc, baseUrl).href,
    description: profile.shortBio,
    jobTitle: 'Travel Blogger',
    sameAs: profile.socialLinks.map((link) => link.url),
  };

  return schema;
}
