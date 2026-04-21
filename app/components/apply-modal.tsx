"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { track } from "@/lib/track";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3aBcoWlv6iQPYSClCYbwVJFfqB3AN6eZbpLoJ0e0ejYYw1L96mDbYzy1eXbziASnJ/exec";

type Locale = "en" | "ja" | "zh";

const t = {
  en: {
    step1: "What's your name?",
    step1ph: "First name",
    step2: "What's your vibe?",
    step2sub: "Tap all that excite you",
    step3: "How do we reach you?",
    step3ph: "Your @handle, email, or number",
    next: "Next →",
    submit: "Meet your YUKO →",
    sending: "Matching...",
    done: "You're in!",
    doneSub: "Your YUKO mate will reach out within 24 hours.",
    vibes: ["Chill cafes", "Bar hopping", "K-drama spots", "Street food", "K-beauty", "Hidden spots", "Other"],
    otherPh: "Tell us what you love",
    contacts: ["Email", "Instagram", "WhatsApp", "KakaoTalk", "Line"],
    press: "press Enter ↵",
    doneInsta: "Follow us on Instagram",
    doneContact: "Questions? Reach us at",
  },
  ja: {
    step1: "お名前は？",
    step1ph: "名前",
    step2: "どんな旅がしたい？",
    step2sub: "気になるもの全部タップ",
    step3: "連絡方法を教えて",
    step3ph: "@ハンドル、メール、電話番号",
    next: "次へ →",
    submit: "YUKOに会う →",
    sending: "マッチング中...",
    done: "申し込み完了！",
    doneSub: "24時間以内にYUKOメイトからご連絡します。",
    vibes: ["カフェ巡り", "バーホッピング", "Kドラマ", "ストリートフード", "Kビューティー", "隠れスポット", "その他"],
    otherPh: "やりたいことを教えて",
    contacts: ["メール", "Instagram", "WhatsApp", "KakaoTalk", "Line"],
    press: "Enter ↵",
    doneInsta: "Instagramをフォロー",
    doneContact: "ご質問はこちらへ",
  },
  zh: {
    step1: "你叫什么名字？",
    step1ph: "名字",
    step2: "你想怎么玩？",
    step2sub: "选所有感兴趣的",
    step3: "我们怎么联系你？",
    step3ph: "@账号、邮箱或手机号",
    next: "下一步 →",
    submit: "认识你的YUKO →",
    sending: "匹配中...",
    done: "申请成功！",
    doneSub: "你的YUKO伙伴会在24小时内联系你。",
    vibes: ["悠闲咖啡", "酒吧夜生活", "韩剧打卡", "街头美食", "K-Beauty", "隐藏景点", "其他"],
    otherPh: "告诉我们你喜欢什么",
    contacts: ["邮箱", "Instagram", "WhatsApp", "KakaoTalk", "Line"],
    press: "Enter ↵",
    doneInsta: "关注我们的Instagram",
    doneContact: "有问题请联系",
  },
};

const vibeValues = ["chill-cafes", "bar-hopping", "kdrama-spots", "street-food", "kbeauty", "hidden-local", "other"];
const contactValues = ["email", "instagram", "whatsapp", "kakaotalk", "line"];

