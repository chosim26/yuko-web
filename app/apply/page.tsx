"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { track, fireLead } from "@/lib/track";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3aBcoWlv6iQPYSClCYbwVJFfqB3AN6eZbpLoJ0e0ejYYw1L96mDbYzy1eXbziASnJ/exec";

type Locale = "en" | "ja" | "zh";

const t = {
  en: {
    // Step 1: name + vibes
    step1_title: "Name & vibe",
    step1_namePh: "Your first name",
    step1_vibeSub: "Tap all that excite you",
    // Step 2: contact
    step2_title: "How do we reach you?",
    step2_contactPh: "Your @handle, email, or number",
    next: "Next →",
    submit: "Meet your YUKO →",
    sending: "Matching...",
    vibes: ["Chill cafes", "Bar hopping", "K-drama spots", "Street food", "K-beauty", "Hidden spots"],
    contacts: ["Email", "Instagram", "WhatsApp", "KakaoTalk", "Line"],
  },
  ja: {
    step1_title: "お名前とムード",
    step1_namePh: "あなたの名前",
    step1_vibeSub: "気になるもの全部タップ",
    step2_title: "連絡方法を教えて",
    step2_contactPh: "@ハンドル、メール、電話番号",
    next: "次へ →",
    submit: "YUKOに会う →",
    sending: "マッチング中...",
    vibes: ["カフェ巡り", "バーホッピング", "Kドラマ", "ストリートフード", "Kビューティー", "隠れスポット"],
    contacts: ["メール", "Instagram", "WhatsApp", "KakaoTalk", "Line"],
  },
  zh: {
    step1_title: "名字与喜好",
    step1_namePh: "你的名字",
    step1_vibeSub: "选所有感兴趣的",
    step2_title: "我们怎么联系你？",
    step2_contactPh: "@账号、邮箱或手机号",
    next: "下一步 →",
    submit: "认识你的YUKO →",
    sending: "匹配中...",
    vibes: ["悠闲咖啡", "酒吧夜生活", "韩剧打卡", "街头美食", "K-Beauty", "隐藏景点"],
    contacts: ["邮箱", "Instagram", "WhatsApp", "KakaoTalk", "Line"],
  },
};

const vibeValues = ["chill-cafes", "bar-hopping", "kdrama-spots", "street-food", "kbeauty", "hidden-local"];
const contactValues = ["email", "instagram", "whatsapp", "kakaotalk", "line"];

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 = name+vibes, 1 = contact
  const [name, setName] = useState("");
  const [vibes, setVibes] = useState<string[]>([]);
  const [contactMethod, setContactMethod] = useState("");
  const [contactHandle, setContactHandle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const match = document.cookie.match(/locale=(en|ja|zh)/);
    if (match) setLocale(match[1] as Locale);
  }, []);

  useEffect(() => {
    track("ViewContent", { content_name: "apply_form" });
  }, []);

  const l = t[locale];
  const step1Valid = name.trim().length > 0 && vibes.length > 0;
  const step2Valid = !!contactMethod && contactHandle.trim().length > 0;

  function toggleVibe(v: string) {
    setVibes((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  async function handleSubmit() {
    if (!step2Valid) return;
    setSubmitting(true);

    const payload = {
      name,
      email: contactMethod === "email" ? contactHandle : "",
      gender: "",
      arrival_date: "",
      contact_method: contactMethod,
      contact_handle: contactHandle,
      vibes,
      gender_preference: "",
      utm_source: sessionStorage.getItem("utm_source") || "",
      utm_medium: sessionStorage.getItem("utm_medium") || "",
      utm_campaign: sessionStorage.getItem("utm_campaign") || "",
      utm_content: sessionStorage.getItem("utm_content") || "",
      landing_url: sessionStorage.getItem("landing_url") || "",
    };

    // Fire Lead BEFORE navigation: client Pixel + server CAPI in parallel, dedup'd by eventID.
    // keepalive on CAPI fetch survives the router.push unmount.
    fireLead({ contactMethod, contactHandle });

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // no-cors always catches; submission still goes through
    }
    router.push("/apply/thanks");
  }

  return (
    <main className="min-h-screen bg-obsidian text-off-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-6">
        <a href={locale === "en" ? "/" : `/${locale}`} className="text-sm text-white/50 hover:text-neon transition-colors">
          ←
        </a>
        <div className="font-caveat text-2xl tracking-tight">
          y<span className="text-neon">u</span>ko<span className="text-neon logo-dot">.</span>
        </div>
      </div>

      {/* Progress dots (2 steps) */}
      <div className="flex items-center justify-center gap-2 pt-8">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === step ? "w-10 bg-neon" : i < step ? "w-5 bg-neon/60" : "w-5 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Steps */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">

          {/* STEP 1: Name + Vibes (2 fields on one page) */}
          {step === 0 && (
            <div className="animate-fadeIn space-y-10">
              {/* Name field */}
              <div className="text-center space-y-3">
                <h2 className="font-caveat text-4xl md:text-5xl text-neon">{l.step1_title}</h2>
                <input
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={l.step1_namePh}
                  className="w-full text-center text-2xl md:text-3xl bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                />
              </div>

              {/* Vibes field */}
              <div className="space-y-4">
                <p className="text-center text-white/60 text-sm">{l.step1_vibeSub}</p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {vibeValues.map((v, i) => (
                    <button
                      key={v}
                      onClick={() => toggleVibe(v)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all ${
                        vibes.includes(v)
                          ? "bg-neon text-obsidian border-neon font-bold"
                          : "bg-white/5 text-white/80 border-white/15 hover:border-white/30"
                      }`}
                    >
                      {l.vibes[i]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => step1Valid && setStep(1)}
                  disabled={!step1Valid}
                  className="bg-neon text-obsidian px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                >
                  {l.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Contact method + handle */}
          {step === 1 && (
            <div className="animate-fadeIn text-center space-y-8">
              <h1 className="font-caveat text-4xl md:text-5xl text-neon">{l.step2_title}</h1>
              <div className="flex flex-wrap justify-center gap-2">
                {contactValues.map((c, i) => (
                  <button
                    key={c}
                    onClick={() => setContactMethod(c)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all ${
                      contactMethod === c
                        ? "bg-neon text-obsidian border-neon font-bold"
                        : "bg-white/5 text-white/80 border-white/15 hover:border-white/30"
                    }`}
                  >
                    {l.contacts[i]}
                  </button>
                ))}
              </div>
              <input
                type="text"
                autoFocus
                value={contactHandle}
                onChange={(e) => setContactHandle(e.target.value)}
                placeholder={l.step2_contactPh}
                className="w-full text-center text-xl md:text-2xl bg-transparent border-b-2 border-white/20 focus:border-neon py-4 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={!step2Valid || submitting}
                className="bg-neon text-obsidian px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100 shadow-[0_8px_32px_rgba(243,243,26,0.3)]"
              >
                {submitting ? l.sending : l.submit}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
