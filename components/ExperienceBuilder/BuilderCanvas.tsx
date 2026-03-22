'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  AVAILABLE_ACTIVITIES,
  GROUP_SIZES,
  PRESET_NIAGARA,
  PRESET_TORONTO,
  PRESET_EVENING,
  calculatePrice,
  calculateTotalDuration,
  formatDuration,
  type Activity,
  type GroupSize,
} from './PricingCalculator';
import { ActivityPaletteCard, ActivityDraggableCard } from './ActivityCard';
import { useAnalytics } from '@/hooks/useAnalytics';

const CATEGORIES = ['All', 'Transport', 'Morning', 'Niagara', 'Scenic', 'Wine', 'Toronto', 'Adventure', 'Historic', 'Cultural', 'Evening'];

// Google Apps Script endpoint — replace with your deployed web app URL
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || '';

const PRESETS = [
  {
    id: 'niagara-signature',
    label: 'Niagara Signature',
    description: '8 AM pickup → Falls → Vineyard lunch → Illumination',
    icon: '✦',
    activities: PRESET_NIAGARA,
  },
  {
    id: 'toronto-essential',
    label: 'Toronto Essential',
    description: 'City highlights in 4 hours',
    icon: '◈',
    activities: PRESET_TORONTO,
  },
  {
    id: 'evening-illumination',
    label: 'Evening Illumination',
    description: 'NOTL wine → Dinner → Control the Falls',
    icon: '♡',
    activities: PRESET_EVENING,
  },
];

interface QuoteFormData {
  name: string;
  whatsapp: string;
  date: string;
  pax: string;
}

