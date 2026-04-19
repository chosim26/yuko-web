"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/track";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3aBcoWlv6iQPYSClCYbwVJFfqB3AN6eZbpLoJ0e0ejYYw1L96mDbYzy1eXbziASnJ/exec";

type Locale = "en" | "ja" | "zh";

const t = {
  en: {
    back: "← Back",
    title: "apply now",
    heading: "Your Seoul starts here.",
    sub: "Takes 30 seconds · No payment required",
    name: "Your name",
    namePh: "First name",
    email: "Email",
    emailPh: "your@email.com",
    gender: "Your gender",
    male: "Male", female: "Female", other: "Other",
    arrival: "When do you land in Seoul?",
    contact: "How should we reach you?",
    contactPh: "Your @handle or number",
    vibeTitle: "What's your vibe?",
    vibeSub: "(pick any)",
    vibes: ["Chill cafes", "Bar hopping", "K-drama spots", "Street food crawl", "K-beauty shopping", "Hidden local spots"],
    matePref: "Mate gender preference",
    sameGender: "Same gender", noPref: "No preference",
    submit: "Meet your YUKO →",
    sending: "Sending...",
    micro: "Takes 30 seconds · No payment required",
  },
  ja: {
    back: "← 戻る",
    title: "今すぐ申し込む",
    heading: "あなたのソウルがここから始まる。",
    sub: "30秒で完了 · お支払い不要",
    name: "お名前",
    namePh: "名前",
    email: "メール",
    emailPh: "your@email.com",
    gender: "性別",
    male: "男性", female: "女性", other: "その他",
    arrival: "ソウル到着日は？",
    contact: "連絡方法を選んでください",
    contactPh: "@ハンドルまたは電話番号",
    vibeTitle: "どんな旅がしたい？",
    vibeSub: "(複数選択OK)",
    vibes: ["カフェ巡り", "バーホッピング", "Kドラマスポット", "ストリートフード", "Kビューティー", "隠れた名所"],
    matePref: "メイトの性別希望",
    sameGender: "同性", noPref: "希望なし",
    submit: "YUKOに会う →",
    sending: "送信中...",
    micro: "30秒で完了 · お支払い不要",
  },
  zh: {
    back: "← 返回",
    title: "立即申请",
    heading: "你的首尔从这里开始。",
    sub: "只需30秒 · 无需付款",
    name: "你的名字",
    namePh: "名字",
    email: "邮箱",
    emailPh: "your@email.com",
    gender: "你的性别",
    male: "男", female: "女", other: "其他",
    arrival: "你什么时候到首尔？",
    contact: "我们怎么联系你？",
    contactPh: "你的@账号或手机号",
    vibeTitle: "你喜欢什么风格？",
    vibeSub: "(可多选)",
    vibes: ["悠闲咖啡", "酒吧夜生活", "韩剧打卡地", "街头美食", "K-Beauty购物", "本地隐藏景点"],
    matePref: "Mate性别偏好",
    sameGender: "同性", noPref: "无偏好",
    submit: "认识你的YUKO →",
    sending: "提交中...",
    micro: "只需30秒 · 无需付款",
  },
};

const vibeValues = ["chill-cafes", "bar-hopping", "kdrama-spots", "street-food", "kbeauty", "hidden-local"];

