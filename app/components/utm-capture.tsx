"use client";

import { useEffect } from "react";

export default function UtmCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
    utmKeys.forEach((key) => {
      const val = params.get(key);
      if (val) sessionStorage.setItem(key, val);
    });
    // Save full landing URL on first visit
    if (!sessionStorage.getItem("landing_url")) {
      sessionStorage.setItem("landing_url", window.location.href);
    }
  }, []);

  return null;
}
