import { sendGAEvent } from "@next/third-parties/google";

// Thin wrapper over GA4's gtag event API (see <GoogleAnalytics> in the layouts).
// Client-side only — call from event handlers in "use client" components.
export function trackEvent(name: string, params?: Record<string, unknown>) {
  sendGAEvent("event", name, params ?? {});
}
