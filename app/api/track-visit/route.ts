import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SHEETS_URL = "https://script.google.com/macros/s/AKfycbw3aBcoWlv6iQPYSClCYbwVJFfqB3AN6eZbpLoJ0e0ejYYw1L96mDbYzy1eXbziASnJ/exec";
const SHEETS_KEY = "yuko_dash_2026";

/**
 * Visit tracker — logs every landing with UTM to the Google Sheet "visits" tab.
 * Fire-and-forget; never blocks the user.
 *
 * Payload: { utm_source, utm_medium, utm_campaign, utm_content, referrer, user_agent, landing_url }
 *
 * NOTE: Requires Apps Script `doPost` to handle action=log_visit.
 * See /Users/admin/chosim/yuko/marketing/전단지 시안/apps-script-patch.md.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = {
      key: SHEETS_KEY,
      action: "log_visit",
      timestamp: new Date().toISOString(),
      utm_source: body.utm_source || "",
      utm_medium: body.utm_medium || "",
      utm_campaign: body.utm_campaign || "",
      utm_content: body.utm_content || "",
      referrer: body.referrer || "",
      user_agent: body.user_agent || req.headers.get("user-agent") || "",
      landing_url: body.landing_url || "",
      country: req.headers.get("x-vercel-ip-country") || "",
      city: req.headers.get("x-vercel-ip-city") || "",
    };

    // Fire-and-forget to Apps Script — don't await in the response critical path
    void fetch(SHEETS_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    }).catch(() => { /* Apps Script may 302; swallow */ });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 400 });
  }
}