export default function ApplyModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [vibes, setVibes] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [contactHandle, setContactHandle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const match = document.cookie.match(/locale=(en|ja|zh)/);
    if (match) setLocale(match[1] as Locale);
  }, []);

  // Listen for #apply hash
  useEffect(() => {
    function onHash() {
      if (window.location.hash === "#apply") {
        setOpen(true);
        track("ViewContent", { content_name: "apply_modal" });
      }
    }
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function close() {
    setOpen(false);
    history.replaceState(null, "", window.location.pathname);
    // Reset for next open
    setTimeout(() => {
      setStep(0);
      setName("");
      setVibes([]);
      setContactMethod("");
      setContactHandle("");
      setOtherText("");
      setSubmitting(false);
      setDone(false);
    }, 300);
  }

  const l = t[locale];

  function toggleVibe(v: string) {
    setVibes((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && step === 0 && name.trim()) {
      e.preventDefault();
      setStep(1);
    }
  }

  async function handleSubmit() {
    if (!contactMethod || !contactHandle.trim()) return;
    setSubmitting(true);

    const payload = {
      name,
      email: contactMethod === "email" ? contactHandle : "",
      gender: "",
      arrival_date: "",
      contact_method: contactMethod,
      contact_handle: contactHandle,
      vibes: vibes.includes("other") ? [...vibes.filter(v => v !== "other"), `other: ${otherText}`] : vibes,
      gender_preference: "",
      utm_source: sessionStorage.getItem("utm_source") || "",
      utm_medium: sessionStorage.getItem("utm_medium") || "",
      utm_campaign: sessionStorage.getItem("utm_campaign") || "",
      utm_content: sessionStorage.getItem("utm_content") || "",
      landing_url: sessionStorage.getItem("landing_url") || "",
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // no-cors always catches but submission works
    }

    track("Lead", { content_name: "apply_submit", value: 0, currency: "USD" });
    setSubmitting(false);
    setDone(true);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />

      {/* Bottom sheet */}
      <div className="relative z-10 w-full md:max-w-lg bg-obsidian border-t md:border border-white/10 md:rounded-3xl overflow-hidden animate-slideUp max-h-[85vh] overflow-y-auto">
        {/* Close button */}
        <button onClick={close} className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl z-20">
          ✕
        </button>

        {/* Progress dots */}
        {!done && (
          <div className="flex items-center justify-center gap-2 pt-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === step ? "w-8 bg-neon" : i < step ? "w-4 bg-neon/60" : "w-4 bg-white/20"
                }`}
              />
            ))}
          </div>
        )}

        <div className="px-6 py-10 md:px-10">
          {/* STEP 1 */}
          {!done && step === 0 && (
            <div className="animate-fadeIn text-center space-y-8">
              <h1 className="font-caveat text-4xl md:text-6xl text-neon">{l.step1}</h1>
              <input
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={l.step1ph}
                className="w-full text-center text-2xl md:text-3xl bg-transparent border-b-2 border-white/20 focus:border-neon py-4 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
              />
              <div className="space-y-3">
                <button
                  onClick={() => name.trim() && setStep(1)}
                  disabled={!name.trim()}
                  className="bg-neon text-obsidian px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                >
                  {l.next}
                </button>
                <div className="text-xs text-white/40">{l.press}</div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {!done && step === 1 && (
            <div className="animate-fadeIn text-center space-y-6">
              <div>
                <h1 className="font-caveat text-4xl md:text-6xl text-neon">{l.step2}</h1>
                <p className="text-white/60 mt-2 text-sm">{l.step2sub}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5">
                {vibeValues.map((v, i) => (
                  <button
                    key={v}
                    onClick={() => toggleVibe(v)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all hover:scale-105 ${
                      vibes.includes(v)
                        ? "bg-neon text-obsidian border-neon font-bold scale-105"
                        : "bg-white/5 text-white/80 border-white/15 hover:border-white/30"
                    }`}
                  >
                    {l.vibes[i]}
                  </button>
                ))}
              </div>
              {vibes.includes("other") && (
                <input
                  type="text"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder={l.otherPh}
                  className="w-full text-center text-lg bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                />
              )}
              <button
                onClick={() => setStep(2)}
                disabled={vibes.length === 0}
                className="bg-neon text-obsidian px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100"
              >
                {l.next}
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {!done && step === 2 && (
            <div className="animate-fadeIn text-center space-y-6">
              <h1 className="font-caveat text-4xl md:text-6xl text-neon">{l.step3}</h1>
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
                autoFocus
                value={contactHandle}
                onChange={(e) => setContactHandle(e.target.value)}
                placeholder={l.step3ph}
                className="w-full text-center text-lg md:text-xl bg-transparent border-b-2 border-white/20 focus:border-neon py-4 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={!contactMethod || !contactHandle.trim() || submitting}
                className="bg-neon text-obsidian px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100 shadow-[0_8px_32px_rgba(243,243,26,0.3)]"
              >
                {submitting ? l.sending : l.submit}
              </button>
            </div>
          )}

          {/* DONE */}
          {done && (
            <div className="animate-fadeIn text-center space-y-6 py-6">
              <div className="font-caveat text-6xl md:text-7xl text-neon">{l.done}</div>
              <p className="text-white/70 text-base leading-relaxed">{l.doneSub}</p>
              <div className="flex flex-col items-center gap-3 pt-4">
                <a
                  href="https://www.instagram.com/yuko_seoul/"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:border-neon/50 px-6 py-3 rounded-full text-sm font-medium text-off-white hover:text-neon transition-all"
                >
                  📸 {l.doneInsta} →
                </a>
                <p className="text-xs text-white/50">
                  {l.doneContact}{" "}
                  <a href="mailto:youxo@chosim.me" className="text-neon/80 hover:text-neon underline">
                    youxo@chosim.me
                  </a>
                </p>
              </div>
              <button
                onClick={close}
                className="text-sm text-white/50 hover:text-neon transition-colors underline pt-2"
              >
                ← Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
