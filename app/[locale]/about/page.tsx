import type { Metadata } from 'next';
import Link from 'next/link';
import { LocalBusinessSchema } from '@/components/SEO/JSONLD';
import { locales } from '@/i18n/request';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'About MaxTours — The Gold Standard of Ontario Exploration',
    description:
      'Meet the team behind Toronto\'s most exclusive private tours. Our 2-staff model — Professional Chauffeur + Licensed Storyteller — ensures safety and storytelling, never compromised.',
    alternates: {
      canonical: `https://maxtours.ca/${locale}/about`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://maxtours.ca/${l}/about`])),
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  const DIFFERENTIATORS = [
    {
      icon: '🚗',
      title: 'Professional Chauffeur',
      description:
        'A dedicated, licensed driver focused entirely on your safety, comfort, and seamless navigation. The road is their sole responsibility — your time is never wasted on logistics.',
    },
    {
      icon: '🎙️',
      title: 'Licensed Storyteller',
      description:
        'A certified guide whose singular focus is your narrative experience — history, geology, culture, and the insider access that turns a tour into an education and a memory.',
    },
    {
      icon: '🍁',
      title: 'Canadian Crafted',
      description:
        'Born in Toronto, refined over hundreds of private journeys. Every route, every stop, every recommendation is the product of deep local expertise and genuine passion.',
    },
  ];

  const TRUST_SIGNALS = [
    { label: 'Member of Tourism Toronto', icon: '🏛️' },
    { label: '2025 Viator Excellence Standards', icon: '✦' },
    { label: '5.0 Google Rating · 523 reviews', icon: '⭐' },
    { label: '4.9 TripAdvisor · 847 reviews', icon: '🌟' },
  ];

  return (
    <>
      <LocalBusinessSchema locale={locale} />

      <div className="min-h-screen maple-leaf-bg-subtle">
        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight to-midnight-800 opacity-95" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mb-8 font-inter text-xs text-taupe/40">
              <Link href={`/${locale}`} className="hover:text-gold/60 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-taupe/60">About</span>
            </div>

            <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-4">
              Our Story
            </p>
            <h1 className="font-playfair text-5xl md:text-6xl text-white mb-6 leading-tight">
              The{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #E6D17B 0%, #d4af37 40%, #e8cc6a 70%, #c87941 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Gold Standard
              </span>{' '}
              of Ontario Exploration
            </h1>

            <div className="w-24 h-px mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />

            <p className="font-inter text-lg text-taupe/70 leading-relaxed max-w-2xl mx-auto font-light">
              We believe luxury is found in the details — the unspoken needs, the perfectly timed arrival,
              and the stories that aren&apos;t in the guidebooks.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.07) 0%, rgba(212,175,55,0.02) 100%)',
                border: '1px solid rgba(212,175,55,0.15)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)',
                }}
              />
              <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/60 mb-6">Our Mission</p>
              <blockquote className="font-playfair text-2xl md:text-3xl text-white/90 italic leading-relaxed">
                &ldquo;We exist to transform the act of travel into an art form — where every mile is curated,
                every moment is intentional, and every guest feels like the only guest in the world.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 mt-8">
                <div className="h-px w-8 bg-gold/40" />
                <p className="font-inter text-sm text-gold/60">The MaxTours Promise</p>
              </div>
            </div>
          </div>
        </section>

        {/* The 2-Staff Policy */}
        <section className="py-20 px-6 bg-midnight-800/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-4">
                What Makes Us Different
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
                The Two-Staff Policy
              </h2>
              <p className="font-inter text-taupe/60 max-w-2xl mx-auto font-light">
                Unlike standard tours where one person divides their attention between the road and the narrative,
                MaxTours provides a{' '}
                <span className="text-gold/80">Professional Chauffeur</span> and a{' '}
                <span className="text-gold/80">Licensed Storyteller</span> in every vehicle.
                Safety and storytelling — never compromised.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {DIFFERENTIATORS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-xl"
                    style={{
                      background: 'rgba(212,175,55,0.12)',
                      border: '1px solid rgba(212,175,55,0.25)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-playfair text-xl text-white mb-3">{item.title}</h3>
                  <p className="font-inter text-sm text-taupe/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Vehicle: Mazda CX-90 */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-4">Our Fleet</p>
              <h2 className="font-playfair text-4xl text-white mb-4">A Sanctuary on Wheels</h2>
            </div>
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-playfair text-2xl text-white mb-4">
                    Mazda CX-90 — Our Flagship
                  </h3>
                  <p className="font-inter text-taupe/70 leading-relaxed font-light mb-5">
                    Step into a sanctuary of Artisan Red leather and Japanese-inspired stitching.
                    Our Mazda CX-90 isn&apos;t just transport; it&apos;s a climate-controlled mobile lounge
                    crafted for the discerning traveller.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Artisan Red premium leather interior',
                      'Curated Journey Playlist — tailored to your mood',
                      'Chilled Voss Water on arrival',
                      'Climate-controlled sanctuary',
                      'USB-C charging at every seat',
                    ].map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 font-inter text-sm text-taupe/70">
                        <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="rounded-xl h-48 md:h-full min-h-[200px] flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(13,27,42,0.8) 100%)',
                    border: '1px solid rgba(212,175,55,0.12)',
                  }}
                >
                  <div className="text-center">
                    <span className="text-6xl block mb-3 opacity-60">🚗</span>
                    <p className="font-playfair text-gold/60 text-sm">Mazda CX-90</p>
                    <p className="font-inter text-taupe/30 text-xs">Luxury SUV Fleet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 px-6 bg-midnight-800/40">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-3">
                Certified & Recognised
              </p>
              <h2 className="font-playfair text-3xl text-white">Our Credentials</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {TRUST_SIGNALS.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                >
                  <span className="text-2xl block mb-2">{signal.icon}</span>
                  <p className="font-inter text-[11px] text-taupe/60 leading-snug">{signal.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-playfair text-4xl text-white mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="font-inter text-taupe/60 mb-8 font-light">
              Compose your perfect day using our Experience Builder — then receive a bespoke private quote via WhatsApp.
            </p>
            <Link
              href={`/${locale}/#builder`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-inter font-medium text-midnight-900 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)',
                boxShadow: '6px 6px 16px rgba(0,0,0,0.4)',
              }}
            >
              Compose Your Journey
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
