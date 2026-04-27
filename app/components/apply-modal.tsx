"use client";

import { useState, useEffect } from "react";
import { track, fireLead } from "@/lib/track";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3aBcoWlv6iQPYSClCYbwVJFfqB3AN6eZbpLoJ0e0ejYYw1L96mDbYzy1eXbziASnJ/exec";

type Locale = "en" | "ja" | "zh";
type ContactMethod = "" | "instagram" | "whatsapp" | "kakaotalk" | "line";
type WhenType = "" | "date" | "month" | "unsure";
type GroupSize = "" | "solo" | "duo";

const t = {
  en: {
    step1: "Tell us about you",
    namePh: "First name",
    emailPh: "Email address",
    contactLabel: "Best way to chat?",
    handlePh: {
      instagram: "@your_ig_handle",
      whatsapp: "+1 555 555 5555",
      kakaotalk: "Your KakaoTalk ID",
      line: "Your LINE ID",
      "": "Your handle / number",
    } as Record<ContactMethod, string>,
    contacts: ["Instagram", "WhatsApp", "KakaoTalk", "LINE"],
    step2: "Your Seoul trip",
    whenLabel: "When are you in Seoul?",
    whenDate: "I know the date",
    whenMonth: "Just the month",
    whenUnsure: "Not sure yet",
    groupLabel: "Solo or with a friend?",
    groupSolo: "Just me",
    groupDuo: "+1 friend",
    step3: "Your vibes",
    step3sub: "Tap all that excite you",
    vibes: ["Chill cafes", "Bar hopping", "K-drama spots", "Street food", "K-beauty", "Hidden spots", "Other"],
    otherPh: "Tell us what you love",
    next: "Next →",
    submit: "Meet your YUKO →",
    sending: "Matching...",
    done: "You're in!",
    doneSub: "Your YUKO mate will reach out within 24 hours.",
    doneInsta: "Follow us on Instagram",
    doneContact: "Questions? Reach us at",
  },
  ja: {
    step1: "あなたについて",
    namePh: "お名前",
    emailPh: "メールアドレス",
    contactLabel: "連絡しやすい方法は?",
    handlePh: {
      instagram: "@あなたのIG",
      whatsapp: "+81 90 1234 5678",
      kakaotalk: "KakaoTalk ID",
      line: "LINE ID",
      "": "ID / 電話番号",
    } as Record<ContactMethod, string>,
    contacts: ["Instagram", "WhatsApp", "KakaoTalk", "LINE"],
    step2: "ソウル旅行について",
    whenLabel: "いつソウルに?",
    whenDate: "日付決まってる",
    whenMonth: "月だけ決まってる",
    whenUnsure: "まだ未定",
    groupLabel: "ひとり? お友達と?",
    groupSolo: "ひとり",
    groupDuo: "+1 お友達",
    step3: "あなたのムード",
    step3sub: "気になるもの全部タップ",
    vibes: ["カフェ巡り", "バーホッピング", "Kドラマ", "ストリートフード", "Kビューティー", "隠れスポット", "その他"],
    otherPh: "やりたいことを教えて",
    next: "次へ →",
    submit: "YUKOに会う →",
    sending: "マッチング中...",
    done: "申し込み完了！",
    doneSub: "24時間以内にYUKOメイトからご連絡します。",
    doneInsta: "Instagramをフォロー",
    doneContact: "ご質問はこちらへ",
  },
  zh: {
    step1: "告诉我们你是谁",
    namePh: "你的名字",
    emailPh: "邮箱",
    contactLabel: "最方便的联系方式?",
    handlePh: {
      instagram: "@你的IG账号",
      whatsapp: "+86 138 0000 0000",
      kakaotalk: "KakaoTalk ID",
      line: "LINE ID",
      "": "账号 / 手机号",
    } as Record<ContactMethod, string>,
    contacts: ["Instagram", "WhatsApp", "KakaoTalk", "LINE"],
    step2: "你的首尔之行",
    whenLabel: "什么时候来首尔?",
    whenDate: "我知道日期",
    whenMonth: "只知道月份",
    whenUnsure: "还没确定",
    groupLabel: "一个人还是和朋友?",
    groupSolo: "一个人",
    groupDuo: "+1 朋友",
    step3: "你的喜好",
    step3sub: "选所有感兴趣的",
    vibes: ["悠闲咖啡", "酒吧夜生活", "韩剧打卡", "街头美食", "K-Beauty", "隐藏景点", "其他"],
    otherPh: "告诉我们你喜欢什么",
    next: "下一步 →",
    submit: "认识你的YUKO →",
    sending: "匹配中...",
    done: "申请成功！",
    doneSub: "你的YUKO伙伴会在24小时内联系你。",
    doneInsta: "关注我们的Instagram",
    doneContact: "有问题请联系",
  },
};

