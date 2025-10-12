// Use your env var if you have one (Vite style), or hard-code your ID
export const GA_MEASUREMENT_ID =
 'G-Y5R9ZS1CSC'; // <-- put your GA4 ID if no env

// SPA page view on every route change
export function pageview(url) {
  if (!window.gtag || !GA_MEASUREMENT_ID) return;
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
}

// Track custom events (clicks, form submits, etc.)
export function gaEvent(eventName, params = {}) {
  if (!window.gtag) return;
  window.gtag('event', eventName, params);
}
