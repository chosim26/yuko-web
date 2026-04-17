import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're in — YUKO",
};

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-obsidian text-off-white flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="font-caveat text-[80px] md:text-[120px] leading-none mb-4">
          y<span className="text-neon">u</span>ko<span className="text-off-white">.</span>
        </div>

        <div className="font-caveat text-4xl md:text-5xl text-neon mb-6">
          you're in!
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          We got your application.
        </h1>

        <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
          Your YUKO mate will reach out within 24 hours
          <br className="hidden md:inline" /> through the contact method you chose.
          <br />
          <span className="text-neon/80 font-medium">Get ready for a Seoul you've never seen.</span>
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 text-left space-y-3">
          <div className="text-xs text-white/50 tracking-widest uppercase font-bold mb-3">
            What happens next
          </div>
          <div className="flex items-start gap-3">
            <span className="font-caveat text-3xl text-neon leading-none">1</span>
            <p className="text-sm text-white/80">We review your vibe and match you with the perfect mate</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-caveat text-3xl text-neon leading-none">2</span>
            <p className="text-sm text-white/80">Your mate reaches out via your preferred contact</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-caveat text-3xl text-neon leading-none">3</span>
            <p className="text-sm text-white/80">You chat, plan your day, and get excited</p>
          </div>
        </div>

        <a
          href="/"
          className="inline-block bg-neon text-obsidian px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform"
        >
          ← Back to YUKO
        </a>
      </div>
    </main>
  );
}
