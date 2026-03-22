import type { Metadata } from 'next';
import Link from 'next/link';
import { LocalBusinessSchema } from '@/components/SEO/JSONLD';
import { tours } from '@/lib/tours';
import { locales } from '@/i18n/request';

interface ToursPageProps {
  params: Promise<{ locale: string }>;
}

const LOCALE_META: Record<string, { title: string; description: string }> = {
  'en-us': {
    title: 'Private Tours from Toronto | MaxTours — Niagara Falls, Wine Country & City',
    description: 'Explore all MaxTours private experiences: Niagara Falls day trips, Toronto city highlights, and Niagara-on-the-Lake wine tours. Luxury SUV, expert guide, from CA$595.',
  },
  'en-gb': {
    title: 'Private Guided Tours from Toronto | MaxTours — Niagara Falls Holiday Experiences',
    description: 'Browse MaxTours bespoke holiday experiences: private Niagara Falls day trips, Toronto city tours, and wine country escapes. Expert guide, private estate car, from CA$595.',
  },
  'en-au': {
    title: 'Private Tour Packages from Toronto | MaxTours — Niagara Falls & Wine Country',
    description: 'Discover all MaxTours private holiday packages: Niagara Falls, Toronto and wine country tours. Premium return transfer, expert guide, unforgettable experiences from CA$595.',
  },
};

export async function generateMetadata({ params }: ToursPageProps): Promise<Metadata> {
  const { locale } = await params;
  const meta = LOCALE_META[locale] || LOCALE_META['en-us'];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://maxtours.ca/${locale}/tours`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://maxtours.ca/${l}/tours`])),
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const TOUR_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1530041539957-0c2c96d8bd15?w=900&q=80&auto=format&fit=crop',
    alt: 'Luxury private Niagara Falls tour — Horseshoe Falls mist aerial view',
  },
  {
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop',
    alt: 'Toronto CN Tower city highlights private guided tour',
  },
  {
    src: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=900&q=80&auto=format&fit=crop',
    alt: 'Niagara-on-the-Lake private wine tour Peller Estates icewine tasting',
  },
];

export default async function ToursPage({ params }: ToursPageProps) {
  const { locale } = await params;

  return (
    <>
      <LocalBusinessSchema locale={locale} />

      <div className="min-h-screen">
        {/* Header */}
        <section className="relative pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 to-midnight opacity-95" />

          {/* Subtle Niagara background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1562016600-ece13e8ba570?w=1600&q=70&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-8 font-inter text-xs text-taupe/40">
              <Link href={`/${locale}`} className="hover:text-gold/60 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-taupe/60">Tours</span>
            </div>
            <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-4">
              Curated Experiences
            </p>
            <h1 className="font-playfair text-5xl md:text-6xl text-white mb-4">
              Signature{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #E6D17B 0%, #d4af37 40%, #e8cc6a 70%, #c87941 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Journeys
              </span>
            </h1>
            <div className="w-24 h-px mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
            <p className="font-inter text-lg text-taupe/70 max-w-2xl mx-auto font-light">
              Three meticulously curated private experiences — each designed to reveal a different facet of Ontario&apos;s extraordinary landscape.
            </p>
          </div>
        </section>

        {/* Tour Cards — Full Detail */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {tours.map((tour, i) => (
              <div
                key={tour.slug}
                className="rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                <div className="grid md:grid-cols-5">
                  {/* Image */}
                  <div className="md:col-span-2 h-64 md:h-auto relative overflow-hidden bg-midnight-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={TOUR_IMAGES[i].src}
                      alt={TOUR_IMAGES[i].alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-midnight/60 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent md:hidden" />

                    {/* Category + duration overlay */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className="px-2.5 py-1 rounded-lg font-inter text-xs text-taupe/80"
                        style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
                      >
                        {tour.category}
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-lg font-inter text-xs text-gold/80"
                        style={{ background: 'rgba(13,27,42,0.8)', border: '1px solid rgba(212,175,55,0.2)', backdropFilter: 'blur(8px)' }}
                      >
                        {tour.duration}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-7 md:p-10 flex flex-col">
                    <p className="font-inter text-xs uppercase tracking-widest text-gold/60 mb-2">{tour.tagline}</p>
                    <h2 className="font-playfair text-2xl md:text-3xl text-white mb-3">{tour.name}</h2>
                    <p className="font-inter text-sm text-taupe/70 leading-relaxed font-light mb-5">
                      {tour.description}
                    </p>

                    {/* Highlights */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {tour.highlights.slice(0, 4).map((h) => (
                        <li key={h} className="flex items-start gap-2 font-inter text-xs text-taupe/60">
                          <span className="text-gold mt-0.5 flex-shrink-0 text-[10px]">✦</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Vehicle */}
                    <div className="flex items-center gap-2 mb-6 font-inter text-xs text-taupe/50">
                      <span>🚗</span>
                      <span>{tour.vehicle}</span>
                      <span className="text-white/20">·</span>
                      <span>Up to {tour.maxGuests} guests</span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/8">
                      <div>
                        <p className="font-inter text-[10px] uppercase tracking-wider text-taupe/40">From</p>
                        <p className="font-playfair text-2xl text-gold">CA${tour.priceFrom.toLocaleString()}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-gold/60 text-xs">★</span>
                          <span className="font-inter text-xs text-taupe/60">{tour.rating} · {tour.reviewCount} reviews</span>
                        </div>
                      </div>
                      <Link
                        href={`/${locale}/tours/${tour.slug}`}
                        className="px-6 py-3 rounded-xl font-inter font-medium text-midnight-900 text-sm transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)',
                          boxShadow: '4px 4px 12px rgba(0,0,0,0.3)',
                        }}
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA — Experience Builder */}
        <section className="py-16 px-6 bg-midnight-800/40">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-4">Can&apos;t Decide?</p>
            <h2 className="font-playfair text-3xl md:text-4xl text-white mb-4">
              Build Your Own Bespoke Day
            </h2>
            <p className="font-inter text-taupe/60 mb-8 font-light">
              Use our Experience Builder to mix and match activities from all three tours — then get an instant private quote via WhatsApp.
            </p>
            <Link
              href={`/${locale}/#builder`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-inter font-medium text-midnight-900 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)', boxShadow: '6px 6px 16px rgba(0,0,0,0.4)' }}
            >
              Open Experience Builder
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
