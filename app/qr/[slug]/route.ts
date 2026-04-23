import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SHEETS_URL = "https://script.google.com/macros/s/AKfycbw3aBcoWlv6iQPYSClCYbwVJFfqB3AN6eZbpLoJ0e0ejYYw1L96mDbYzy1eXbziASnJ/exec";
const SHEETS_KEY = "yuko_dash_2026";

/**
 * QR scan counter + redirect.
 *
 * A QR printed on the flyer points to /qr/{slug}.
 * This route:
 *   1. Logs the scan (fire-and-forget) to the Sheet "qr_scans" tab
 *   2. Redirects to / with UTM appended so the rest of the funnel tracks it
 *
 * Valid slugs: flip | lost | alone | generic
 *
 * UTM mapping per slug:
 *   flip    -> utm_campaign=street_flip
 *   lost    -> utm_campaign=street_lost
 *   alone   -> utm_campaign=street_alone
 *   generic -> utm_campaign=street_generic
 *
 * Apps Script must handle `action=qr_scan`. See /marketing/전단지 시안/apps-script-patch.md.
 */

const CAMPAIGNS: Record<string, string> = {
  flip: "street_flip",
  lost: "street_lost",
  alone: "street_alone",
  generic: "street_generic",
};

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;
  const campaign = CAMPAIGNS[slug] || "street_generic";

  // Log the scan — fire-and-forget
  const payload = {
    key: SHEETS_KEY,
    action: "qr_scan",
    timestamp: new Date().toISOString(),
    slug,
    utm_campaign: campaign,
    user_agent: req.headers.get("user-agent") || "",
    referrer: req.headers.get("referer") || "",
    country: req.headers.get("x-vercel-ip-country") || "",
    city: req.headers.get("x-vercel-ip-city") || "",
  };
  void fetch(SHEETS_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).catch(() => { /* don't block redirect */ });

  // Redirect to / with UTM appended — so downstream tracking (Meta Pixel, GA4, form submit) picks it up
  const destUrl = new URL("/", req.nextUrl);
  destUrl.searchParams.set("utm_source", "flyer");
  destUrl.searchParams.set("utm_medium", "print");
  destUrl.searchParams.set("utm_campaign", campaign);
  destUrl.searchParams.set("utm_content", `qr_${slug}`);

  return NextResponse.redirect(destUrl, 302);
}
