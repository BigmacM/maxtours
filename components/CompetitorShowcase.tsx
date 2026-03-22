'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Competitor {
  name: string;
  priceRange: string;
  duration: string;
  vehicle: string;
  isUs: boolean;
  highlights: string[];
  rating?: string;
}

const COMPETITORS: Competitor[] = [
  {
    name: 'Zoom Tours',
    priceRange: 'CA$695–$2,995',
    duration: '8–9 hrs',
    vehicle: 'Lincoln Town Car / Mercedes Van',
    isUs: false,
    highlights: ['Group departures', 'Standard itinerary', 'Shared experience'],
  },
  {
    name: 'Niagara Falls Tour',
    priceRange: 'CA$449–$2,999',
    duration: '6–9.5 hrs',
    vehicle: 'Mercedes Sprinter',
    isUs: false,
    highlights: ['Budget options available', 'Seasonal packages', 'Group tours'],
  },
  {
    name: 'See Sight Tours',
    priceRange: 'CA$739',
    duration: '4–6.5 hrs',
    vehicle: 'Mercedes Metris',
    isUs: false,
    highlights: ['Fixed pricing', 'Smaller vehicles', 'Guided commentary'],
  },
  {
    name: 'Queen Tour',
    priceRange: 'CA$1,795',
    duration: '9–10 hrs',
    vehicle: 'Air-conditioned Minibus',
    isUs: false,
    highlights: ['Extended duration', 'Group format', 'All-inclusive price'],
  },
  {
    name: 'TruExperiences',
    priceRange: 'CA$996',
    duration: '4–10 hrs',
    vehicle: 'Luxury SUV',
    isUs: false,
    highlights: ['Flexible duration', 'Modern fleet', 'Custom routes'],
  },
  {
    name: 'MaxTours',
    priceRange: 'From CA$695',
    duration: '4–10+ hrs',
    vehicle: 'Mazda CX-90 + Custom Fleet',
    isUs: true,
    highlights: ['Fully bespoke itinerary', 'Expert sommelier guides', 'No hidden fees'],
    rating: '4.9 ★',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function CompetitorShowcase() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-4">
            Market Comparison
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            How We Compare
          </h2>
          <p className="font-inter text-taupe/60 max-w-xl mx-auto font-light">
            See why discerning travellers consistently choose MaxTours over the alternatives.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <div className="h-1 w-1 rounded-full bg-gold/60 mx-2" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {COMPETITORS.map((competitor) => (
            <motion.div
              key={competitor.name}
              variants={cardVariants}
              className={clsx(
                'relative rounded-2xl p-6 transition-all duration-500 group',
                competitor.isUs
                  ? 'sm:col-span-2 lg:col-span-1'
                  : '',
              )}
              style={
                competitor.isUs
                  ? {
                      background:
                        'linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0.05) 100%)',
                      border: '1px solid rgba(212,175,55,0.35)',
                      boxShadow:
                        '0 8px 32px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.12), inset 0 1px 0 rgba(212,175,55,0.2)',
                    }
                  : {
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow:
                        '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
                    }
              }
            >
              {/* Hover glow */}
              {!competitor.isUs && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.15)',
                  }}
                />
              )}

              {/* Our Advantage Badge */}
              {competitor.isUs && (
                <div className="absolute -top-3 left-6">
                  <div
                    className="px-3 py-1 rounded-full font-inter text-xs font-medium text-midnight-900"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 100%)',
                    }}
                  >
                    Our Advantage
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3
                    className={clsx(
                      'font-playfair text-lg mb-0.5',
                      competitor.isUs ? 'text-gold' : 'text-white/90',
                    )}
                  >
                    {competitor.name}
                  </h3>
                  {competitor.rating && (
                    <span className="font-inter text-xs text-gold/80">{competitor.rating}</span>
                  )}
                </div>
                {competitor.isUs && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(212,175,55,0.2)' }}
                  >
                    <span className="text-sm">✓</span>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: competitor.isUs
                      ? 'rgba(212,175,55,0.08)'
                      : 'rgba(255,255,255,0.04)',
                    border: competitor.isUs
                      ? '1px solid rgba(212,175,55,0.15)'
                      : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <p className="font-inter text-[10px] uppercase tracking-wider text-taupe/40 mb-1">
                    Price
                  </p>
                  <p
                    className={clsx(
                      'font-inter text-sm font-medium leading-tight',
                      competitor.isUs ? 'text-gold' : 'text-white/80',
                    )}
                  >
                    {competitor.priceRange}
                  </p>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: competitor.isUs
                      ? 'rgba(212,175,55,0.08)'
                      : 'rgba(255,255,255,0.04)',
                    border: competitor.isUs
                      ? '1px solid rgba(212,175,55,0.15)'
                      : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <p className="font-inter text-[10px] uppercase tracking-wider text-taupe/40 mb-1">
                    Duration
                  </p>
                  <p
                    className={clsx(
                      'font-inter text-sm font-medium',
                      competitor.isUs ? 'text-gold' : 'text-white/80',
                    )}
                  >
                    {competitor.duration}
                  </p>
                </div>
              </div>

              {/* Vehicle */}
              <div
                className="rounded-xl p-3 mb-5"
                style={{
                  background: competitor.isUs
                    ? 'rgba(212,175,55,0.06)'
                    : 'rgba(255,255,255,0.03)',
                  border: competitor.isUs
                    ? '1px solid rgba(212,175,55,0.12)'
                    : '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <p className="font-inter text-[10px] uppercase tracking-wider text-taupe/40 mb-1">
                  Vehicle
                </p>
                <p className="font-inter text-xs text-taupe/80">{competitor.vehicle}</p>
              </div>

              {/* Highlights */}
              <ul className="space-y-1.5">
                {competitor.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span
                      className={clsx(
                        'mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center',
                        competitor.isUs
                          ? 'bg-gold/20 text-gold'
                          : 'bg-white/8 text-taupe/40',
                      )}
                    >
                      <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span
                      className={clsx(
                        'font-inter text-xs',
                        competitor.isUs ? 'text-taupe/80' : 'text-taupe/50',
                      )}
                    >
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="font-inter text-sm text-taupe/50 mb-1">
            Prices accurate as of 2025. Competitor information sourced from public listings.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
