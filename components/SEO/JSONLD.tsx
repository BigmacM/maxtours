interface TourSchemaProps {
  name: string;
  description: string;
  url: string;
  price: number;
  currency: string;
  duration: string; // ISO 8601 e.g. "PT8H"
  startLocation: string;
  itinerary: Array<{ name: string; description: string }>;
  rating: number;
  reviewCount: number;
  touristType: string[];
  locale: string;
}

export default function JSONLD({
  name,
  description,
  url,
  price,
  currency,
  duration,
  startLocation,
  itinerary,
  rating,
  reviewCount,
  touristType,
  locale,
}: TourSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    url,
    inLanguage: locale,
    duration,
    touristType: touristType.map((t) => ({
      '@type': 'Audience',
      audienceType: t,
    })),
    startLocation: {
      '@type': 'Place',
      name: startLocation,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Toronto',
        addressRegion: 'Ontario',
        addressCountry: 'CA',
      },
    },
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      seller: {
        '@type': 'TravelAgency',
        name: 'MaxTours',
        url: 'https://maxtours.ca',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: itinerary.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'TouristAttraction',
          name: item.name,
          description: item.description,
        },
      })),
    },
    provider: {
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
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

interface LocalBusinessSchemaProps {
  locale?: string;
}

export function LocalBusinessSchema({ locale = 'en-us' }: LocalBusinessSchemaProps) {
  const schema = {
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
      ratingValue: '4.9',
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
