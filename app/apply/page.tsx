"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { track, fireLead } from "@/lib/track";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3aBcoWlv6iQPYSClCYbwVJFfqB3AN6eZbpLoJ0e0ejYYw1L96mDbYzy1eXbziASnJ/exec";

type Locale = "en" | "ja" | "zh";
type ContactMethod = "" | "instagram" | "whatsapp" | "kakaotalk" | "line";
type WhenType = "" | "date" | "month" | "unsure";
type GroupSize = "" | "solo" | "duo";

const t = {
  en: {
    step1_title: "Tell us about you",
    step1_namePh: "Your first name",
    step1_emailPh: "Email address",
    step1_contactLabel: "Best way to chat?",
    step1_handlePh: {
      instagram: "@your_ig_handle",
      whatsapp: "+1 555 555 5555",
      kakaotalk: "Your KakaoTalk ID",
      line: "Your LINE ID",
      "": "Your handle / number",
    },
    contacts: ["Instagram", "WhatsApp", "KakaoTalk", "LINE"],
    step2_title: "Your Seoul trip",
    step2_whenLabel: "When are you in Seoul?",
    step2_whenDate: "I know the date",
    step2_whenMonth: "Just the month",
    step2_whenUnsure: "Not sure yet",
    step2_groupLabel: "Solo or with a friend?",
    step2_groupSolo: "Just me",
    step2_groupDuo: "+1 friend",
    step3_title: "Your vibes",
    step3_vibeSub: "Tap all that excite you",
    next: "Next →",
    submit: "Meet your YUKO →",
    sending: "Matching...",
    vibes: ["Chill cafes", "Bar hopping", "K-drama spots", "Street food", "K-beauty", "Hidden spots"],
  },
  ja: {
    step1_title: "あなたについて",
    step1_namePh: "お名前",
    step1_emailPh: "メールアドレス",
    step1_contactLabel: "連絡しやすい方法は?",
    step1_handlePh: {
      instagram: "@あなたのIG",
      whatsapp: "+81 90 1234 5678",
      kakaotalk: "KakaoTalk ID",
      line: "LINE ID",
      "": "ID / 電話番号",
    },
    contacts: ["Instagram", "WhatsApp", "KakaoTalk", "LINE"],
    step2_title: "ソウル旅行について",
    step2_whenLabel: "いつソウルに?",
    step2_whenDate: "日付決まってる",
    step2_whenMonth: "月だけ決まってる",
    step2_whenUnsure: "まだ未定",
    step2_groupLabel: "ひとり? お友達と?",
    step2_groupSolo: "ひとり",
    step2_groupDuo: "+1 お友達",
    step3_title: "あなたのムード",
    step3_vibeSub: "気になるもの全部タップ",
    next: "次へ →",
    submit: "YUKOに会う →",
    sending: "マッチング中...",
    vibes: ["カフェ巡り", "バーホッピング", "Kドラマ", "ストリートフード", "Kビューティー", "隠れスポット"],
  },
  zh: {
    step1_title: "告诉我们你是谁",
    step1_namePh: "你的名字",
    step1_emailPh: "邮箱",
    step1_contactLabel: "最方便的联系方式?",
    step1_handlePh: {
      instagram: "@你的IG账号",
      whatsapp: "+86 138 0000 0000",
      kakaotalk: "KakaoTalk ID",
      line: "LINE ID",
      "": "账号 / 手机号",
    },
    contacts: ["Instagram", "WhatsApp", "KakaoTalk", "LINE"],
    step2_title: "你的首尔之行",
    step2_whenLabel: "什么时候来首尔?",
    step2_whenDate: "我知道日期",
    step2_whenMonth: "只知道月份",
    step2_whenUnsure: "还没确定",
    step2_groupLabel: "一个人还是和朋友?",
    step2_groupSolo: "一个人",
    step2_groupDuo: "+1 朋友",
    step3_title: "你的喜好",
    step3_vibeSub: "选所有感兴趣的",
    next: "下一步 →",
    submit: "认识你的YUKO →",
    sending: "匹配中...",
    vibes: ["悠闲咖啡", "酒吧夜生活", "韩剧打卡", "街头美食", "K-Beauty", "隐藏景点"],
  },
};

const vibeValues = ["chill-cafes", "bar-hopping", "kdrama-spots", "street-food", "kbeauty", "hidden-local"];
const contactValues: Exclude<ContactMethod, "">[] = ["instagram", "whatsapp", "kakaotalk", "line"];

