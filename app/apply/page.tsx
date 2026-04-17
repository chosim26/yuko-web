"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3aBcoWlv6iQPYSClCYbwVJFfqB3AN6eZbpLoJ0e0ejYYw1L96mDbYzy1eXbziASnJ/exec";

export default function ApplyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const applyBg = "/photos/apply-bg.jpg";

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
      router.push("/apply/thanks");
    } catch {
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
              href="/"
              className="text-sm text-white/60 hover:text-neon transition-colors"
            >
              ← Back
            </a>
            <div className="font-caveat text-3xl tracking-tight">
              y<span className="text-neon">u</span>ko
              <span className="text-off-white">.</span>
            </div>
          </div>

          <div className="text-center">
            <div className="font-caveat text-5xl md:text-7xl text-neon mb-2">
              apply now
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Your Seoul starts here.
            </h2>
            <p className="text-white/60 text-sm md:text-base mb-10">
              Takes 30 seconds · No payment required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="text-left space-y-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/60 tracking-widest uppercase mb-2 font-bold">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="First name"
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-off-white placeholder:text-white/40 focus:outline-none focus:border-neon transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/60 tracking-widest uppercase mb-2 font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-off-white placeholder:text-white/40 focus:outline-none focus:border-neon transition-colors"
                />
              </div>
            </div>

            {/* Gender + Arrival */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/60 tracking-widest uppercase mb-2 font-bold">
                  Your gender
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
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
                  When do you land in Seoul?
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
                How should we reach you?
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  { value: "email", label: "Email" },
                  { value: "instagram", label: "Instagram" },
                  { value: "whatsapp", label: "WhatsApp" },
                  { value: "kakaotalk", label: "KakaoTalk" },
                  { value: "line", label: "Line" },
                  { value: "other", label: "Other" },
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
                placeholder="Your @handle or number"
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 text-off-white placeholder:text-white/40 focus:outline-none focus:border-neon transition-colors"
              />
            </div>

            {/* Vibe chips */}
            <div>
              <label className="block text-xs text-white/60 tracking-widest uppercase mb-3 font-bold">
                What&apos;s your vibe?{" "}
                <span className="normal-case tracking-normal font-normal">
                  (pick any)
                </span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { value: "chill-cafes", label: "Chill cafes" },
                  { value: "bar-hopping", label: "Bar hopping" },
                  { value: "kdrama-spots", label: "K-drama spots" },
                  { value: "street-food", label: "Street food crawl" },
                  { value: "kbeauty", label: "K-beauty shopping" },
                  { value: "hidden-local", label: "Hidden local spots" },
                ].map((vibe) => (
                  <label key={vibe.value} className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      name="vibes"
                      value={vibe.value}
                      className="peer sr-only"
                    />
                    <span className="inline-flex items-center min-h-[44px] px-4 py-2 rounded-full border text-sm font-medium transition-all bg-white/10 border-white/15 text-white/80 peer-checked:bg-neon peer-checked:text-obsidian peer-checked:border-neon peer-checked:font-bold hover:border-white/30">
                      {vibe.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mate gender preference */}
            <div>
              <label className="block text-xs text-white/60 tracking-widest uppercase mb-3 font-bold">
                Mate gender preference
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "same-gender", label: "Same gender" },
                  { value: "no-preference", label: "No preference" },
                ].map((opt) => (
                  <label key={opt.value} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="gender_preference"
                      value={opt.value}
                      className="peer sr-only"
                    />
                    <span className="inline-flex items-center min-h-[44px] px-5 py-2 rounded-full border text-sm font-medium transition-all bg-white/10 border-white/15 text-white/80 peer-checked:bg-neon peer-checked:text-obsidian peer-checked:border-neon peer-checked:font-bold hover:border-white/30">
                      {opt.value === "same-gender" ? "👤 " : "👥 "}
                      {opt.label}
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
              {submitting ? "Sending..." : "Meet your YUKO →"}
            </button>
            <p className="text-center text-xs text-white/50 -mt-2">
              Takes 30 seconds · No payment required
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
