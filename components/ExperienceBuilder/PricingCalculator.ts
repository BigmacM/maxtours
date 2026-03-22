export interface Activity {
  id: string;
  icon: string;
  title: string;
  duration: number; // minutes
  price: number; // per person CAD
  category: string;
}

export interface GroupSize {
  label: string;
  min: number;
  max: number;
  vehicleType: string;
  basePrice: number;
  multiplier: number;
}

export const GROUP_SIZES: GroupSize[] = [
  {
    label: '1–2 Guests',
    min: 1,
    max: 2,
    vehicleType: 'Executive Sedan',
    basePrice: 695,
    multiplier: 1.0,
  },
  {
    label: '3–6 Guests',
    min: 3,
    max: 6,
    vehicleType: 'Luxury SUV',
    basePrice: 995,
    multiplier: 1.2,
  },
  {
    label: '7–12 Guests',
    min: 7,
    max: 12,
    vehicleType: 'Mercedes Sprinter',
    basePrice: 1495,
    multiplier: 1.5,
  },
  {
    label: '13–20 Guests',
    min: 13,
    max: 20,
    vehicleType: 'Executive Mini Bus',
    basePrice: 2495,
    multiplier: 1.8,
  },
];

export const AVAILABLE_ACTIVITIES: Activity[] = [
  { id: 'hornblower', icon: '🚢', title: 'Hornblower Cruise', duration: 60, price: 85, category: 'Niagara' },
  { id: 'journey-behind-falls', icon: '💧', title: 'Journey Behind the Falls', duration: 45, price: 65, category: 'Niagara' },
  { id: 'skylon-tower', icon: '🗼', title: 'Skylon Tower Observation', duration: 45, price: 55, category: 'Niagara' },
  { id: 'notl-wine', icon: '🍷', title: 'NOTL Winery Icewine Tasting', duration: 90, price: 120, category: 'Wine' },
  { id: 'floral-clock', icon: '🌸', title: 'Floral Clock & Whirlpool', duration: 30, price: 0, category: 'Scenic' },
  { id: 'helicopter', icon: '🚁', title: 'Helicopter Adventure', duration: 20, price: 250, category: 'Adventure' },
  { id: 'power-station', icon: '⚡', title: 'Niagara Power Station', duration: 60, price: 45, category: 'Historic' },
  { id: 'cn-tower', icon: '🏙️', title: 'CN Tower EdgeWalk', duration: 90, price: 195, category: 'Toronto' },
  { id: 'casa-loma', icon: '🏰', title: 'Casa Loma Castle', duration: 75, price: 40, category: 'Toronto' },
  { id: 'distillery', icon: '🏛️', title: 'Distillery District', duration: 60, price: 0, category: 'Toronto' },
  { id: 'illumination', icon: '🌈', title: 'Falls Illumination (Evening)', duration: 45, price: 35, category: 'Niagara' },
  { id: 'maple-tasting', icon: '🍁', title: 'Maple Syrup Farm Visit', duration: 60, price: 55, category: 'Cultural' },
];

export const PRESET_ITINERARY: Activity[] = [
  AVAILABLE_ACTIVITIES.find((a) => a.id === 'hornblower')!,
  AVAILABLE_ACTIVITIES.find((a) => a.id === 'journey-behind-falls')!,
  AVAILABLE_ACTIVITIES.find((a) => a.id === 'floral-clock')!,
  AVAILABLE_ACTIVITIES.find((a) => a.id === 'notl-wine')!,
  AVAILABLE_ACTIVITIES.find((a) => a.id === 'skylon-tower')!,
  AVAILABLE_ACTIVITIES.find((a) => a.id === 'illumination')!,
];

/**
 * Calculate the total price for a given set of activities and group size.
 * Base price covers vehicle + guide. Activity prices are per person,
 * calculated using the midpoint of the group size range.
 */
export function calculatePrice(activities: Activity[], groupSize: GroupSize): number {
  const avgGuests = Math.round((groupSize.min + groupSize.max) / 2);
  const activitiesCost = activities.reduce((sum, activity) => {
    return sum + activity.price * avgGuests;
  }, 0);
  const base = groupSize.basePrice * groupSize.multiplier;
  return Math.round(base + activitiesCost);
}

/**
 * Calculate the total duration in minutes for a set of activities,
 * including 15 minutes transit between each activity.
 */
export function calculateTotalDuration(activities: Activity[]): number {
  if (activities.length === 0) return 0;
  const activityTime = activities.reduce((sum, a) => sum + a.duration, 0);
  const transitTime = (activities.length - 1) * 15;
  return activityTime + transitTime;
}

/**
 * Format a duration in minutes to a human-readable string.
 * e.g. 480 → "8 hr 0 min", 95 → "1 hr 35 min"
 */
export function formatDuration(minutes: number): string {
  if (minutes === 0) return '0 min';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
}

/**
 * Get the category colour for UI display
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Niagara: 'text-blue-300',
    Wine: 'text-purple-300',
    Scenic: 'text-green-300',
    Adventure: 'text-orange-300',
    Historic: 'text-amber-300',
    Toronto: 'text-cyan-300',
    Cultural: 'text-red-300',
  };
  return colors[category] || 'text-taupe';
}
