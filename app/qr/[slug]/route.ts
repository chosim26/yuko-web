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

  // NOTE: Sheet 로깅은 Apps Script 패치 완료 전까지 비활성화.
  // 패치 없이 POST하면 leads 탭에 empty 행 생성됨.
  // 스캔 카운트는 Vercel 로그(이 라우트 호출 수) / GA4(리다이렉트 후 utm_landing 이벤트)로 충분.
  // 패치 완료 시 아래 블록 주석 해제:
  //
  // const payload = { key: SHEETS_KEY, action: "qr_scan", timestamp: ..., slug, ... };
  // void fetch(SHEETS_URL, { method: "POST", body: JSON.stringify(payload) }).catch(() => {});
  void req; // suppress unused warning
  void SHEETS_URL; void SHEETS_KEY;

  // Redirect to / with UTM appended — so downstream tracking (Meta Pixel, GA4, form submit) picks it up
  const destUrl = new URL("/", req.nextUrl);
  destUrl.searchParams.set("utm_source", "flyer");
  destUrl.searchParams.set("utm_medium", "print");
  destUrl.searchParams.set("utm_campaign", campaign);
  destUrl.searchParams.set("utm_content", `qr_${slug}`);

  return NextResponse.redirect(destUrl, 302);
}
