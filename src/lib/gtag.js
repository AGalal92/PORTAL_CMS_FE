export const GA_MEASUREMENT_ID =   'G-Y5R9ZS1CSC';

export function pageview(url) {
  if (!window.gtag || !GA_MEASUREMENT_ID) return;
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
}

export function gaEvent(name, params = {}) {
  if (!window.gtag) return;
  window.gtag('event', name, params);
}
