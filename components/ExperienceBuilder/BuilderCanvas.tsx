'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import clsx from 'clsx';
import {
  AVAILABLE_ACTIVITIES,
  GROUP_SIZES,
  PRESET_SIGNATURE,
  PRESET_ROMANTIC,
  PRESET_QUICK,
  calculatePrice,
  calculateTotalDuration,
  formatDuration,
  type Activity,
  type GroupSize,
} from './PricingCalculator';
import { ActivityPaletteCard, ActivityDraggableCard } from './ActivityCard';
import { useAnalytics } from '@/hooks/useAnalytics';

const CATEGORIES = ['All', 'Transport', 'Morning', 'Niagara', 'Scenic', 'Wine', 'Toronto', 'Adventure', 'Historic', 'Cultural', 'Evening'];

const PRESETS = [
  {
    id: 'signature',
    label: 'The Signature Day',
    description: 'Full Niagara experience',
    icon: '✦',
    activities: PRESET_SIGNATURE,
  },
  {
    id: 'romantic',
    label: 'The Romantic Evening',
    description: 'Wine, views & light show',
    icon: '♡',
    activities: PRESET_ROMANTIC,
  },
  {
    id: 'quick',
    label: 'The Quick Escape',
    description: 'Highlights in 4 stops',
    icon: '◈',
    activities: PRESET_QUICK,
  },
];

export default function BuilderCanvas() {
  const [itinerary, setItinerary] = useState<Activity[]>([]);
  const [selectedGroupSize, setSelectedGroupSize] = useState<GroupSize>(GROUP_SIZES[0]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [isQuoteSubmitting, setIsQuoteSubmitting] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const analytics = useAnalytics();

  const selectedIds = new Set(itinerary.map((a) => a.id));

  const filteredActivities =
    activeCategory === 'All'
      ? AVAILABLE_ACTIVITIES
      : AVAILABLE_ACTIVITIES.filter((a) => a.category === activeCategory);

  const totalDuration = calculateTotalDuration(itinerary);
  const totalPrice = calculatePrice(itinerary, selectedGroupSize);

  const handlePresetSelect = useCallback(
    (presetId: string, presetActivities: Activity[], presetLabel: string) => {
      setItinerary(presetActivities);
      setActivePreset(presetId);
      analytics.trackPresetUsed(presetLabel, presetActivities.length);
    },
    [analytics],
  );

  const handleAddActivity = useCallback(
    (activity: Activity) => {
      setItinerary((prev) => [...prev, activity]);
      setActivePreset(null);
      analytics.trackItemAdded(activity.id, activity.title);
    },
    [analytics],
  );

  const handleRemoveActivity = useCallback(
    (activityId: string) => {
      setItinerary((prev) => prev.filter((a) => a.id !== activityId));
      setActivePreset(null);
      analytics.trackItemRemoved(activityId);
    },
    [analytics],
  );

  const handleReorder = useCallback(
    (newOrder: Activity[]) => {
      setItinerary(newOrder);
      setActivePreset(null);
    },
    [],
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setActiveCategory(category);
      analytics.trackCategoryViewed(category);
    },
    [analytics],
  );

  const handleRequestQuote = useCallback(async () => {
    if (itinerary.length === 0) return;
    setIsQuoteSubmitting(true);
    analytics.trackTimelineCompleted(itinerary.length, totalDuration);
    analytics.trackQuoteInitiated(
      totalPrice,
      selectedGroupSize.label,
      itinerary.map((a) => a.id),
    );
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsQuoteSubmitting(false);
    setQuoteSubmitted(true);
    setTimeout(() => setQuoteSubmitted(false), 4000);
  }, [itinerary, totalPrice, totalDuration, selectedGroupSize, analytics]);

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
            <Reorder.Group
              axis="y"
              values={itinerary}
              onReorder={handleReorder}
              className="space-y-2 max-h-72 overflow-y-auto pr-1"
            >
              {itinerary.map((activity, index) => (
                <ActivityDraggableCard
                  key={activity.id}
                  activity={activity}
                  onRemove={handleRemoveActivity}
                  index={index}
                />
              ))}
            </Reorder.Group>
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
                  onClick={() => { setItinerary([]); setActivePreset(null); }}
                  className="px-4 py-2.5 rounded-lg text-sm font-inter text-taupe/60 border border-white/10 hover:border-white/20 hover:text-taupe transition-all duration-200"
                >
                  Clear
                </button>
                <button
                  onClick={handleRequestQuote}
                  disabled={isQuoteSubmitting || quoteSubmitted}
                  className={clsx(
                    'relative px-6 py-2.5 rounded-lg text-sm font-inter font-medium transition-all duration-300 overflow-hidden',
                    quoteSubmitted
                      ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                      : 'text-midnight-900 border border-gold/50',
                  )}
                  style={
                    !quoteSubmitted
                      ? {
                          background: 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)',
                          boxShadow: '4px 4px 12px rgba(0,0,0,0.3), -2px -2px 8px rgba(255,255,255,0.04)',
                        }
                      : {}
                  }
                >
                  {isQuoteSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Preparing Quote…
                    </span>
                  ) : quoteSubmitted ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Quote Requested
                    </span>
                  ) : (
                    'Request a Private Quote'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
