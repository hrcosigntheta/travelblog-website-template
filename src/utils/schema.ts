import type { Destination } from '../data/destinations';

export function generateDestinationSchema(destination: Destination, siteUrl: string | URL) {
  const urlString = typeof siteUrl === 'string' ? siteUrl : siteUrl.href;
  const baseUrl = new URL(urlString);

  const images =
    destination.images?.map((img) => {
      try {
        return new URL(img, baseUrl).href;
      } catch {
        return img;
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
    image: images.map((img) => img.src),
    isPartOf: {
      '@type': 'WebSite',
      name: 'Philippines Travel Blog',
      url: new URL('/', urlString).href,
    },
  };

  return schema;
}
