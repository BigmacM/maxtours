'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Activity } from './PricingCalculator';
import { getCategoryColor } from './PricingCalculator';

// Static card for the activity palette (left panel)
export function ActivityPaletteCard({
  activity,
  onAdd,
}: {
  activity: Activity;
  onAdd: (activity: Activity) => void;
}) {
  return (
    <motion.div
      layout
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onAdd(activity)}
      className={clsx(
        'relative rounded-xl p-4 cursor-pointer transition-all duration-300 group',
        'backdrop-blur-xl border border-white/10 bg-white/5 hover:border-gold/40 hover:bg-white/8',
      )}
      style={{
        boxShadow: '4px 4px 12px rgba(0,0,0,0.35), -2px -2px 8px rgba(255,255,255,0.03)',
      }}
    >
      {/* Gold border glow on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 20px rgba(212,175,55,0.08)' }}
      />

      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 leading-none">{activity.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-playfair text-sm text-white leading-tight mb-1 truncate">
            {activity.title}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={clsx('text-xs font-inter font-medium', getCategoryColor(activity.category))}>
              {activity.category}
            </span>
            {activity.duration > 0 && (
              <>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-xs font-inter text-taupe/70">{activity.duration}m</span>
              </>
            )}
            <span className="text-white/20 text-xs">·</span>
            <span className="text-xs font-inter font-medium text-gold">
              {activity.price === 0 ? 'Included' : `CA$${activity.price}/pp`}
            </span>
          </div>
        </div>

        <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-gold/60 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
          <svg className="w-3 h-3 text-white/40 group-hover:text-gold transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// Static ordered card for the itinerary timeline (right panel) — no drag on mobile
export function ActivityDraggableCard({
  activity,
  onRemove,
  index,
}: {
  activity: Activity;
  onRemove: (activityId: string) => void;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2 }}
      className="relative group"
    >
      <div
        className={clsx(
          'rounded-xl p-4 flex items-center gap-3 transition-all duration-300',
          'backdrop-blur-xl border border-gold/30 bg-gold/5',
          'hover:border-gold/50 hover:bg-gold/8',
        )}
        style={{
          boxShadow: '4px 4px 12px rgba(0,0,0,0.4), -2px -2px 8px rgba(255,255,255,0.03)',
        }}
      >
        {/* Step number */}
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
          <span className="text-gold text-xs font-inter font-medium">{index + 1}</span>
        </div>

        <span className="text-xl flex-shrink-0">{activity.icon}</span>

        <div className="flex-1 min-w-0">
          <h4 className="font-playfair text-sm text-white leading-tight">{activity.title}</h4>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className={clsx('text-xs font-inter font-medium', getCategoryColor(activity.category))}>
              {activity.category}
            </span>
            {activity.duration > 0 && (
              <>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-xs font-inter text-taupe/70">{activity.duration} min</span>
              </>
            )}
            {activity.price > 0 && (
              <>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-xs font-inter text-gold/80">CA${activity.price}/pp</span>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => onRemove(activity.id)}
          className="flex-shrink-0 w-7 h-7 rounded-lg border border-white/10 hover:border-red-400/50 hover:bg-red-400/10 flex items-center justify-center transition-all duration-200"
          aria-label={`Remove ${activity.title}`}
        >
          <svg className="w-3.5 h-3.5 text-white/40 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
