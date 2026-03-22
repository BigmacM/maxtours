import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JSONLD from '@/components/SEO/JSONLD';
import BuilderCanvasClient from '@/components/ExperienceBuilder/BuilderCanvasClient';
import HomepageAnimations from '@/components/HomepageAnimations';
import { getTourBySlug, getAllTourSlugs } from '@/lib/tours';
import { locales, type Locale } from '@/i18n/request';

interface TourPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllTourSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return { title: 'Tour Not Found | MaxTours' };
  }

  const alternates: Record<string, string> = {};
  locales.forEach((loc) => {
    alternates[loc] = `https://maxtours.ca/${loc}/tours/${slug}`;
  });

  return {
    title: `${tour.name} | MaxTours`,
    description: tour.description,
    alternates: {
      canonical: `https://maxtours.ca/${locale}/tours/${slug}`,
      languages: alternates,
    },
    openGraph: {
      type: 'website',
      url: `https://maxtours.ca/${locale}/tours/${slug}`,
      title: `${tour.name} | MaxTours`,
      description: tour.description,
      siteName: 'MaxTours',
    },
  };
}

export default async function TourPage({ params }: TourPageProps) {
  const { locale, slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const tourUrl = `https://maxtours.ca/${locale}/tours/${slug}`;
  const itineraryForSchema = tour.itinerary.map((step) => ({
    name: step.title,
    description: step.description,
  }));

  return (
    <>
      {/* JSON-LD Schema */}
      <JSONLD
        name={tour.name}
        description={tour.description}
        url={tourUrl}
        price={tour.priceFrom}
        currency={tour.currency}
        duration={tour.durationISO}
        startLocation={tour.startLocation}
        itinerary={itineraryForSchema}
        rating={tour.rating}
        reviewCount={tour.reviewCount}
        touristType={tour.touristType}
        locale={locale}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                slug === 'toronto-niagara-falls-private-tour'
                  ? 'linear-gradient(135deg, #0a2540 0%, #1a4060 40%, #0d1b2a 100%)'
                  : slug === 'toronto-city-highlights'
                  ? 'linear-gradient(135deg, #1a0a30 0%, #2a1050 40%, #0d1b2a 100%)'
                  : 'linear-gradient(135deg, #0a2010 0%, #1a4020 40%, #0d1b2a 100%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.08) 0%, transparent 60%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.7) 60%, rgba(6,14,24,0.98) 100%)',
            }}
          />

          {/* Large emoji watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span
              className="text-[20rem] opacity-5"
              style={{ filter: 'blur(2px)' }}
            >
              {slug === 'toronto-niagara-falls-private-tour'
                ? '🌊'
                : slug === 'toronto-city-highlights'
                ? '🏙️'
                : '🍷'}
            </span>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-28 left-6 z-10">
          <nav className="flex items-center gap-2 font-inter text-xs text-taupe/50">
            <Link href={`/${locale}`} className="hover:text-taupe/80 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${locale}/tours`} className="hover:text-taupe/80 transition-colors">
              Tours
            </Link>
            <span>/</span>
            <span className="text-taupe/30 truncate max-w-48">{tour.name}</span>
          </nav>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <HomepageAnimations section="tour-hero">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-lg font-inter text-xs text-taupe/70"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {tour.category}
                </span>
                <span
                  className="px-3 py-1 rounded-lg font-inter text-xs text-gold/70"
                  style={{
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.15)',
                  }}
                >
                  {tour.duration}
                </span>
              </div>

              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
                {tour.name}
              </h1>

              <p className="font-inter text-base text-taupe/70 font-light italic mb-8">
                {tour.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-wider text-taupe/40 mb-0.5">
                    Starting From
                  </p>
                  <p className="font-playfair text-3xl text-gold">
                    CA${tour.priceFrom.toLocaleString()}
                  </p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-wider text-taupe/40 mb-0.5">
                    Rating
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="font-playfair text-xl text-gold">{tour.rating}</span>
                    <span className="font-inter text-xs text-taupe/50">({tour.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-wider text-taupe/40 mb-0.5">
                    Vehicle
                  </p>
                  <p className="font-inter text-sm text-taupe/70">{tour.vehicle}</p>
                </div>
              </div>
            </div>
          </HomepageAnimations>
        </div>
      </section>

      {/* Tour Body */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <HomepageAnimations section="desc">
              <div>
                <h2 className="font-playfair text-2xl text-white mb-6">About This Experience</h2>
                <div className="space-y-4">
                  {tour.longDescription.split('\n\n').map((para, i) => (
                    <p key={i} className="font-inter text-taupe/70 leading-relaxed font-light">
                      {para.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </HomepageAnimations>

            {/* Itinerary */}
            <HomepageAnimations section="itinerary">
              <div>
                <h2 className="font-playfair text-2xl text-white mb-6">Sample Itinerary</h2>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

                  <div className="space-y-6">
                    {tour.itinerary.map((step, i) => (
                      <div key={i} className="flex gap-6 relative">
                        {/* Timeline dot */}
                        <div
                          className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gold/50 flex items-center justify-center relative z-10"
                          style={{ background: '#0d1b2a' }}
                        >
                          <div className="w-2 h-2 rounded-full bg-gold/70" />
                        </div>

                        <div
                          className="flex-1 rounded-xl p-5 -mt-0.5"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                            border: '1px solid rgba(255,255,255,0.07)',
                          }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className="font-inter text-xs font-medium px-2 py-0.5 rounded"
                              style={{
                                background: 'rgba(212,175,55,0.12)',
                                color: '#d4af37',
                              }}
                            >
                              {step.time}
                            </span>
                            <h4 className="font-playfair text-base text-white">{step.title}</h4>
                          </div>
                          <p className="font-inter text-sm text-taupe/60 leading-relaxed font-light">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </HomepageAnimations>

            {/* FAQ Section */}
            <HomepageAnimations section="faq">
              <div>
                <h2 className="font-playfair text-2xl text-white mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {tour.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group rounded-xl overflow-hidden"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-inter text-sm font-medium text-white/90 hover:text-white transition-colors">
                        {faq.question}
                        <svg
                          className="w-4 h-4 text-gold/60 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-5 pb-5 pt-0">
                        <p className="font-inter text-sm text-taupe/65 leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </HomepageAnimations>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Booking CTA */}
            <HomepageAnimations section="booking-cta">
              <div
                className="rounded-2xl p-6 sticky top-28"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.04) 100%)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  boxShadow:
                    '0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(212,175,55,0.06)',
                }}
              >
                <h3 className="font-playfair text-lg text-white mb-1">Ready to Book?</h3>
                <p className="font-inter text-xs text-taupe/50 mb-5">
                  Secure your exclusive experience today
                </p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-inter text-[10px] uppercase tracking-wider text-taupe/40">From</span>
                  <span className="font-playfair text-3xl text-gold">
                    CA${tour.priceFrom.toLocaleString()}
                  </span>
                  <span className="font-inter text-xs text-taupe/50">per group</span>
                </div>

                <Link
                  href={`/${locale}/contact?tour=${slug}`}
                  className="block w-full py-3.5 rounded-xl text-center font-inter text-sm font-medium text-midnight-900 mb-3 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)',
                    boxShadow: '4px 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  Request a Private Quote
                </Link>

                <Link
                  href={`/${locale}/#builder`}
                  className="block w-full py-3 rounded-xl text-center font-inter text-sm text-gold/70 border border-gold/20 hover:border-gold/40 hover:text-gold transition-all duration-200"
                >
                  Customise Itinerary
                </Link>

                <div className="mt-5 pt-5 border-t border-white/8 space-y-2">
                  {[
                    'Free cancellation up to 48 hrs',
                    'No hidden fees or surcharges',
                    'Instant confirmation',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-gold/60 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-inter text-xs text-taupe/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </HomepageAnimations>

            {/* Included */}
            <HomepageAnimations section="included" delay={0.1}>
              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <h3 className="font-playfair text-base text-white mb-4">What&apos;s Included</h3>
                <ul className="space-y-2">
                  {tour.included.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-gold/60 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-inter text-xs text-taupe/70 font-light">{item}</span>
                    </li>
                  ))}
                </ul>

                {tour.notIncluded.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/8">
                    <h4 className="font-inter text-xs text-taupe/40 uppercase tracking-wider mb-2">
                      Not Included
                    </h4>
                    <ul className="space-y-1.5">
                      {tour.notIncluded.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-taupe/30 text-xs mt-0.5">—</span>
                          <span className="font-inter text-xs text-taupe/40 font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </HomepageAnimations>

            {/* Highlights */}
            <HomepageAnimations section="highlights" delay={0.2}>
              <div
                className="rounded-2xl p-6"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <h3 className="font-playfair text-base text-white mb-4">Highlights</h3>
                <ul className="space-y-2">
                  {tour.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gold/12 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                      </div>
                      <span className="font-inter text-xs text-taupe/70 font-light">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </HomepageAnimations>
          </div>
        </div>

        {/* Experience Builder Section */}
        <div className="mt-20">
          <HomepageAnimations section="builder-cta">
            <div className="text-center mb-10">
              <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-3">
                Make It Yours
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl text-white mb-3">
                Personalise This Experience
              </h2>
              <p className="font-inter text-taupe/60 max-w-lg mx-auto font-light text-sm">
                Add or remove activities, select your group size, and receive a bespoke quote instantly.
              </p>
            </div>
          </HomepageAnimations>

          <div
            className="rounded-3xl p-6 md:p-8"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            }}
          >
            <BuilderCanvasClient />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="py-12 px-6 border-t border-white/8 mt-16"
        style={{ background: 'rgba(6,14,24,0.8)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span
              className="font-playfair text-xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MaxTours
            </span>
            <p className="font-inter text-xs text-taupe/40 mt-1">
              Toronto&apos;s Premier Private Tour Operator
            </p>
          </div>
          <p className="font-inter text-xs text-taupe/30">
            &copy; {new Date().getFullYear()} MaxTours. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