export default function ApplyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const applyBg = "/photos/apply-bg.jpg";

  useEffect(() => {
    const match = document.cookie.match(/locale=(en|ja|zh)/);
    if (match) setLocale(match[1] as Locale);
  }, []);

  const l = t[locale];

  // Track /apply page view
  useEffect(() => {
    track("ViewContent", { content_name: "apply_form" });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const vibes: string[] = [];
    fd.getAll("vibes").forEach((v) => vibes.push(v as string));

    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      gender: fd.get("gender"),
      arrival_date: fd.get("arrival_date"),
      contact_method: fd.get("contact_method"),
      contact_handle: fd.get("contact_handle"),
      vibes,
      gender_preference: fd.get("gender_preference"),
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // Track successful lead
      track("Lead", { content_name: "apply_submit", value: 0, currency: "USD" });
      router.push("/apply/thanks");
    } catch {
      // Track even on catch (no-cors always lands here but submission works)
      track("Lead", { content_name: "apply_submit", value: 0, currency: "USD" });
      router.push("/apply/thanks");
    }
  }

  return (
    <main className="min-h-screen bg-obsidian text-off-white">
      <section className="min-h-screen py-10 md:py-20 px-4 md:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('${applyBg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/70 to-obsidian" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <a
              href={locale === "en" ? "/" : `/${locale}`}
              className="text-sm text-white/60 hover:text-neon transition-colors"
            >
              {l.back}
            </a>
            <div className="font-caveat text-3xl tracking-tight">
              y<span className="text-neon">u</span>ko
              <span className="text-off-white">.</span>
            </div>
          </div>

          <div className="text-center">
            <div className="font-caveat text-5xl md:text-7xl text-neon mb-2">
              {l.title}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {l.heading}
            </h2>
            <p className="text-white/60 text-sm md:text-base mb-10">
              {l.sub}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="text-left space-y-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/60 tracking-widest uppercase mb-2 font-bold">
                  {l.name}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={l.namePh}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-off-white placeholder:text-white/40 focus:outline-none focus:border-neon transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/60 tracking-widest uppercase mb-2 font-bold">
                  {l.email}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={l.emailPh}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-off-white placeholder:text-white/40 focus:outline-none focus:border-neon transition-colors"
                />
              </div>
            </div>

            {/* Gender + Arrival */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/60 tracking-widest uppercase mb-2 font-bold">
                  {l.gender}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "male", label: l.male },
                    { value: "female", label: l.female },
                    { value: "other", label: l.other },
                  ].map((g) => (
                    <label key={g.value} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g.value}
                        required
                        className="peer sr-only"
                      />
                      <span className="inline-flex items-center min-h-[44px] px-5 py-2 rounded-full border text-sm font-medium transition-all bg-white/10 border-white/15 text-white/80 peer-checked:bg-neon peer-checked:text-obsidian peer-checked:border-neon peer-checked:font-bold hover:border-white/30">
                        {g.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/60 tracking-widest uppercase mb-2 font-bold">
                  {l.arrival}
                </label>
                <input
                  type="date"
                  name="arrival_date"
                  lang="en"
                  required
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-off-white focus:outline-none focus:border-neon transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Contact method */}
            <div>
              <label className="block text-xs text-white/60 tracking-widest uppercase mb-2 font-bold">
                {l.contact}
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  { value: "email", label: "Email" },
                  { value: "instagram", label: "Instagram" },
                  { value: "whatsapp", label: "WhatsApp" },
                  { value: "kakaotalk", label: "KakaoTalk" },
                  { value: "line", label: "Line" },
                  { value: "other", label: l.other },
                ].map((c) => (
                  <label key={c.value} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="contact_method"
                      value={c.value}
                      required
                      className="peer sr-only"
                    />
                    <span className="inline-flex items-center min-h-[44px] px-4 py-2 rounded-full border text-sm font-medium transition-all bg-white/10 border-white/15 text-white/80 peer-checked:bg-neon peer-checked:text-obsidian peer-checked:border-neon peer-checked:font-bold hover:border-white/30">
                      {c.label}
                    </span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                name="contact_handle"
                required
                placeholder={l.contactPh}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-off-white placeholder:text-white/40 focus:outline-none focus:border-neon transition-colors"
              />
            </div>

            {/* Vibe chips */}
            <div>
              <label className="block text-xs text-white/60 tracking-widest uppercase mb-3 font-bold">
                {l.vibeTitle}{" "}
                <span className="normal-case tracking-normal font-normal">
                  {l.vibeSub}
                </span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {vibeValues.map((value, i) => (
                  <label key={value} className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      name="vibes"
                      value={value}
                      className="peer sr-only"
                    />
                    <span className="inline-flex items-center min-h-[44px] px-4 py-2 rounded-full border text-sm font-medium transition-all bg-white/10 border-white/15 text-white/80 peer-checked:bg-neon peer-checked:text-obsidian peer-checked:border-neon peer-checked:font-bold hover:border-white/30">
                      {l.vibes[i]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mate gender preference */}
            <div>
              <label className="block text-xs text-white/60 tracking-widest uppercase mb-3 font-bold">
                {l.matePref}
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "same-gender", label: l.sameGender, icon: "👤" },
                  { value: "no-preference", label: l.noPref, icon: "👥" },
                ].map((opt) => (
                  <label key={opt.value} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="gender_preference"
                      value={opt.value}
                      className="peer sr-only"
                    />
                    <span className="inline-flex items-center min-h-[44px] px-5 py-2 rounded-full border text-sm font-medium transition-all bg-white/10 border-white/15 text-white/80 peer-checked:bg-neon peer-checked:text-obsidian peer-checked:border-neon peer-checked:font-bold hover:border-white/30">
                      {opt.icon} {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-neon text-obsidian py-4 rounded-full font-bold text-base hover:scale-[1.02] transition-transform shadow-[0_8px_32px_rgba(243,243,26,0.3)] disabled:opacity-60 disabled:hover:scale-100"
            >
              {submitting ? l.sending : l.submit}
            </button>
            <p className="text-center text-xs text-white/50 -mt-2">
              {l.micro}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