export default function BuilderCanvas() {
  const [itinerary, setItinerary] = useState<Activity[]>([]);
  const [selectedGroupSize, setSelectedGroupSize] = useState<GroupSize>(GROUP_SIZES[0]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({ name: '', whatsapp: '', date: '', pax: '2' });

  // Track customizations since last preset load
  const presetChangeCount = useRef(0);
  const analytics = useAnalytics();

  const selectedIds = new Set(itinerary.map((a) => a.id));

  // Filter out already-added activities and apply category filter
  const filteredActivities = AVAILABLE_ACTIVITIES.filter(
    (a) => !selectedIds.has(a.id) && (activeCategory === 'All' || a.category === activeCategory),
  );

  const totalDuration = calculateTotalDuration(itinerary);
  const totalPrice = calculatePrice(itinerary, selectedGroupSize);

  const handlePresetSelect = useCallback(
    (presetId: string, presetActivities: Activity[], presetLabel: string) => {
      setItinerary(presetActivities);
      setActivePreset(presetId);
      presetChangeCount.current = 0;
      analytics.trackPresetSelected(presetLabel, presetActivities.length);
    },
    [analytics],
  );

  const handleAddActivity = useCallback(
    (activity: Activity) => {
      setItinerary((prev) => [...prev, activity]);
      setActivePreset(null);
      presetChangeCount.current += 1;
      analytics.trackItemAdded(activity.id, activity.title);
      if (presetChangeCount.current > 2) {
        analytics.trackItineraryCustomized(presetChangeCount.current);
      }
    },
    [analytics],
  );

  const handleRemoveActivity = useCallback(
    (activityId: string) => {
      setItinerary((prev) => prev.filter((a) => a.id !== activityId));
      setActivePreset(null);
      presetChangeCount.current += 1;
      analytics.trackItemRemoved(activityId);
      if (presetChangeCount.current > 2) {
        analytics.trackItineraryCustomized(presetChangeCount.current);
      }
    },
    [analytics],
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setActiveCategory(category);
      analytics.trackCategoryViewed(category);
    },
    [analytics],
  );

  const handleSubmitQuote = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (itinerary.length === 0) return;
      setIsSubmitting(true);

      analytics.trackTimelineCompleted(itinerary.length, totalDuration);
      analytics.trackQuoteInitiated(totalPrice, selectedGroupSize.label, itinerary.map((a) => a.id));

      const itinerarySummary = itinerary.map((a) => a.title).join(' → ');
      const tourDetails = {
        customerName: formData.name,
        whatsappNumber: formData.whatsapp,
        itinerary: itinerarySummary,
        groupSize: selectedGroupSize.label,
        estimatedPrice: `CA$${totalPrice.toLocaleString()}`,
        date: formData.date,
        pax: formData.pax,
      };

      // POST to Google Apps Script (non-blocking — redirect regardless of result)
      if (APPS_SCRIPT_URL) {
        fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tourDetails),
        }).catch(() => {}); // Fire-and-forget
      }

      // Build WhatsApp deep link
      const waMessage = encodeURIComponent(
        `Hi MaxTours! My name is ${formData.name}. I just built a custom tour: ${itinerarySummary}. Can you provide a final quote for ${formData.pax} people on ${formData.date || 'a date TBD'}? Estimated: CA$${totalPrice.toLocaleString()}.`,
      );
      const waNumber = '14165550100'; // Replace with real WhatsApp business number
      const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

      analytics.trackWhatsAppRedirectSuccess(formData.name, itinerary.length);

      setIsSubmitting(false);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setShowQuoteForm(false);
    },
    [itinerary, totalPrice, totalDuration, selectedGroupSize, formData, analytics],
  );

  return (
    <div className="w-full relative">
      {/* Floating trust badge */}
      <div className="flex justify-end mb-4">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 backdrop-blur-xl"
          style={{ background: 'rgba(212,175,55,0.07)' }}
        >
          <span className="text-sm leading-none">⭐</span>
          <span className="font-inter text-xs font-semibold text-gold">5.0 on TripAdvisor</span>
          <span className="font-inter text-[10px] text-taupe/50">· 847 verified reviews</span>
        </div>
      </div>

      {/* Preset Cards */}
      <div className="mb-6">
        <p className="font-inter text-xs text-taupe/60 uppercase tracking-widest mb-3">
          Start with a Curated Preset
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id, preset.activities, preset.label)}
              className={clsx(
                'relative rounded-xl px-4 py-3.5 text-left transition-all duration-300 group',
                'backdrop-blur-xl border',
                activePreset === preset.id
                  ? 'border-gold/60 bg-gold/10'
                  : 'border-white/10 bg-white/5 hover:border-gold/30 hover:bg-white/8',
              )}
              style={{
                boxShadow:
                  activePreset === preset.id
                    ? '0 0 24px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : '4px 4px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
              }}
            >
              {activePreset === preset.id && (
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              )}
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={clsx(
                    'text-sm font-playfair transition-colors duration-300',
                    activePreset === preset.id ? 'text-gold' : 'text-white/50 group-hover:text-gold/70',
                  )}
                >
                  {preset.icon}
                </span>
                <p
                  className={clsx(
                    'font-playfair text-sm font-medium transition-colors duration-300',
                    activePreset === preset.id ? 'text-gold' : 'text-white/80 group-hover:text-white',
                  )}
                >
                  {preset.label}
                </p>
              </div>
              <p className="font-inter text-[11px] text-taupe/50">{preset.description}</p>
              <p className="font-inter text-[11px] text-gold/50 mt-1">
                {preset.activities.length} experiences included
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Group Size Selector */}
      <div className="mb-6">
        <p className="font-inter text-xs text-taupe/60 uppercase tracking-widest mb-3">
          Select Your Group Size
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {GROUP_SIZES.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedGroupSize(size)}
              className={clsx(
                'relative rounded-xl px-4 py-3 text-left transition-all duration-300',
                'backdrop-blur-xl border',
                selectedGroupSize.label === size.label
                  ? 'border-gold/60 bg-gold/10'
                  : 'border-white/10 bg-white/5 hover:border-gold/30 hover:bg-white/8',
              )}
              style={{
                boxShadow:
                  selectedGroupSize.label === size.label
                    ? '0 0 20px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : '4px 4px 10px rgba(0,0,0,0.3), -2px -2px 6px rgba(255,255,255,0.02)',
              }}
            >
              {selectedGroupSize.label === size.label && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
              )}
              <p
                className={clsx(
                  'font-inter text-sm font-medium mb-0.5',
                  selectedGroupSize.label === size.label ? 'text-gold' : 'text-white/80',
                )}
              >
                {size.label}
              </p>
              <p className="font-inter text-xs text-taupe/60">{size.vehicleType}</p>
              <p className="font-inter text-xs text-gold/70 mt-1">from CA${size.basePrice}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Builder Main Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Panel: Activity Palette */}
        <div
          className="rounded-2xl p-5 backdrop-blur-xl border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-playfair text-base text-white">Available Experiences</h3>
            <span className="font-inter text-xs text-taupe/50">{filteredActivities.length} experiences</span>
          </div>

          {/* Category Filter */}
          <div className="flex gap-1.5 flex-wrap mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={clsx(
                  'px-2.5 py-1 rounded-lg text-xs font-inter transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-gold/20 text-gold border border-gold/40'
                    : 'bg-white/5 text-taupe/60 border border-white/10 hover:border-white/20 hover:text-taupe',
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Activity Grid */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ActivityPaletteCard
                    activity={activity}
                    isSelected={selectedIds.has(activity.id)}
                    onAdd={handleAddActivity}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel: Itinerary Timeline */}
        <div
          className="rounded-2xl p-5 backdrop-blur-xl border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-playfair text-base text-white">Your Itinerary</h3>
            {itinerary.length > 0 && (
              <span className="font-inter text-xs text-taupe/50">
                {itinerary.length} stop{itinerary.length !== 1 ? 's' : ''} · {formatDuration(totalDuration)}
              </span>
            )}
          </div>

          {itinerary.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <p className="font-playfair text-white/60 mb-1">Begin Composing</p>
              <p className="font-inter text-xs text-taupe/40">
                Choose a preset above or select experiences from the left panel
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {itinerary.map((activity, index) => (
                  <ActivityDraggableCard
                    key={activity.id}
                    activity={activity}
                    onRemove={handleRemoveActivity}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {itinerary.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs font-inter text-taupe/60">
                <span>{itinerary.length} experience{itinerary.length !== 1 ? 's' : ''}</span>
                <span>{formatDuration(totalDuration)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Footer */}
      <AnimatePresence>
        {itinerary.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 rounded-2xl p-5 backdrop-blur-xl border border-gold/20"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.1), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-inter text-xs text-taupe/60 uppercase tracking-widest mb-1">
                  Estimated Investment
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-playfair text-3xl text-gold">
                    CA${totalPrice.toLocaleString()}
                  </span>
                  <span className="font-inter text-sm text-taupe/60">
                    for {selectedGroupSize.label.toLowerCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-inter text-xs text-taupe/50">
                    {selectedGroupSize.vehicleType}
                  </span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="font-inter text-xs text-taupe/50">
                    {formatDuration(totalDuration)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => { setItinerary([]); setActivePreset(null); presetChangeCount.current = 0; }}
                  className="px-4 py-2.5 rounded-lg text-sm font-inter text-taupe/60 border border-white/10 hover:border-white/20 hover:text-taupe transition-all duration-200"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="relative px-6 py-2.5 rounded-lg text-sm font-inter font-medium transition-all duration-300 overflow-hidden text-midnight-900 border border-gold/50"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)',
                    boxShadow: '4px 4px 12px rgba(0,0,0,0.3), -2px -2px 8px rgba(255,255,255,0.04)',
                  }}
                >
                  Request a Private Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Form Modal */}
      <AnimatePresence>
        {showQuoteForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(6,14,24,0.85)', backdropFilter: 'blur(8px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowQuoteForm(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md rounded-2xl p-6 backdrop-blur-xl border border-gold/20"
              style={{
                background: 'linear-gradient(135deg, rgba(13,27,42,0.97) 0%, rgba(6,14,24,0.99) 100%)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.15)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-playfair text-xl text-white mb-1">Request Your Private Quote</h3>
                  <p className="font-inter text-xs text-taupe/50">
                    We&apos;ll confirm via WhatsApp within 1 hour
                  </p>
                </div>
                <button
                  onClick={() => setShowQuoteForm(false)}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-taupe/40 hover:text-taupe hover:border-white/20 transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Itinerary Summary */}
              <div
                className="rounded-xl p-3 mb-5 border border-gold/15"
                style={{ background: 'rgba(212,175,55,0.05)' }}
              >
                <p className="font-inter text-[10px] uppercase tracking-widest text-gold/50 mb-1">
                  Your Itinerary
                </p>
                <p className="font-inter text-xs text-taupe/70 leading-relaxed">
                  {itinerary.map((a) => a.title).join(' → ')}
                </p>
                <p className="font-inter text-sm text-gold font-medium mt-2">
                  CA${totalPrice.toLocaleString()} · {formatDuration(totalDuration)}
                </p>
              </div>

              <form onSubmit={handleSubmitQuote} className="space-y-3">
                <div>
                  <label className="font-inter text-xs text-taupe/60 block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victoria & James"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-lg px-4 py-2.5 font-inter text-sm text-white placeholder-taupe/30 border border-white/10 focus:border-gold/40 focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  />
                </div>

                <div>
                  <label className="font-inter text-xs text-taupe/60 block mb-1.5">
                    WhatsApp Number <span className="text-taupe/30">(with country code)</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 416 555 0100"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData((p) => ({ ...p, whatsapp: e.target.value }))}
                    className="w-full rounded-lg px-4 py-2.5 font-inter text-sm text-white placeholder-taupe/30 border border-white/10 focus:border-gold/40 focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-inter text-xs text-taupe/60 block mb-1.5">Preferred Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                      className="w-full rounded-lg px-4 py-2.5 font-inter text-sm text-white border border-white/10 focus:border-gold/40 focus:outline-none transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', colorScheme: 'dark' }}
                    />
                  </div>
                  <div>
                    <label className="font-inter text-xs text-taupe/60 block mb-1.5">No. of Guests</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.pax}
                      onChange={(e) => setFormData((p) => ({ ...p, pax: e.target.value }))}
                      className="w-full rounded-lg px-4 py-2.5 font-inter text-sm text-white border border-white/10 focus:border-gold/40 focus:outline-none transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-xl font-inter font-medium text-midnight-900 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)',
                    boxShadow: '4px 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Preparing…
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M11.99 2C6.465 2 2 6.465 2 11.99c0 1.888.525 3.655 1.432 5.163L2.046 22l4.976-1.302A9.933 9.933 0 0 0 11.99 22C17.515 22 22 17.535 22 11.99 22 6.445 17.515 2 11.99 2z" />
                      </svg>
                      Send via WhatsApp
                    </>
                  )}
                </button>
                <p className="font-inter text-[10px] text-taupe/30 text-center">
                  You&apos;ll be redirected to WhatsApp with your itinerary pre-filled
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
