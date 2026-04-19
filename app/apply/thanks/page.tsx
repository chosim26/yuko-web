"use client";

import { useState, useEffect } from "react";

type Locale = "en" | "ja" | "zh";

const t = {
  en: {
    title: "you're in!",
    heading: "We got your application.",
    sub: "Your YUKO mate will reach out within 24 hours through the contact method you chose.",
    highlight: "Get ready for a Seoul you've never seen.",
    next: "What happens next",
    step1: "We review your vibe and match you with the perfect mate",
    step2: "Your mate reaches out via your preferred contact",
    step3: "You chat, plan your day, and get excited",
    back: "← Back to YUKO",
  },
  ja: {
    title: "申し込み完了！",
    heading: "申し込みを受け付けました。",
    sub: "あなたのYUKOメイトが24時間以内にご希望の連絡方法でご連絡します。",
    highlight: "まだ見たことのないソウルへ、準備してね。",
    next: "次のステップ",
    step1: "あなたのバイブに合ったメイトをマッチング",
    step2: "メイトがご希望の連絡先に連絡",
    step3: "チャットして、一日の計画を立てよう",
    back: "← YUKOに戻る",
  },
  zh: {
    title: "申请成功！",
    heading: "我们收到了你的申请。",
    sub: "你的YUKO伙伴会在24小时内通过你选择的联系方式联系你。",
    highlight: "准备好迎接一个全新的首尔吧。",
    next: "接下来会怎样",
    step1: "我们根据你的风格匹配最合适的伙伴",
    step2: "伙伴通过你选择的方式联系你",
    step3: "聊天、规划你的一天、开始期待吧",
    back: "← 返回YUKO",
  },
};

export default function ThanksPage() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const match = document.cookie.match(/locale=(en|ja|zh)/);
    if (match) setLocale(match[1] as Locale);
  }, []);

  const l = t[locale];

  return (
    <main className="min-h-screen bg-obsidian text-off-white flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="font-caveat text-[80px] md:text-[120px] leading-none mb-4">
          y<span className="text-neon">u</span>ko<span className="text-off-white">.</span>
        </div>

        <div className="font-caveat text-4xl md:text-5xl text-neon mb-6">
          {l.title}
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          {l.heading}
        </h1>

        <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
          {l.sub}
          <br />
          <span className="text-neon/80 font-medium">{l.highlight}</span>
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 text-left space-y-3">
          <div className="text-xs text-white/50 tracking-widest uppercase font-bold mb-3">
            {l.next}
          </div>
          <div className="flex items-start gap-3">
            <span className="font-caveat text-3xl text-neon leading-none">1</span>
            <p className="text-sm text-white/80">{l.step1}</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-caveat text-3xl text-neon leading-none">2</span>
            <p className="text-sm text-white/80">{l.step2}</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-caveat text-3xl text-neon leading-none">3</span>
            <p className="text-sm text-white/80">{l.step3}</p>
          </div>
        </div>

        <a
          href={locale === "en" ? "/" : `/${locale}`}
          className="inline-block bg-neon text-obsidian px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform"
        >
          {l.back}
        </a>
      </div>
    </main>
  );
}
