"use client";

import { useState, useEffect } from "react";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-obsidian/90 backdrop-blur-md border-t border-white/10 px-4 py-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-off-white">
            Your friend is waiting
          </div>
          <div className="text-[10px] text-white/50">Free · 30 seconds</div>
        </div>
        <a
          href="/apply"
          className="bg-neon text-obsidian px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform"
        >
          I&apos;m in →
        </a>
      </div>
    </div>
  );
}
