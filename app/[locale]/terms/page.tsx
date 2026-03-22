import type { Metadata } from 'next';
import Link from 'next/link';
import { locales } from '@/i18n/request';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Terms of Service | MaxTours',
    description: 'Terms and conditions for booking private luxury tours with MaxTours from Toronto to Niagara Falls, wine country, and beyond.',
    alternates: {
      canonical: `https://maxtours.ca/${locale}/terms`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://maxtours.ca/${l}/terms`])),
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const SECTIONS = [
  {
    title: '1. Agreement to Terms',
    content: [
      'By accessing our website or making a booking with MaxTours ("Company," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
      'These terms apply to all visitors, users, and guests who access or use our services.',
    ],
  },
  {
    title: '2. Services',
    content: [
      'MaxTours provides private luxury guided tours from Toronto, Ontario, Canada to various destinations including Niagara Falls, Niagara-on-the-Lake wine country, and Toronto city highlights.',
      'All tours are private — your group exclusively. No shared coaches, no strangers.',
      'Our services include professional chauffeured transportation, licensed guide services, activity reservations (where included), and personalised itinerary curation.',
    ],
  },
  {
    title: '3. Bookings and Confirmation',
    content: [
      'A booking is confirmed only upon receipt of a written confirmation from MaxTours and payment of the required deposit.',
      'The Experience Builder on our website is a planning tool. A quote generated through the builder is an estimate only and is not a confirmed booking.',
      'Final pricing is confirmed via written quote after reviewing your itinerary, group size, and selected date.',
      'MaxTours reserves the right to decline bookings at our discretion.',
    ],
  },
  {
    title: '4. Pricing and Payment',
    content: [
      'All prices are quoted in Canadian Dollars (CAD) unless otherwise specified.',
      'A non-refundable deposit of 25% is required to secure your booking.',
      'The remaining balance is due 7 days prior to your tour date.',
      'Prices are inclusive of professional guide and chauffeur services, private vehicle, and any specifically listed inclusions.',
      'Prices do not include gratuities, meals beyond those listed, wine purchases, optional add-ons, or personal expenses.',
      'MaxTours reserves the right to adjust pricing for fuel surcharges, government taxes, or significant cost increases. You will be notified of any changes prior to your booking confirmation.',
    ],
  },
  {
    title: '5. Cancellation Policy',
    content: [
      'Cancellations must be submitted in writing to MaxTours.',
      '• Cancellation 14+ days before tour: Full refund minus the 25% deposit',
      '• Cancellation 7–13 days before tour: 50% refund of total booking value',
      '• Cancellation less than 7 days before tour: No refund',
      '• No-show on tour day: No refund',
      'MaxTours strongly recommends travel insurance that includes tour cancellation coverage.',
      'In the event MaxTours must cancel your tour due to circumstances within our control, a full refund will be issued. For cancellations due to severe weather or force majeure events, we offer full rebooking credit valid for 12 months.',
    ],
  },
  {
    title: '6. Changes to Bookings',
    content: [
      'Guest-requested changes to confirmed bookings are subject to availability and may incur additional fees.',
      'Itinerary changes requested within 48 hours of the tour date may not be possible and are subject to third-party provider availability.',
      'Group size reductions after booking confirmation may affect pricing and vehicle type at MaxTours\' discretion.',
    ],
  },
  {
    title: '7. Guest Responsibilities',
    content: [
      'Guests are responsible for:',
      '• Being ready at the confirmed pickup location at the agreed time. Delays of more than 30 minutes without notice may result in tour forfeiture without refund.',
      '• Ensuring all members of the group have valid identification and any required travel documents.',
      '• Informing MaxTours of any mobility limitations, medical conditions, or dietary requirements that may affect the tour experience.',
      '• Behaving respectfully toward our guides, chauffeurs, and third-party operators. MaxTours reserves the right to terminate a tour without refund if guest behaviour is deemed unsafe, abusive, or disruptive.',
      '• The cost of any damage caused by guests to MaxTours vehicles or equipment.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    content: [
      'MaxTours acts as an arranger of tour services. We are not liable for the acts, errors, omissions, or negligence of third-party operators (including Hornblower Cruises, Skylon Tower, wineries, or other activity providers).',
      'MaxTours\' liability to any guest shall not exceed the total amount paid for the tour in question.',
      'MaxTours is not responsible for losses, delays, or disruptions caused by weather, government actions, strikes, force majeure events, or circumstances beyond our reasonable control.',
      'Guests participate in all activities at their own risk. Some activities (e.g., helicopter rides, EdgeWalk) involve inherent risk and require completion of third-party waivers.',
    ],
  },
  {
    title: '9. Seasonal Availability',
    content: [
      'Certain activities and experiences are subject to seasonal availability:',
      '• Hornblower / Niagara City Cruises: Seasonal (typically May–October)',
      '• Falls Illumination: Nightly (seasonal schedule)',
      '• Icewine Harvest Experiences: December–February',
      '• Fireworks over the Falls: Friday and Sunday evenings (May–September)',
      'MaxTours will advise on availability at time of booking and offer suitable alternatives where applicable.',
    ],
  },
  {
    title: '10. Photography and Media',
    content: [
      'MaxTours may photograph or film tours for marketing purposes. By booking, you consent to use of group photographs in our marketing materials.',
      'If you do not wish to be photographed, please advise us in writing before your tour date and we will respect your preference.',
      'You retain full rights to any photographs you take personally during the tour.',
    ],
  },
  {
    title: '11. Governing Law',
    content: [
      'These Terms of Service are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.',
      'Any disputes arising from these terms or your use of MaxTours services shall be subject to the exclusive jurisdiction of the courts of Ontario.',
      'If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.',
    ],
  },
  {
    title: '12. Contact',
    content: [
      'For questions about these Terms of Service, please contact us:',
      '• Email: legal@maxtours.ca',
      '• WhatsApp: Available via our website',
      '• Address: MaxTours, Downtown Toronto, Ontario, Canada M5V',
    ],
  },
];

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 font-inter text-xs text-taupe/40">
          <Link href={`/${locale}`} className="hover:text-gold/60 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-taupe/60">Terms of Service</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/70 mb-3">Legal</p>
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">Terms of Service</h1>
          <div className="w-16 h-px mb-5" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
          <p className="font-inter text-sm text-taupe/50">
            Effective Date: January 1, 2025 &nbsp;·&nbsp; Last Updated: March 2025
          </p>
          <p className="font-inter text-sm text-taupe/60 mt-3 leading-relaxed">
            Please read these Terms of Service carefully before booking a private tour with MaxTours.
            By making a booking, you confirm that you have read, understood, and agree to be bound
            by these terms on behalf of yourself and all members of your group.
          </p>
        </div>

        {/* Quick Nav */}
        <div
          className="rounded-xl p-5 mb-10"
          style={{
            background: 'rgba(212,175,55,0.05)',
            border: '1px solid rgba(212,175,55,0.12)',
          }}
        >
          <p className="font-inter text-xs uppercase tracking-widest text-gold/60 mb-3">Contents</p>
          <div className="grid grid-cols-2 gap-1">
            {SECTIONS.map((s) => (
              <p key={s.title} className="font-inter text-xs text-taupe/50 leading-snug">{s.title}</p>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
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
        <div className="mt-12 pt-8 border-t border-white/8 flex items-center justify-between gap-4 flex-wrap">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-inter text-sm text-gold/60 hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Return to MaxTours
          </Link>
          <Link
            href={`/${locale}/privacy`}
            className="font-inter text-xs text-taupe/40 hover:text-taupe/70 transition-colors"
          >
            Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
