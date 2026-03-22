'use client';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function useAnalytics() {
  const pushEvent = (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
  };

  return {
    trackBuilderDragStart: (activityId: string) =>
      pushEvent('builder_drag_start', { activity_id: activityId }),

    trackBuilderDragEnd: (activityId: string, position: number) =>
      pushEvent('builder_drag_end', { activity_id: activityId, position }),

    trackItemAdded: (activityId: string, activityName: string) =>
      pushEvent('select_item', { activity_id: activityId, activity_name: activityName }),

    trackItemRemoved: (activityId: string) =>
      pushEvent('item_removed', { activity_id: activityId }),

    trackActivityDragged: (activityId: string, newPosition: number) =>
      pushEvent('activity_dragged', { activity_id: activityId, new_position: newPosition }),

    trackPresetUsed: (presetName: string, activityCount: number) =>
      pushEvent('builder_preset_used', { preset_name: presetName, activity_count: activityCount }),

    trackTimelineCompleted: (activityCount: number, totalDuration: number) =>
      pushEvent('timeline_completed', { activity_count: activityCount, total_duration_minutes: totalDuration }),

    trackCategoryViewed: (category: string) =>
      pushEvent('view_item_list', { item_list_name: category }),

    trackQuoteInitiated: (totalPrice: number, groupSize: string, activities: string[]) =>
      pushEvent('begin_checkout', {
        value: totalPrice,
        currency: 'CAD',
        group_size: groupSize,
        activities,
        itinerary_depth: activities.length,
      }),

    trackExperienceBuilderStart: () => pushEvent('experience_builder_start'),

    trackScrollDepth: (depth: number) =>
      pushEvent('scroll_depth', { percent: depth }),

    trackPageView: (pagePath: string, pageTitle: string) =>
      pushEvent('page_view', { page_path: pagePath, page_title: pageTitle }),

    trackTourView: (tourSlug: string, tourName: string) =>
      pushEvent('tour_view', { tour_slug: tourSlug, tour_name: tourName }),

    trackCTAClick: (ctaText: string, location: string) =>
      pushEvent('cta_click', { cta_text: ctaText, location }),
  };
}
