declare global {
  interface Window {
    fbq: (action: string, event: string, params?: Record<string, unknown>) => void;
    gtag: (cmd: string, event: string, params?: Record<string, unknown>) => void;
  }
}

export function track(event: string, params?: Record<string, unknown>) {
  try {
    window.fbq?.("track", event, params);
    window.gtag?.("event", event, params);
  } catch (e) {
    console.warn("tracking failed", e);
  }
}
