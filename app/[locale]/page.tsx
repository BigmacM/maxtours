import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import CompetitorShowcase from '@/components/CompetitorShowcase';
import { LocalBusinessSchema } from '@/components/SEO/JSONLD';
import { tours } from '@/lib/tours';
import { locales, type Locale } from '@/i18n/request';
import BuilderCanvasClient from '@/components/ExperienceBuilder/BuilderCanvasClient';
import HomepageAnimations from '@/components/HomepageAnimations';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const LOCALE_META: Record<string, { title: string; description: string; ogLocale: string }> = {
  'en-us': {
    title: "MaxTours — Toronto's Most Exclusive Private Tours | Niagara Falls Day Trips",
    description:
      'Private luxury tours from Toronto to Niagara Falls starting at CA$695. Bespoke itineraries, expert guides, premium vehicles. Book your exclusive experience today.',
    ogLocale: 'en_US',
  },
  'en-gb': {
    title: "MaxTours — Toronto's Most Exclusive Private Tours | Niagara Falls Day Trips",
    description:
      'Private luxury tours from Toronto to Niagara Falls from CA$695. Bespoke itineraries, expert guides, premium vehicles. Perfect for British travellers visiting Canada.',
    ogLocale: 'en_GB',
  },
  'en-au': {
    title: "MaxTours — Toronto's Most Exclusive Private Tours | Niagara Falls Day Trips",
    description:
      'Private luxury tours from Toronto to Niagara Falls from CA$695. Bespoke itineraries, expert guides, premium vehicles. The definitive experience for Australian visitors to Canada.',
    ogLocale: 'en_AU',
  },
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const meta = LOCALE_META[locale] || LOCALE_META['en-us'];

  const alternates: Record<string, string> = {};
  locales.forEach((loc) => {
    alternates[loc] = `https://maxtours.ca/${loc}`;
  });

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://maxtours.ca/${locale}`,
      languages: alternates,
    },
    openGraph: {
      type: 'website',
      locale: meta.ogLocale,
      url: `https://maxtours.ca/${locale}`,
      title: meta.title,
      description: meta.description,
      siteName: 'MaxTours',
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const WHY_CARDS = [
    {
      icon: '✦',
      title: 'Bespoke Journeys',
      description:
        'Every itinerary is crafted exclusively for you. No shared coaches, no rigid schedules — only curated experiences tailored to your desires and timeline.',
      accent: 'No two tours alike',
    },
    {
      icon: '◈',
      title: 'Expert Guides',
      description:
        'Our certified guides bring decades of local expertise, weaving together history, culture and insider access unavailable to ordinary tourists.',
      accent: 'Licensed & certified',
    },
    {
      icon: '◉',
      title: 'Premium Vehicles',
      description:
        'Travel in uncompromising comfort aboard our immaculate fleet — from executive sedans to custom Mercedes Sprinters, each meticulously appointed.',
      accent: 'Luxury fleet only',
    },
  ];

  const TRUST_SIGNALS = [
    { platform: 'TripAdvisor', rating: '4.9', reviews: '847', badge: '⭐' },
    { platform: 'Google Reviews', rating: '5.0', reviews: '523', badge: '🌟' },
  ];

  return (
    <>
      <LocalBusinessSchema locale={locale} />

      {/* Hero */}
      <HeroSection locale={locale} />

      {/* Why MaxTours — Bento Grid */}
      <section className="py-24 px-6" id="why">
        <div className="max-w-7xl mx-auto">
          <HomepageAnimations section="why">
            <div className="text-center mb-16">
              <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-4">
                The MaxTours Difference
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
                Why Discerning Travellers Choose MaxTours
              </h2>
              <p className="font-inter text-taupe/60 max-w-xl mx-auto font-light">
                Three pillars of excellence that elevate every journey beyond the ordinary.
              </p>
            </div>
          </HomepageAnimations>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {WHY_CARDS.map((card, i) => (
              <HomepageAnimations key={card.title} section="why-card" delay={i * 0.15}>
                <div
                  className="group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow:
                      '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Hover border effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.2)',
                    }}
                  />

                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                      style={{
                        background: 'rgba(212,175,55,0.12)',
                        border: '1px solid rgba(212,175,55,0.25)',
                      }}
                    >
                      <span className="text-gold text-xl font-playfair">{card.icon}</span>
                    </div>
                    <div className="h-px w-8 bg-gradient-to-r from-gold/50 to-transparent" />
                  </div>

                  <h3 className="font-playfair text-xl text-white mb-3">{card.title}</h3>
                  <p className="font-inter text-sm text-taupe/70 leading-relaxed mb-5 font-light">
                    {card.description}
                  </p>

                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg"
                    style={{
                      background: 'rgba(212,175,55,0.08)',
                      border: '1px solid rgba(212,175,55,0.15)',
                    }}
                  >
                    <div className="w-1 h-1 rounded-full bg-gold" />
                    <span className="font-inter text-xs text-gold/80">{card.accent}</span>
                  </div>
                </div>
              </HomepageAnimations>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-20 px-6 bg-midnight-800/50">
        <div className="max-w-7xl mx-auto">
          <HomepageAnimations section="tours">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-3">
                  Curated Experiences
                </p>
                <h2 className="font-playfair text-4xl md:text-5xl text-white">
                  Signature Journeys
                </h2>
              </div>
              <Link
                href={`/${locale}/tours`}
                className="hidden md:flex items-center gap-2 font-inter text-sm text-gold/70 hover:text-gold transition-colors duration-200"
              >
                View all tours
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </HomepageAnimations>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tours.map((tour, i) => (
              <HomepageAnimations key={tour.slug} section="tour-card" delay={i * 0.12}>
                <Link
                  href={`/${locale}/tours/${tour.slug}`}
                  className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    minHeight: '360px',
                  }}
                >
                  {/* Image placeholder */}
                  <div
                    className="h-48 w-full flex-shrink-0 relative overflow-hidden"
                    style={{
                      background:
                        i === 0
                          ? 'linear-gradient(135deg, #0a2540 0%, #1a4060 50%, #0d2d45 100%)'
                          : i === 1
                          ? 'linear-gradient(135deg, #1a0a20 0%, #3a1a40 50%, #2d0d3a 100%)'
                          : 'linear-gradient(135deg, #0a2010 0%, #1a4020 50%, #0d2d15 100%)',
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-20">
                        {i === 0 ? '🌊' : i === 1 ? '🏙️' : '🍷'}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-70" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <div
                        className="px-2.5 py-1 rounded-lg font-inter text-xs text-taupe/80"
                        style={{
                          background: 'rgba(13,27,42,0.7)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {tour.category}
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-4 right-4">
                      <div
                        className="px-2.5 py-1 rounded-lg font-inter text-xs text-gold/80"
                        style={{
                          background: 'rgba(13,27,42,0.8)',
                          border: '1px solid rgba(212,175,55,0.2)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {tour.duration}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="font-playfair text-lg text-white mb-2 group-hover:text-gold/90 transition-colors duration-300">
                      {tour.name}
                    </h3>
                    <p className="font-inter text-sm text-taupe/60 leading-relaxed mb-4 flex-1 font-light">
                      {tour.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-inter text-[10px] uppercase tracking-wider text-taupe/40">
                          From
                        </p>
                        <p className="font-playfair text-xl text-gold">
                          CA${tour.priceFrom.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-gold/50 group-hover:text-gold/80 transition-colors duration-300">
                        <span className="font-inter text-xs">Explore</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.2)',
                    }}
                  />
                </Link>
              </HomepageAnimations>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Builder Section */}
      <section className="py-24 px-6" id="builder">
        <div className="max-w-7xl mx-auto">
          <HomepageAnimations section="builder">
            <div className="text-center mb-12">
              <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-4">
                Personalise Your Day
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
                Compose Your Perfect Day
              </h2>
              <p className="font-inter text-taupe/60 max-w-xl mx-auto font-light">
                Drag, arrange and personalise your ideal itinerary — then receive your bespoke private quote instantly.
              </p>
            </div>
          </HomepageAnimations>

          <div
            className="rounded-3xl p-6 md:p-8"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <BuilderCanvasClient />
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <div className="bg-midnight-800/30">
        <CompetitorShowcase />
      </div>

      {/* Trust Signals */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <HomepageAnimations section="trust">
            <div className="text-center mb-12">
              <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-4">
                Trusted by Travellers Worldwide
              </p>
              <h2 className="font-playfair text-4xl text-white">
                What Our Guests Say
              </h2>
            </div>
          </HomepageAnimations>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {TRUST_SIGNALS.map((signal, i) => (
              <HomepageAnimations key={signal.platform} section="trust-card" delay={i * 0.15}>
                <div
                  className="rounded-2xl p-8 flex items-center gap-6"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  <div className="text-5xl">{signal.badge}</div>
                  <div>
                    <p className="font-inter text-xs uppercase tracking-wider text-taupe/50 mb-1">
                      {signal.platform}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-playfair text-4xl text-gold">{signal.rating}</span>
                      <span className="font-inter text-sm text-taupe/60">/ 5.0</span>
                    </div>
                    <p className="font-inter text-sm text-taupe/50 mt-1">
                      Based on {signal.reviews} verified reviews
                    </p>
                  </div>
                </div>
              </HomepageAnimations>
            ))}
          </div>

          {/* Testimonial Quote */}
          <HomepageAnimations section="testimonial">
            <div
              className="rounded-2xl p-10 text-center relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 100%)',
                border: '1px solid rgba(212,175,55,0.15)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <div className="absolute top-6 left-10 text-gold/10 font-playfair text-8xl leading-none select-none">
                &ldquo;
              </div>
              <blockquote className="relative z-10 font-playfair text-xl md:text-2xl text-white/90 italic leading-relaxed max-w-3xl mx-auto mb-6">
                The most extraordinary day of our entire Canadian journey. Our guide&apos;s knowledge was encyclopaedic, the vehicle immaculate, and the experience so perfectly tailored it felt as though MaxTours had read our minds.
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-gold/40" />
                <p className="font-inter text-sm text-gold/70">
                  Victoria & James H. — London, UK
                </p>
                <div className="h-px w-8 bg-gold/40" />
              </div>
            </div>
          </HomepageAnimations>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 px-6 border-t border-white/8"
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
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy`} className="font-inter text-xs text-taupe/40 hover:text-taupe/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href={`/${locale}/terms`} className="font-inter text-xs text-taupe/40 hover:text-taupe/70 transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="font-inter text-xs text-taupe/30">
            &copy; {new Date().getFullYear()} MaxTours. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
