'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import { useAnalytics } from '@/hooks/useAnalytics';

interface HeroSectionProps {
  locale: string;
  headline?: string;
  subline?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export default function HeroSection({
  locale,
  headline = "Toronto's Most Exclusive Private Tours",
  subline = 'Bespoke journeys from the heart of Toronto to the grandeur of Niagara Falls — crafted for discerning travellers who demand the extraordinary.',
  ctaPrimary = 'Compose Your Journey',
  ctaSecondary = 'Explore Our Tours',
}: HeroSectionProps) {
  const analytics = useAnalytics();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    analytics.trackPageView('/', headline);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video/Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-midnight-900" />

        {/* Niagara Falls hero image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1562016600-ece13e8ba570?w=1920&q=85&auto=format&fit=crop"
          alt="Niagara Falls Horseshoe Falls aerial view at golden hour"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
          loading="eager"
          fetchPriority="high"
        />

        {/* Video element — swap src for production (falls back to image above) */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* <source src="/videos/niagara-hero.mp4" type="video/mp4" /> */}
        </video>

        {/* Layered gradient overlays for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 40%, rgba(200, 121, 65, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(13, 27, 42, 0.6) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.5) 50%, rgba(6,14,24,0.95) 100%)',
          }}
        />

        {/* Atmospheric particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold/20"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 3) * 25}%`,
                animation: `float ${4 + (i % 3)}s ease-in-out ${i * 0.5}s infinite`,
                opacity: 0.1 + (i % 4) * 0.08,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <span className="font-inter text-xs uppercase tracking-[0.25em] text-gold/80">
              Toronto's Premier Private Tour Operator
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08] mb-4"
          >
            Toronto&apos;s Most{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #E6D17B 0%, #d4af37 40%, #e8cc6a 70%, #c87941 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Exclusive
            </span>{' '}
            Private Tours
          </motion.h1>

          {/* Gold Shimmer Line */}
          <motion.div
            variants={itemVariants}
            className="relative h-px w-48 mb-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold/80 via-gold-light to-gold/80" />
            <div
              className="absolute inset-0 animate-shimmer"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(232,204,106,0.9) 50%, transparent 100%)',
              }}
            />
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="font-inter text-lg md:text-xl text-taupe/80 leading-relaxed mb-10 max-w-2xl font-light"
          >
            {subline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href={`/${locale}/#builder`}
              onClick={() => analytics.trackCTAClick(ctaPrimary, 'hero')}
              className="relative overflow-hidden px-8 py-4 rounded-xl font-inter font-medium text-midnight-900 text-center transition-all duration-300 group"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)',
                boxShadow: '6px 6px 16px rgba(0,0,0,0.4), -3px -3px 10px rgba(255,255,255,0.04)',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {ctaPrimary}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href={`/${locale}/tours`}
              onClick={() => analytics.trackCTAClick(ctaSecondary, 'hero')}
              className="relative overflow-hidden px-8 py-4 rounded-xl font-inter font-medium text-gold text-center border border-gold/30 transition-all duration-300 group"
              style={{
                background: 'rgba(212,175,55,0.05)',
                boxShadow: '6px 6px 16px rgba(0,0,0,0.3), -3px -3px 10px rgba(255,255,255,0.02)',
              }}
            >
              <span className="relative z-10">{ctaSecondary}</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(212,175,55,0.08)' }}
              />
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 mt-12"
          >
            {[
              { icon: '⭐', label: '4.9 TripAdvisor', sub: '847 reviews' },
              { icon: '🌟', label: '5.0 Google', sub: '523 reviews' },
              { icon: '🏆', label: 'Tourism Certified', sub: 'Province of Ontario' },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/8 backdrop-blur-xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                <span className="text-lg">{badge.icon}</span>
                <div>
                  <p className="font-inter text-xs font-medium text-white/90">{badge.label}</p>
                  <p className="font-inter text-[10px] text-taupe/50">{badge.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-taupe/40">Discover</span>
          <div className="w-5 h-8 rounded-full border border-white/10 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-gold/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