const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("instagram");
  const [contactHandle, setContactHandle] = useState("");
  const [whenType, setWhenType] = useState<WhenType>("");
  const [whenValue, setWhenValue] = useState("");
  const [groupSize, setGroupSize] = useState<GroupSize>("");
  const [vibes, setVibes] = useState<string[]>([]);
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
  const step0Valid =
    name.trim().length > 0 &&
    isValidEmail(email) &&
    contactMethod !== "" &&
    contactHandle.trim().length > 0;
  const step1Valid =
    whenType !== "" && (whenType === "unsure" || whenValue.trim().length > 0);
  const step2Valid = vibes.length > 0;

  function toggleVibe(v: string) {
    setVibes((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  async function handleSubmit() {
    if (!step2Valid) return;
    setSubmitting(true);

    const cleanedHandle =
      contactMethod === "instagram"
        ? contactHandle.trim().replace(/^@+/, "")
        : contactHandle.trim();

    const payload = {
      name,
      email,
      ig_handle: contactMethod === "instagram" ? cleanedHandle : "",
      arrival_when_type: whenType,
      arrival_date: whenType === "unsure" ? "" : whenValue,
      group_size: groupSize,
      vibes,
      // Backward-compat with existing Apps Script schema
      gender: "",
      contact_method: contactMethod,
      contact_handle: cleanedHandle,
      gender_preference: "",
      utm_source: sessionStorage.getItem("utm_source") || "",
      utm_medium: sessionStorage.getItem("utm_medium") || "",
      utm_campaign: sessionStorage.getItem("utm_campaign") || "",
      utm_content: sessionStorage.getItem("utm_content") || "",
      landing_url: sessionStorage.getItem("landing_url") || "",
    };

    fireLead({ contactMethod, contactHandle: cleanedHandle });

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
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

      {/* Progress dots (3 steps) */}
      <div className="flex items-center justify-center gap-2 pt-8">
        {[0, 1, 2].map((i) => (
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

          {/* STEP 0: Name + Email + Contact */}
          {step === 0 && (
            <div className="animate-fadeIn space-y-6">
              <div className="text-center mb-4">
                <h2 className="font-caveat text-4xl md:text-5xl text-neon">{l.step1_title}</h2>
              </div>

              <div className="space-y-5">
                <input
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={l.step1_namePh}
                  className="w-full text-center text-xl md:text-2xl bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                />

                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={l.step1_emailPh}
                  className="w-full text-center text-xl md:text-2xl bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-center text-white/70 text-sm font-medium">{l.step1_contactLabel}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {contactValues.map((c, i) => (
                    <button
                      key={c}
                      onClick={() => setContactMethod(c)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
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
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={contactHandle}
                  onChange={(e) => setContactHandle(e.target.value)}
                  placeholder={l.step1_handlePh[contactMethod] || l.step1_handlePh[""]}
                  className="w-full text-center text-lg md:text-xl bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => step0Valid && setStep(1)}
                  disabled={!step0Valid}
                  className="bg-neon text-obsidian px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                >
                  {l.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 1: When + Group */}
          {step === 1 && (
            <div className="animate-fadeIn space-y-8">
              <div className="text-center mb-2">
                <h2 className="font-caveat text-4xl md:text-5xl text-neon">{l.step2_title}</h2>
              </div>

              {/* When */}
              <div className="space-y-3">
                <p className="text-center text-white/70 text-sm font-medium">{l.step2_whenLabel}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {([
                    { v: "date", label: l.step2_whenDate },
                    { v: "month", label: l.step2_whenMonth },
                    { v: "unsure", label: l.step2_whenUnsure },
                  ] as const).map((opt) => (
                    <button
                      key={opt.v}
                      onClick={() => {
                        setWhenType(opt.v);
                        if (opt.v === "unsure") setWhenValue("");
                      }}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all ${
                        whenType === opt.v
                          ? "bg-neon text-obsidian border-neon font-bold"
                          : "bg-white/5 text-white/80 border-white/15 hover:border-white/30"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {whenType === "date" && (
                  <input
                    type="date"
                    value={whenValue}
                    onChange={(e) => setWhenValue(e.target.value)}
                    className="w-full text-center text-lg md:text-xl bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                  />
                )}
                {whenType === "month" && (
                  <input
                    type="month"
                    value={whenValue}
                    onChange={(e) => setWhenValue(e.target.value)}
                    className="w-full text-center text-lg md:text-xl bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                  />
                )}
              </div>

              {/* Group */}
              <div className="space-y-3">
                <p className="text-center text-white/70 text-sm font-medium">{l.step2_groupLabel}</p>
                <div className="flex justify-center gap-2">
                  {([
                    { v: "solo", label: l.step2_groupSolo },
                    { v: "duo", label: l.step2_groupDuo },
                  ] as const).map((opt) => (
                    <button
                      key={opt.v}
                      onClick={() => setGroupSize(opt.v)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all ${
                        groupSize === opt.v
                          ? "bg-neon text-obsidian border-neon font-bold"
                          : "bg-white/5 text-white/80 border-white/15 hover:border-white/30"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => step1Valid && setStep(2)}
                  disabled={!step1Valid}
                  className="bg-neon text-obsidian px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                >
                  {l.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Vibes */}
          {step === 2 && (
            <div className="animate-fadeIn text-center space-y-8">
              <h1 className="font-caveat text-4xl md:text-5xl text-neon">{l.step3_title}</h1>
              <p className="text-white/60 text-sm">{l.step3_vibeSub}</p>
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