const vibeValues = ["chill-cafes", "bar-hopping", "kdrama-spots", "street-food", "kbeauty", "hidden-local", "other"];
const contactValues: Exclude<ContactMethod, "">[] = ["instagram", "whatsapp", "kakaotalk", "line"];

const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

export default function ApplyModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("instagram");
  const [contactHandle, setContactHandle] = useState("");
  const [whenType, setWhenType] = useState<WhenType>("");
  const [whenValue, setWhenValue] = useState("");
  const [groupSize, setGroupSize] = useState<GroupSize>("");
  const [vibes, setVibes] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
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
    setTimeout(() => {
      setStep(0);
      setName("");
      setEmail("");
      setContactMethod("instagram");
      setContactHandle("");
      setWhenType("");
      setWhenValue("");
      setGroupSize("");
      setVibes([]);
      setOtherText("");
      setSubmitting(false);
      setDone(false);
    }, 300);
  }

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

    const finalVibes = vibes.includes("other")
      ? [...vibes.filter((v) => v !== "other"), `other: ${otherText}`]
      : vibes;

    const payload = {
      name,
      email,
      ig_handle: contactMethod === "instagram" ? cleanedHandle : "",
      arrival_when_type: whenType,
      arrival_date: whenType === "unsure" ? "" : whenValue,
      group_size: groupSize,
      vibes: finalVibes,
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // no-cors always catches but submission works
    }

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

        <div className="px-6 py-8 md:px-10">
          {/* STEP 0: Name + Email + Contact */}
          {!done && step === 0 && (
            <div className="animate-fadeIn space-y-6">
              <h1 className="text-center font-caveat text-4xl md:text-5xl text-neon">{l.step1}</h1>

              <div className="space-y-4">
                <input
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={l.namePh}
                  className="w-full text-center text-xl md:text-2xl bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={l.emailPh}
                  className="w-full text-center text-xl md:text-2xl bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-3 pt-1">
                <p className="text-center text-white/70 text-sm font-medium">{l.contactLabel}</p>
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
                  placeholder={l.handlePh[contactMethod] || l.handlePh[""]}
                  className="w-full text-center text-lg md:text-xl bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => step0Valid && setStep(1)}
                  disabled={!step0Valid}
                  className="bg-neon text-obsidian px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                >
                  {l.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 1: When + Group */}
          {!done && step === 1 && (
            <div className="animate-fadeIn space-y-7">
              <h1 className="text-center font-caveat text-4xl md:text-5xl text-neon">{l.step2}</h1>

              {/* When */}
              <div className="space-y-3">
                <p className="text-center text-white/70 text-sm font-medium">{l.whenLabel}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {([
                    { v: "date", label: l.whenDate },
                    { v: "month", label: l.whenMonth },
                    { v: "unsure", label: l.whenUnsure },
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
                    className="w-full text-center text-lg bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                  />
                )}
                {whenType === "month" && (
                  <input
                    type="month"
                    value={whenValue}
                    onChange={(e) => setWhenValue(e.target.value)}
                    className="w-full text-center text-lg bg-transparent border-b-2 border-white/20 focus:border-neon py-3 text-off-white placeholder:text-white/30 focus:outline-none transition-colors"
                  />
                )}
              </div>

              {/* Group */}
              <div className="space-y-3">
                <p className="text-center text-white/70 text-sm font-medium">{l.groupLabel}</p>
                <div className="flex justify-center gap-2">
                  {([
                    { v: "solo", label: l.groupSolo },
                    { v: "duo", label: l.groupDuo },
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

              <div className="text-center pt-1">
                <button
                  onClick={() => step1Valid && setStep(2)}
                  disabled={!step1Valid}
                  className="bg-neon text-obsidian px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                >
                  {l.next}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Vibes */}
          {!done && step === 2 && (
            <div className="animate-fadeIn text-center space-y-6">
              <div>
                <h1 className="font-caveat text-4xl md:text-5xl text-neon">{l.step3}</h1>
                <p className="text-white/60 mt-2 text-sm">{l.step3sub}</p>
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
                onClick={handleSubmit}
                disabled={!step2Valid || submitting}
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
