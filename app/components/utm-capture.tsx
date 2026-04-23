"use client";

import { useEffect } from "react";

// Note: Window.gtag is declared in lib/track.ts — don't redeclare here.

export default function UtmCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
    const utm: Record<string, string> = {};
    utmKeys.forEach((key) => {
      const val = params.get(key);
      if (val) {
        sessionStorage.setItem(key, val);
        utm[key] = val;
      } else {
        utm[key] = sessionStorage.getItem(key) || "";
      }
    });
    // Save full landing URL on first visit
    if (!sessionStorage.getItem("landing_url")) {
      sessionStorage.setItem("landing_url", window.location.href);
    }

    // Only log visits that arrived WITH UTM (first-touch), so we don't log internal navigation
    const hasUtm = utmKeys.some((k) => params.get(k));
    if (hasUtm) {
      // GA4 custom event — immediate visibility in GA4 Realtime + Events
      try {
        window.gtag?.("event", "utm_landing", {
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
        });
      } catch { /* ignore */ }

      // NOTE: Sheet 방문 로깅은 Apps Script 패치 완료 후에만 활성화.
      // 지금 POST하면 leads 탭에 empty 행 생성됨 (Apps Script가 action=log_visit 미지원).
      // 패치 완료 시: marketing/전단지 시안/apps-script-patch.md 따라 업데이트 후
      // 아래 블록 주석 해제.
      //
      // fetch("/api/track-visit", { ... });
    }
  }, []);

  return null;
}
