/**
 * Meta Conversions API — server-side Lead event fire.
 *
 * Why: client-side Pixel `Lead` events fail to attribute to ads when:
 *  - User clicks ad → IG profile → DM → form (fbclid lost in IG redirect)
 *  - iOS 14.5+ AEM blocks unverified-domain Pixel events
 *  - Adblock / ITP / strict tracking blocks fbq.js entirely
 *
 * This server-side fire is paired with the client-side `fbq('track','Lead',...)`
 * via shared `eventId` for deduplication. CAPI carries fbc/fbp/IP/UA from the
 * request so Meta can match the lead back to the originating ad click.
 *
 * Required env: META_CAPI_TOKEN (Marketing API token with ads_management scope)
 */
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PIXEL_ID = "1599279067797770";
const META_API_VERSION = "v25.0";

function sha256Lower(s: string) {
  return crypto.createHash("sha256").update(s.trim().toLowerCase()).digest("hex");
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 200 });
  }

  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    console.warn("[lead-capi] META_CAPI_TOKEN not set; skipping CAPI fire");
    return NextResponse.json({ ok: false, reason: "no_token" }, { status: 200 });
  }

  const eventId = String(body.eventId || "");
  const fbc = String(body.fbc || "") || undefined;
  const fbp = String(body.fbp || "") || undefined;
  const landingUrl = String(body.landingUrl || "https://yuko-seoul.vercel.app");
  const contactHandle = String(body.contactHandle || "");
  const contactMethod = String(body.contactMethod || "").toLowerCase();

  const userAgent = req.headers.get("user-agent") || "";
  const xff = req.headers.get("x-forwarded-for") || "";
  const ip = xff.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "";

  const userData: Record<string, string> = {};
  if (userAgent) userData.client_user_agent = userAgent;
  if (ip) userData.client_ip_address = ip;
  if (fbc) userData.fbc = fbc;
  if (fbp) userData.fbp = fbp;
  if (contactMethod === "email" && contactHandle.includes("@")) {
    userData.em = sha256Lower(contactHandle);
  }

  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId || undefined,
    event_source_url: landingUrl,
    action_source: "website",
    user_data: userData,
    custom_data: {
      content_name: "apply_submit",
      currency: "USD",
      value: 0,
    },
  };

  try {
    const url = `https://graph.facebook.com/${META_API_VERSION}/${PIXEL_ID}/events?access_token=${token}`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [event] }),
    });
    const result = await r.json();
    if (result.error) {
      console.warn("[lead-capi] Meta returned error", result.error);
      return NextResponse.json({ ok: false, error: result.error }, { status: 200 });
    }
    return NextResponse.json({ ok: true, eventId, events_received: result.events_received }, { status: 200 });
  } catch (e) {
    console.error("[lead-capi] fetch failed", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 200 });
  }
}
