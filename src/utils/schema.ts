import type { Destination } from '../data/destinations';

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
