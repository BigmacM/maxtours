import type { Activity } from '@/components/ExperienceBuilder/PricingCalculator';

export interface TourSchemaInput {
  name: string;
  description: string;
  url: string;
  price: number;
  currency: string;
  duration: string; // ISO 8601, e.g. "PT8H"
  startLocation: string;
  rating: number;
  reviewCount: number;
  touristType: string[];
  locale: string;
  /** Activities currently in the builder timeline */
  activities?: Activity[];
  /** Static itinerary for tour detail pages */
  staticItinerary?: Array<{ name: string; description: string }>;
}

const PROVIDER = {
  '@type': 'TravelAgency',
  name: 'MaxTours',
  url: 'https://maxtours.ca',
  telephone: '+1-416-555-0100',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Toronto',
    addressRegion: 'Ontario',
    addressCountry: 'CA',
  },
};

/**
 * Build a TouristTrip schema object from either a static itinerary
 * or a live set of builder activities.
 */
export function buildTouristTripSchema(input: TourSchemaInput) {
  const itineraryItems =
    input.activities && input.activities.length > 0
      ? input.activities.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'TouristAttraction',
            name: a.title,
            description: `${a.category} experience · ${a.duration > 0 ? `${a.duration} min` : 'Included'}${a.price > 0 ? ` · CA$${a.price}/pp` : ''}`,
          },
        }))
      : (input.staticItinerary ?? []).map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'TouristAttraction',
            name: item.name,
            description: item.description,
          },
        }));

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.locale,
    duration: input.duration,
    touristType: input.touristType.map((t) => ({
      '@type': 'Audience',
      audienceType: t,
    })),
    startLocation: {
      '@type': 'Place',
      name: input.startLocation,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Toronto',
        addressRegion: 'Ontario',
        addressCountry: 'CA',
      },
    },
    offers: {
      '@type': 'Offer',
      price: input.price.toString(),
      priceCurrency: input.currency,
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      seller: PROVIDER,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: input.rating.toString(),
      reviewCount: input.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: itineraryItems,
    },
    provider: PROVIDER,
  };
}

/**
 * Build the LocalBusiness / TravelAgency schema for the homepage.
 */
export function buildLocalBusinessSchema(locale = 'en-us') {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'MaxTours',
    description:
      "Toronto's most exclusive private tour operator. Bespoke journeys from downtown Toronto to Niagara Falls, crafted for discerning travellers who demand the extraordinary.",
    url: 'https://maxtours.ca',
    logo: 'https://maxtours.ca/logo.png',
    image: 'https://maxtours.ca/og-image.jpg',
    telephone: '+1-416-555-0100',
    email: 'inquiries@maxtours.ca',
    inLanguage: locale,
    priceRange: 'CA$695–CA$2,495+',
    currenciesAccepted: 'CAD, USD',
    paymentAccepted: 'Credit Card, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Downtown Toronto',
      addressLocality: 'Toronto',
      addressRegion: 'Ontario',
      postalCode: 'M5V',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.6532,
      longitude: -79.3832,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '21:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '1682',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Private Tours',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Toronto to Niagara Falls Private Tour',
            url: 'https://maxtours.ca/en-us/tours/toronto-niagara-falls-private-tour',
          },
          price: '695',
          priceCurrency: 'CAD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Toronto City Highlights Private Tour',
            url: 'https://maxtours.ca/en-us/tours/toronto-city-highlights',
          },
          price: '595',
          priceCurrency: 'CAD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Niagara-on-the-Lake Private Wine Tour',
            url: 'https://maxtours.ca/en-us/tours/niagara-on-the-lake-wine-tour',
          },
          price: '795',
          priceCurrency: 'CAD',
        },
      ],
    },
    sameAs: [
      'https://www.tripadvisor.com/maxtours',
      'https://www.instagram.com/maxtours',
      'https://www.facebook.com/maxtours',
    ],
  };
}
