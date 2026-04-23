declare global {
  interface Window {
    fbq: (action: string, event: string, params?: Record<string, unknown>, opts?: Record<string, unknown>) => void;
    gtag: (cmd: string, event: string, params?: Record<string, unknown>) => void;
  }
}

export function track(event: string, params?: Record<string, unknown>, opts?: Record<string, unknown>) {
  try {
    window.fbq?.("track", event, params, opts);
    window.gtag?.("event", event, params);
  } catch (e) {
    console.warn("tracking failed", e);
  }
}

export function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&")}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : "";
}

export function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "yuko-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
}

/**
 * Fire a Lead event both via client-side Pixel and server-side CAPI in parallel,
 * deduplicated by a shared eventId.
 *
 * - Client Pixel: fbq('track','Lead',params,{eventID})
 * - CAPI: POST /api/lead-capi with eventId, fbc, fbp, contact info
 *
 * Meta dedups when both arrive within 48h with same eventId.
 * If client fbq is blocked (adblock/ITP), CAPI still delivers.
 * If CAPI fails (token miss/network), client still fires.
 */
export async function fireLead(payload: { contactMethod?: string; contactHandle?: string }) {
  const eventId = uuid();
  const fbc = getCookie("_fbc");
  const fbp = getCookie("_fbp");
  const landingUrl = typeof window !== "undefined" ? window.location.href : "";

  // Client-side fire (fire-and-forget, eventID for dedup)
  try {
    window.fbq?.(
      "track",
      "Lead",
      { content_name: "apply_submit", value: 0, currency: "USD" },
      { eventID: eventId }
    );
    window.gtag?.("event", "Lead", { content_name: "apply_submit" });
  } catch (e) {
    console.warn("client Lead fire failed", e);
  }

  // Server-side CAPI fire (fire-and-forget)
  fetch("/api/lead-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventId,
      fbc,
      fbp,
      landingUrl,
      contactMethod: payload.contactMethod,
      contactHandle: payload.contactHandle,
    }),
    keepalive: true, // survives page navigation
  }).catch((e) => console.warn("CAPI Lead fire failed", e));

  return eventId;
}
