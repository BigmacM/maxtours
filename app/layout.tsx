import type { Metadata } from 'next';
import './globals.css';
import { GTM_ID, getGTMScript, getGTMNoScript } from '@/lib/analytics/gtm';

export const metadata: Metadata = {
  metadataBase: new URL('https://maxtours.ca'),
  title: {
    default: 'MaxTours — Toronto\'s Most Exclusive Private Tours',
    template: '%s | MaxTours',
  },
  description:
    'Bespoke private tours from Toronto to Niagara Falls. Premium vehicles, expert guides, and curated experiences for discerning travellers.',
  keywords: [
    'Toronto private tours',
    'Niagara Falls private tour',
    'luxury tours Toronto',
    'private Niagara tour',
    'Toronto day tours',
  ],
  authors: [{ name: 'MaxTours', url: 'https://maxtours.ca' }],
  creator: 'MaxTours',
  publisher: 'MaxTours',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://maxtours.ca',
    siteName: 'MaxTours',
    title: 'MaxTours — Toronto\'s Most Exclusive Private Tours',
    description:
      'Bespoke private tours from Toronto to Niagara Falls. Premium vehicles, expert guides, and curated experiences for discerning travellers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaxTours — Toronto\'s Most Exclusive Private Tours',
    description:
      'Bespoke private tours from Toronto to Niagara Falls. Premium vehicles, expert guides, and curated experiences for discerning travellers.',
    creator: '@maxtours',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="gtm-script"
          dangerouslySetInnerHTML={{ __html: getGTMScript() }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-midnight text-taupe-light antialiased">
        <noscript>
          <div dangerouslySetInnerHTML={{ __html: getGTMNoScript() }} />
        </noscript>
        {children}
      </body>
    </html>
  );
}
