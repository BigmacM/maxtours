import type { Metadata } from 'next';
import Link from 'next/link';
import { locales } from '@/i18n/request';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Privacy Policy | MaxTours',
    description: 'How MaxTours collects, uses, and protects your personal information when you book private luxury tours from Toronto.',
    alternates: {
      canonical: `https://maxtours.ca/${locale}/privacy`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://maxtours.ca/${l}/privacy`])),
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: [
      'When you use our Experience Builder or submit a booking inquiry, we collect the following personal information:',
      '• Your name and contact details (email address, phone or WhatsApp number)',
      '• Tour preferences, itinerary selections, and group size',
      '• Preferred travel date and pickup location',
      '• Payment information (processed securely through our payment partners — we do not store card details)',
      '• Communications between you and our team via WhatsApp, email, or our website',
      'We also collect non-personal usage data (pages visited, device type, browser) through standard analytics tools to improve your experience.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'We use the information collected exclusively to:',
      '• Prepare and confirm your bespoke tour booking',
      '• Send your customised itinerary and quote via WhatsApp or email',
      '• Coordinate hotel pickup logistics and tour day communication',
      '• Process payments and provide receipts',
      '• Respond to your inquiries and provide customer support',
      '• Improve our services based on aggregated, anonymised usage patterns',
      'We do not use your information for unsolicited marketing without your explicit consent.',
    ],
  },
  {
    title: '3. Information Sharing',
    content: [
      'MaxTours does not sell, rent, or trade your personal information to third parties. We may share limited information with:',
      '• Trusted activity providers (e.g., Hornblower Cruises, Skylon Tower) solely to process your included reservations',
      '• Payment processors operating under industry-standard security protocols',
      '• Google Analytics and Google Tag Manager for anonymised website analytics',
      '• WhatsApp (Meta Platforms) for direct guest communication, subject to WhatsApp\'s Privacy Policy',
      'All third-party partners are contractually bound to protect your information and use it only for the stated purpose.',
    ],
  },
  {
    title: '4. Cookies and Tracking',
    content: [
      'Our website uses the following types of cookies:',
      '• Essential cookies: Required for the website to function correctly',
      '• Analytics cookies (Google Analytics): Anonymised data to understand how guests use our site',
      '• Marketing cookies (Google Tag Manager): To measure the effectiveness of our advertising',
      'You may disable non-essential cookies through your browser settings. This will not affect your ability to use our website.',
    ],
  },
  {
    title: '5. Data Retention',
    content: [
      'We retain your personal information for as long as necessary to fulfil your booking and comply with our legal obligations:',
      '• Booking and payment records: 7 years (Canadian tax and commercial law requirements)',
      '• Marketing consent records: Until you withdraw consent',
      '• Customer communications: 2 years from last contact',
      'You may request deletion of your data at any time, subject to legal retention requirements.',
    ],
  },
  {
    title: '6. Your Rights',
    content: [
      'Under applicable privacy legislation (including Canada\'s PIPEDA and provincial equivalents), you have the right to:',
      '• Access the personal information we hold about you',
      '• Request correction of inaccurate information',
      '• Request deletion of your personal information (subject to legal requirements)',
      '• Withdraw consent to marketing communications at any time',
      '• File a complaint with the Office of the Privacy Commissioner of Canada',
      'To exercise any of these rights, contact us at: privacy@maxtours.ca',
    ],
  },
  {
    title: '7. Security',
    content: [
      'We take reasonable and appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or disclosure, including:',
      '• SSL/TLS encryption for all data transmitted through our website',
      '• Secure, access-controlled systems for storing customer records',
      '• Regular security reviews of our data handling practices',
      'No method of electronic transmission is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.',
    ],
  },
  {
    title: '8. Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by posting the updated policy on this page with a revised effective date.',
      'Continued use of our services after changes are posted constitutes your acceptance of the updated policy.',
    ],
  },
  {
    title: '9. Contact Us',
    content: [
      'If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:',
      '• Email: privacy@maxtours.ca',
      '• WhatsApp: Available via our website',
      '• Mailing Address: MaxTours, Downtown Toronto, Ontario, Canada',
      'We will respond to all privacy-related inquiries within 10 business days.',
    ],
  },
];

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 font-inter text-xs text-taupe/40">
          <Link href={`/${locale}`} className="hover:text-gold/60 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-taupe/60">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-3">Legal</p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
          <div className="w-16 h-px mb-5" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
          <p className="font-inter text-sm text-taupe/50">
            Effective Date: January 1, 2025 &nbsp;·&nbsp; Last Updated: March 2025
          </p>
          <p className="font-inter text-sm text-taupe/60 mt-3 leading-relaxed">
            MaxTours (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting the privacy of our guests. This
            Privacy Policy explains how we collect, use, and safeguard your personal information when
            you visit our website or book a private tour with us.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h2 className="font-playfair text-lg text-white mb-4">{section.title}</h2>
              <div className="space-y-2">
                {section.content.map((para, j) => (
                  <p key={j} className="font-inter text-sm text-taupe/65 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-white/8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-inter text-sm text-gold/60 hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Return to MaxTours
          </Link>
        </div>
      </div>
    </div>
  );
}
