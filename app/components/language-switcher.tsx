"use client";

import { useState } from "react";

const locales = [
  { code: "en", label: "EN", path: "/" },
  { code: "ja", label: "日本語", path: "/ja" },
  { code: "zh", label: "中文", path: "/zh" },
];

export default function LanguageSwitcher({ current = "en" }: { current?: string }) {
  const [open, setOpen] = useState(false);

  function select(code: string, path: string) {
    document.cookie = `locale=${code};path=/;max-age=${60 * 60 * 24 * 365}`;
    setOpen(false);
    window.location.href = path;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs text-white/60 hover:text-neon transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5"
      >
        <span>🌐</span>
        <span>{locales.find((l) => l.code === current)?.label}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-obsidian border border-white/15 rounded-xl overflow-hidden shadow-xl min-w-[120px]">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => select(l.code, l.path)}
                className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  l.code === current
                    ? "text-neon bg-white/10 font-bold"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
