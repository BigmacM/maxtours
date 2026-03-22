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
      pushEvent('item_added', { activity_id: activityId, activity_name: activityName }),

    trackItemRemoved: (activityId: string) =>
      pushEvent('item_removed', { activity_id: activityId }),

    trackQuoteInitiated: (totalPrice: number, groupSize: string, activities: string[]) =>
      pushEvent('quote_initiated', {
        value: totalPrice,
        currency: 'CAD',
        group_size: groupSize,
        activities,
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
