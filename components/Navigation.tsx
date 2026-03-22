'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const LOCALES = [
  { code: 'en-us', label: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'en-gb', label: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'en-au', label: 'AU', flag: '🇦🇺', name: 'Australia' },
];

const NAV_LINKS = [
  { href: '/tours', label: 'Tours' },
  { href: '/#builder', label: 'Experience Builder' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface NavigationProps {
  locale: string;
}

export default function Navigation({ locale }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [localeDropdownOpen, setLocaleDropdownOpen] = useState(false);
  const pathname = usePathname();

  const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLocalizedHref = (href: string, targetLocale: string) => {
    // Replace the locale segment in the current path
    const withoutLocale = pathname.replace(`/${locale}`, '') || '/';
    return `/${targetLocale}${withoutLocale}`;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'backdrop-blur-2xl border-b border-white/8 py-3'
            : 'py-5',
        )}
        style={
          scrolled
            ? {
                background: 'linear-gradient(135deg, rgba(13,27,42,0.92) 0%, rgba(10,21,32,0.88) 100%)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="group flex items-center gap-2.5">
            <div className="relative">
              <span
                className="font-playfair text-2xl font-bold tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                MaxTours
              </span>
              <div className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={clsx(
                  'font-inter text-sm font-medium transition-colors duration-200 relative group',
                  pathname.includes(link.href) && link.href !== '/#builder'
                    ? 'text-gold'
                    : 'text-taupe/80 hover:text-white',
                )}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* Locale Switcher */}
            <div className="relative">
              <button
                onClick={() => setLocaleDropdownOpen((v) => !v)}
                className={clsx(
                  'flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200',
                  'font-inter text-sm text-taupe/80 hover:text-white',
                  localeDropdownOpen
                    ? 'border-gold/40 bg-gold/8'
                    : 'border-white/10 hover:border-white/20',
                )}
              >
                <span>{currentLocale.flag}</span>
                <span>{currentLocale.label}</span>
                <svg
                  className={clsx(
                    'w-3 h-3 transition-transform duration-200',
                    localeDropdownOpen ? 'rotate-180' : '',
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {localeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/10 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(10,21,32,0.98) 0%, rgba(6,14,24,0.98) 100%)',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                    }}
                  >
                    {LOCALES.map((loc) => (
                      <Link
                        key={loc.code}
                        href={getLocalizedHref('/', loc.code)}
                        onClick={() => setLocaleDropdownOpen(false)}
                        className={clsx(
                          'flex items-center gap-3 px-4 py-2.5 font-inter text-sm transition-colors duration-150',
                          loc.code === locale
                            ? 'text-gold bg-gold/8'
                            : 'text-taupe/80 hover:text-white hover:bg-white/5',
                        )}
                      >
                        <span>{loc.flag}</span>
                        <span>{loc.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/contact`}
              className="px-5 py-2 rounded-lg font-inter text-sm font-medium text-midnight transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)',
                boxShadow: '4px 4px 12px rgba(0,0,0,0.3), -2px -2px 8px rgba(255,255,255,0.04)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  'inset 3px 3px 10px rgba(0,0,0,0.3), 0 0 20px rgba(212,175,55,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '4px 4px 12px rgba(0,0,0,0.3), -2px -2px 8px rgba(255,255,255,0.04)';
              }}
            >
              Request a Private Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg border border-white/10 text-taupe/80"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={clsx(
                  'block h-px bg-current transition-all duration-300',
                  mobileOpen ? 'rotate-45 translate-y-[7px]' : '',
                )}
              />
              <span
                className={clsx(
                  'block h-px bg-current transition-all duration-300',
                  mobileOpen ? 'opacity-0' : '',
                )}
              />
              <span
                className={clsx(
                  'block h-px bg-current transition-all duration-300',
                  mobileOpen ? '-rotate-45 -translate-y-[9px]' : '',
                )}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: 'rgba(6,14,24,0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex flex-col h-full pt-24 px-8 pb-12">
              <div className="space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={`/${locale}${link.href}`}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 font-playfair text-2xl text-white/80 hover:text-white border-b border-white/8 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                {LOCALES.map((loc) => (
                  <Link
                    key={loc.code}
                    href={getLocalizedHref('/', loc.code)}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'flex items-center gap-2 px-4 py-2 rounded-lg border font-inter text-sm',
                      loc.code === locale
                        ? 'border-gold/40 text-gold bg-gold/8'
                        : 'border-white/10 text-taupe/60',
                    )}
                  >
                    <span>{loc.flag}</span>
                    <span>{loc.label}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full py-4 rounded-xl font-inter text-center font-medium text-midnight"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)',
                  }}
                >
                  Request a Private Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close locale dropdown */}
      {localeDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setLocaleDropdownOpen(false)}
        />
      )}
    </>
  );
}
