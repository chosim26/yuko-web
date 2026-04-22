import ScrollReveal from "./components/scroll-reveal";
import StickyCta from "./components/sticky-cta";
import LanguageSwitcher from "./components/language-switcher";
import ApplyModal from "./components/apply-modal";

export default function Home() {
  // 9-image slideshow (hero). 4.2s × 9 = 37.8s loop with crossfade.
  // `pos` = CSS background-position (which part of the image stays in frame).
  const heroSlides = [
    { src: "/photos/namsan-real.jpg",            label: "Namsan Tower",         sub: "남산타워 · Seoul",          pos: "center" },
    { src: "/photos/g-oliveyoung-2.jpg",       label: "Olive Young",          sub: "K-Beauty",                  pos: "center" },
    { src: "/photos/g-kpop-3.jpg",             label: "K-Pop Concert",        sub: "World Cup Stadium",         pos: "center" },
    { src: "/photos/g-seongsu-3.jpg",          label: "Seongsu Pop-up",       sub: "성수 · Seoul My Soul",      pos: "center" },
    { src: "/photos/u-02-hongdae-walk.png",    label: "Hongdae",              sub: "홍대 · Night walk",         pos: "center" },
    { src: "/photos/g-tteok-1.jpg",            label: "Tteokbokki",           sub: "떡볶이 · Pojangmacha",      pos: "center" },
    { src: "/photos/u-03-bbq-cheers.png",      label: "Samgyeopsal",          sub: "삼겹살 · Soju cheers",      pos: "center" },
    { src: "/photos/u-01-gyeongbokgung.png",   label: "Gyeongbokgung",        sub: "경복궁 · Palace",           pos: "center" },
    { src: "/photos/u-04-hangang-fountain.png",label: "Banpo Rainbow",        sub: "반포대교 · Fountain",       pos: "center" },
  ];

  const chatBg = "/photos/01-seoul-night.jpg";
  const storyBg = "/photos/founder-story-bg.jpg";
  const waitlistBg = "/photos/u-04-hangang-fountain.png";
  const founderPhoto = "/photos/founder.jpg";
  const soyeonPhoto = "/photos/soyeon.png";

  return (
    <main className="min-h-screen bg-obsidian text-off-white pb-20 md:pb-0">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-obsidian/70 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-caveat text-3xl tracking-tight" style={{ filter: "drop-shadow(0 0 8px rgba(243,243,26,0.3))" }}>
            y<span className="text-neon">u</span>ko<span className="text-neon logo-dot">.</span>
          </a>
          <div className="flex items-center gap-3">
            <LanguageSwitcher current="en" />
            <a
              href="#apply"
              className="bg-neon text-obsidian px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform"
            >
              Meet your YUKO
            </a>
          </div>
        </div>
      </nav>

      {/* HERO — 9-image slideshow with location labels */}
      <section
        id="top"
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        {/* Slideshow background layer */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className="hero-slide absolute inset-0 bg-cover"
              style={{
                backgroundImage: `url('${slide.src}')`,
                backgroundPosition: slide.pos,
                animationDelay: `${i * 4.2}s`,
                animationDuration: `${heroSlides.length * 4.2}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/75 via-obsidian/55 to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-obsidian/50" />

        {/* Neon ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] bg-neon/10 rounded-full blur-3xl" />

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-24 md:py-32">
          <div className="font-caveat text-[72px] md:text-[200px] leading-none tracking-tight mb-1 md:mb-2" style={{ textShadow: "0 0 40px rgba(243,243,26,0.15)" }}>
            y<span className="text-neon">u</span>ko<span className="text-neon logo-dot">.</span>
          </div>
          <div className="font-caveat text-2xl md:text-5xl text-neon mt-3 md:mt-4 mb-8 md:mb-14 soft-float">
            Your friend is here.
          </div>
          <h1 className="text-xl md:text-4xl font-medium leading-tight text-off-white mb-4 md:mb-5 px-2">
            If you had a friend in Korea,
            <br />
            what would your trip look like?
          </h1>
          <p className="text-sm md:text-lg text-white/70 max-w-xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
            2 days before you land, a Korean peer your age
            <br className="hidden md:inline" /> starts planning your day — with you.
          </p>
          <div className="mb-8 md:mb-10">
            <a
              href="#apply"
              className="inline-block bg-neon text-obsidian px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base shadow-[0_8px_32px_rgba(243,243,26,0.35)] hover:scale-105 transition-transform"
            >
              Meet your YUKO →
            </a>
          </div>
          <div className="text-xs md:text-sm text-white/70 tracking-wide">
            Verified peers&nbsp;&nbsp;·&nbsp;&nbsp;Pre-trip chat&nbsp;&nbsp;·&nbsp;&nbsp;Custom day
          </div>
        </div>

        {/* Location label — synced with slideshow */}
        <div className="absolute bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 z-20 pointer-events-none">
          <div className="relative h-[52px] w-[260px]">
            {heroSlides.map((slide, i) => (
              <div
                key={i}
                className="hero-slide absolute inset-0 bg-obsidian/60 backdrop-blur-md border border-neon/30 rounded-full px-5 py-2.5 flex items-center gap-2"
                style={{
                  animationDelay: `${i * 4.2}s`,
                  animationDuration: `${heroSlides.length * 4.2}s`,
                  opacity: 0,
                }}
              >
                <span className="text-neon text-xs">📍</span>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-off-white">{slide.label}</span>
                  <span className="text-[10px] text-white/60 tracking-wider uppercase">{slide.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:block absolute bottom-10 right-8 text-neon/60 text-xs tracking-widest animate-bounce">
          SCROLL ↓
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-8 px-6 border-t border-b border-white/5 bg-obsidian-soft/40 overflow-hidden">
        <ScrollReveal direction="fade">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-white/60 tracking-widest uppercase">
            <span>No group tour</span>
            <span className="text-neon/40">✦</span>
            <span>No flag</span>
            <span className="text-neon/40">✦</span>
            <span>No strangers</span>
            <span className="text-neon/40">✦</span>
            <span className="text-neon font-bold">Just a friend</span>
          </div>
        </ScrollReveal>
      </section>

      {/* SOUND FAMILIAR? */}
      <section className="py-14 md:py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-10">
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1">sound familiar?</div>
          </ScrollReveal>
          <div className="space-y-3">
            {[
              "You didn't fly 10 hours to do what every tourist does",
              "Think about your own city — do YOU go to the tourist spots? Exactly.",
              "You know you're paying tourist price but have no idea how to avoid it",
              "You saw those YouTube vids of people traveling with a local friend. You wanted that.",
              "Every travel tiktoker makes it look easy. It's not.",
              "You know there's a Seoul beyond the tourist version. You just can't find it.",
            ].map((line, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 100}>
                <div
                  className="flex items-start gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-neon/30 rounded-xl px-5 py-4 transition-all"
                >
                  <span className="text-neon text-lg leading-none mt-0.5">→</span>
                  <span className="text-base md:text-lg text-off-white leading-snug">{line}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="#waitlist"
              className="text-neon text-sm font-bold tracking-wide hover:underline"
            >
              That's why we built YUKO ↓
            </a>
          </div>
        </div>
      </section>

      {/* PAIN POINTS — Tourist Seoul vs. The Seoul you'd live in */}
      <section className="py-14 md:py-24 px-4 md:px-6 border-t border-white/5 bg-gradient-to-b from-obsidian via-obsidian-soft/30 to-obsidian">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-10 md:mb-16">
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1 md:mb-2">two seouls</div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              The Seoul you visited.
              <br />
              <span className="text-neon italic font-fraunces">The Seoul you'd live in.</span>
            </h2>
            <p className="text-white/60 mt-6 max-w-2xl mx-auto text-base md:text-lg">
              Tourists see the top 10 list.
              <br />
              Locals live between the lines — in alleys, basements, 30-minute detours.
              <br className="hidden md:inline" />
              <span className="text-neon/80">YUKO gives you the second one.</span>
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {[
              {
                tourist: "Myeongdong. Gyeongbokgung. N-Tower. Same 3 spots as the 10 million tourists before you. You flew 10 hours for this?",
                local:   "A rooftop bar in Seongsu that opens 3 weeks a year. Your mate heard about it yesterday. You're on the list.",
              },
              {
                tourist: "Googled 'best Korean food'. Waited 2 hours. Sat down. It was mid. The table next to you? All tourists.",
                local:   "Second alley, no sign, plastic chairs. The owner nods at your mate. You eat what locals actually eat. ₩8,000.",
              },
              {
                tourist: "Walked past the same street 4 times. Didn't know the best café in Seoul was behind that parking lot.",
                local:   "Your mate texts you: 'trust me, turn left at the laundromat.' You find it. Zero tourists. Just vibes.",
              },
              {
                tourist: "Pointed at the menu. Smiled awkwardly. Got charged ₩18,000 for something locals pay ₩9,000 for.",
                local:   "Your mate orders in Korean. Gets the off-menu thing. The owner gives you a free side dish because you came with a local.",
              },
              {
                tourist: "K-pop fan event. The signup page? All Korean. You missed it by 2 days.",
                local:   "Your mate booked it before you even landed. And after? The café where fans actually hang — not the one on Google.",
              },
              {
                tourist: "Asked a stranger for a photo. Got your forehead and a trash can. That's your Seoul memory.",
                local:   "Your mate finds the golden hour spot, takes 40 shots, and you finally have a photo that looks like the trip felt.",
              },
            ].map((p, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 100}>
              <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-5 items-stretch">
                {/* Tourist */}
                <div className="bg-obsidian/60 border border-white/10 rounded-2xl p-5 md:p-6 relative">
                  <div className="text-[10px] tracking-widest uppercase text-white/40 font-bold mb-2">
                    Tourist Seoul
                  </div>
                  <p className="text-white/50 text-base md:text-lg italic font-fraunces leading-relaxed">
                    "{p.tourist}"
                  </p>
                </div>
                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center text-neon text-3xl font-bold">
                  →
                </div>
                <div className="flex md:hidden items-center justify-center text-neon text-xl">
                  ↓
                </div>
                {/* Local / Friend */}
                <div className="bg-gradient-to-br from-neon/15 via-neon/5 to-transparent border border-neon/40 rounded-2xl p-5 md:p-6 relative">
                  <div className="text-[10px] tracking-widest uppercase text-neon font-bold mb-2">
                    If you had a friend here
                  </div>
                  <p className="text-off-white text-base md:text-lg leading-relaxed font-medium">
                    {p.local}
                  </p>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Closing line */}
          <div className="text-center mt-16 space-y-3">
            <p className="font-caveat text-4xl md:text-5xl text-neon leading-tight">
              You don't need a tour.
              <br />
              You need a friend.
            </p>
            <p className="text-white/60 text-sm md:text-base italic font-fraunces">
              The Seoul locals actually live in. Not the one on the map.
            </p>
          </div>

          {/* CTA Repetition */}
          <div className="text-center mt-10">
            <a href="#apply" className="inline-block bg-neon text-obsidian px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Meet your YUKO →
            </a>
            <div className="text-xs text-white/50 mt-2">Takes 30 seconds</div>
          </div>
        </div>
      </section>

      {/* CUSTOM FOR YOU — the 2-day chat process */}
      <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-14">
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1 md:mb-2">built for you</div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Not a package.
              <br />
              <span className="text-neon italic font-fraunces">A day that starts with knowing you.</span>
            </h2>
            <p className="text-white/60 mt-6 max-w-2xl mx-auto">
              2 days before you land, your YUKO begins a conversation with you.
              <br />
              They learn what you love, what you hate, what you're here for.
              <br />
              <span className="text-neon/80">Then they build a day no one else could get.</span>
            </p>
          </ScrollReveal>

          {/* Chat mockup */}
          <ScrollReveal direction="up" delay={200}>
          <div className="max-w-2xl mx-auto bg-obsidian-soft/60 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs tracking-widest uppercase text-white/60">
                Chat with your YUKO · 2 days before you land
              </span>
            </div>

            <div className="space-y-2.5 text-[14px] md:text-[15px]">
              <div className="flex justify-end">
                <div className="bg-neon text-obsidian px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] font-medium">
                  hiii i land tuesday around 3 🛬
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%]">
                  omg ok!! u more into chill cafes or like late night bar vibes
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-neon text-obsidian px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] font-medium">
                  honestly both lol 🥲
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%]">
                  haha bet. do u watch any kdramas? also any food u cant eat?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-neon text-obsidian px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] font-medium">
                  YESSS lovely runner cafe plzzz 🫶 no spicy tho im weak
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%]">
                  WAIT i know exactly where that is. ok hear me out theres a ramen spot 4 min from there, zero tourists, ur gonna die 🍜
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-neon text-obsidian px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] font-medium">
                  STOP im so excited already 😭
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <div className="text-center mt-12">
            <p className="font-caveat text-3xl md:text-4xl text-neon leading-tight">
              Your Seoul.
              <br />
              Planned around you. By a real friend.
            </p>
          </div>

          {/* CTA Repetition */}
          <div className="text-center mt-10">
            <a href="#apply" className="inline-block bg-neon text-obsidian px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Meet your YUKO →
            </a>
            <div className="text-xs text-white/50 mt-2">Takes 30 seconds</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 md:py-28 px-4 md:px-6 border-t border-white/5 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${chatBg}')` }}
        />
        <div className="absolute inset-0 bg-obsidian/70" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-16">
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1 md:mb-2">how it works</div>
            <h2 className="text-2xl md:text-5xl font-bold">
              Meet your YUKO in <span className="text-neon">5 steps.</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-5 gap-5">
            {[
              { n: "1", t: "Apply", d: "Fill a 3-minute form with your travel vibe." },
              { n: "2", t: "Matched", d: "Your peer Korean mate within 24h." },
              { n: "3", t: "Chat", d: "Plan your custom day — 2 days before you land." },
              { n: "4", t: "Hang out", d: "Full day together, made for you." },
              { n: "5", t: "Remember", d: "Photo pack + Korean phrase card after." },
            ].map((s, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 150}>
                <div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-neon/40 transition-all"
                >
                  <div className="font-caveat text-7xl text-neon leading-none">{s.n}</div>
                  <div className="text-xl font-bold mt-3 mb-2">{s.t}</div>
                  <div className="text-sm text-white/70 leading-relaxed">{s.d}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE MATES — 3 cards, horizontal swipe */}
      <section className="py-14 md:py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-14">
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1 md:mb-2">meet the mates</div>
            <h2 className="text-2xl md:text-5xl font-bold">
              Hand-picked. <span className="text-neon">Peer Korean friends.</span>
            </h2>
          </div>
        </div>

        {/* Swipe container */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 md:px-0 md:justify-center pb-4 no-scrollbar">
          {/* Card 1 — Founder (남성) */}
          <div className="snap-start flex-shrink-0 w-[82vw] md:w-[360px] bg-gradient-to-br from-white/10 to-white/5 border border-neon/30 rounded-3xl overflow-hidden relative hover:border-neon/60 transition-all">
            <div className="absolute top-4 right-4 z-10 bg-neon text-obsidian text-[10px] font-bold px-2 py-1 rounded-full tracking-wider">
              FOUNDER
            </div>
            <div
              className="h-56 md:h-64 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${founderPhoto}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
            </div>
            <div className="p-5 md:p-6 -mt-14 relative z-10">
              <div className="text-xl font-bold mb-1">Your Host</div>
              <div className="text-sm text-white/60 mb-3 italic">Founder of YUKO · Seoul</div>
              <div className="space-y-1.5 text-[13px] bg-obsidian/60 backdrop-blur-sm border border-white/10 rounded-xl p-3.5">
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>PR Ambassador, Korea University (고려대학교)</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>Beyond Camp — mentored kids abroad</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>Korean, English · Driver (car available)</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>Hidden bars · Han River nights · Local BBQ joints</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-white/60 italic font-fraunces">
                "I traveled solo wishing I had a local friend. So I became one. That's why I founded YUKO."
              </div>
            </div>
          </div>

          {/* Card 2 — Female Mate */}
          <div className="snap-start flex-shrink-0 w-[82vw] md:w-[360px] bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-3xl overflow-hidden relative hover:border-neon/40 transition-all">
            <div className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur text-off-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wider">
              MATE
            </div>
            <div
              className="h-56 md:h-64 bg-cover bg-center relative"
              style={{ backgroundImage: `url('${soyeonPhoto}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
            </div>
            <div className="p-5 md:p-6 -mt-14 relative z-10">
              <div className="text-xl font-bold mb-1">Soyeon</div>
              <div className="text-sm text-white/60 mb-3 italic">YUKO Mate · Seoul</div>
              <div className="space-y-1.5 text-[13px] bg-obsidian/60 backdrop-blur-sm border border-white/10 rounded-xl p-3.5">
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>Ewha Womans University (이화여대)</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>Lived in Tokyo for 2 years</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>Korean, English</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>Seongsu cafes · K-beauty · Hangang picnics</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-white/60 italic font-fraunces">
                "I want to show you the Seoul my friends and I actually live in."
              </div>
            </div>
          </div>

          {/* Card 3 — Coming Soon */}
          <div className="snap-start flex-shrink-0 w-[82vw] md:w-[360px] bg-white/5 border border-dashed border-white/15 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[420px] hover:border-neon/30 transition-colors">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-transparent mb-5 flex items-center justify-center border border-white/10">
              <span className="font-caveat text-5xl text-white/30">?</span>
            </div>
            <div className="text-lg font-bold text-white/50 mb-2">Mate #3</div>
            <div className="font-caveat text-3xl md:text-4xl text-neon">coming soon</div>
            <div className="text-xs text-white/50 mt-4 text-center leading-relaxed">
              Hand-picked by founder.
              <br />
              Dropping soon.
            </div>
          </div>
        </div>

        {/* Swipe hint — mobile only */}
        <div className="md:hidden text-center mt-3 text-xs text-white/40 tracking-widest">
          ← swipe →
        </div>
      </section>

      {/* MESSAGES — pilot testimonials, compact, gen-z tone */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-10">
            <div className="font-caveat text-4xl text-neon mb-1">real messages</div>
            <h2 className="text-2xl md:text-4xl font-bold">
              After they came home.
            </h2>
          </ScrollReveal>

          {/* 3 chat cards — compact */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* IG DM — USA */}
            <ScrollReveal direction="up" delay={0}>
            <div className="bg-obsidian-soft rounded-2xl border border-white/10 overflow-hidden">
              <div className="bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 px-3 py-2 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs border border-white/40">S</div>
                <span className="text-white font-bold text-xs">sarah.mcc 🇺🇸</span>
                <span className="ml-auto text-white/70 text-[9px]">IG DM</span>
              </div>
              <div className="p-3.5 space-y-1.5 text-[13px]">
                <div className="bg-white/10 text-off-white px-3 py-2 rounded-2xl rounded-bl-sm">
                  this was my 5th time in seoul and i just realized i never actually experienced it before?? THIS was the real Seoul 😭
                </div>
                <div className="bg-white/10 text-off-white px-3 py-2 rounded-2xl rounded-bl-sm">
                  soyeon showed me streets i literally walked past 4 times before. locals live so different fr 🫶
                </div>
              </div>
            </div>

            </ScrollReveal>

            {/* WhatsApp — Japan */}
            <ScrollReveal direction="up" delay={100}>
            <div className="bg-[#0B141A] rounded-2xl border border-white/10 overflow-hidden">
              <div className="bg-[#202C33] px-3 py-2 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">H</div>
                <span className="text-white font-bold text-xs">Haruka 🇯🇵</span>
                <span className="ml-auto text-[#8696A0] text-[9px]">WhatsApp</span>
              </div>
              <div className="p-3.5 space-y-1.5 text-[13px]">
                <div className="bg-[#202C33] text-off-white px-3 py-2 rounded-2xl rounded-bl-sm">
                  YouTubeで海外の友達と旅行する動画見て予約した。まさにそのまんまだった🥹
                </div>
                <div className="bg-[#202C33] text-off-white px-3 py-2 rounded-2xl rounded-bl-sm">
                  ツアーじゃなくてガチの友達になれた気がする まじで泣いた ✈️
                </div>
              </div>
            </div>

            </ScrollReveal>

            {/* WeChat — China */}
            <ScrollReveal direction="up" delay={200}>
            <div className="bg-[#EDEDED] rounded-2xl border border-white/10 overflow-hidden">
              <div className="bg-[#F7F7F7] px-3 py-2 flex items-center gap-2 border-b border-black/5">
                <div className="w-7 h-7 rounded-full bg-[#07C160] flex items-center justify-center text-white font-bold text-xs">M</div>
                <span className="text-black font-bold text-xs">美琳 🇨🇳</span>
                <span className="ml-auto text-gray-400 text-[9px]">微信</span>
              </div>
              <div className="p-3.5 space-y-1.5 text-[13px]">
                <div className="bg-white text-gray-900 px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm">
                  来了5次首尔 才发现之前都在逛旅游区😭 本地人去的地方完全不一样
                </div>
                <div className="bg-white text-gray-900 px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm">
                  如果我的国家也有YUKO 我想当mate ❤️
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>

          {/* Inline quotes strip */}
          <div className="grid md:grid-cols-3 gap-4 mt-4 text-[13px]">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-start gap-2">
              <span className="text-xs mt-0.5">🇫🇷</span>
              <span className="text-white/70 italic">"même dans mon pays on va pas aux spots touristiques. les locaux ont leurs propres endroits. c'est ça YUKO 🙏"</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-start gap-2">
              <span className="text-xs mt-0.5">🇪🇸</span>
              <span className="text-white/70 italic">"hice una amiga de verdad, no turismo. ojalá abran otras ciudades 🫶"</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-start gap-2">
              <span className="text-xs mt-0.5">🇸🇬</span>
              <span className="text-white/70 italic">"saw those youtube vids of people traveling with local friends. booked it. it was exactly that. no cap"</span>
            </div>
          </div>

          {/* Trust line */}
          <div className="text-center mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] text-white/50 tracking-widest uppercase">
            <span>🇺🇸🇯🇵🇨🇳🇫🇷🇪🇸🇸🇬🇩🇪🇹🇭</span>
            <span className="text-neon/40">✦</span>
            <span>18 pilot testers</span>
            <span className="text-neon/40">✦</span>
            <span>4.9 ★</span>
            <span className="text-neon/40">✦</span>
            <span className="text-neon font-bold">100% would rebook</span>
          </div>

          {/* CTA Repetition */}
          <div className="text-center mt-10">
            <a href="#apply" className="inline-block bg-neon text-obsidian px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Meet your YUKO →
            </a>
            <div className="text-xs text-white/50 mt-2">Takes 30 seconds</div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-14 md:py-28 px-4 md:px-6 border-t border-white/5 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${storyBg}')` }}
        />
        <div className="absolute inset-0 bg-obsidian/50" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ScrollReveal direction="up">
            <div className="font-caveat text-5xl text-neon mb-2">our story</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-10">Why we made YUKO.</h2>
          </ScrollReveal>
          <div className="font-fraunces text-xl md:text-2xl font-light leading-[1.6] text-white/85 space-y-5">
            <ScrollReveal direction="up" delay={100}>
            <p>
              I love traveling. I hate planning. And I hate being a <em className="italic text-neon">tourist</em>.
              <br />
              So I always went where I had a friend — and those trips were{" "}
              <em className="italic text-neon">unreal</em>.
            </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
            <p>
              A hidden izakaya in Tokyo. A rooftop in Bangkok nobody posts about.
              A midnight drive in LA with someone who actually lives there.
            </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
            <p>
              Then I thought — do travelers coming to Korea ever get that?
              <br />
              The answer was no. They get Myeongdong and a checklist.
              <br />
              But they don't get <em className="italic text-neon">Seoul</em>.
            </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={400}>
            <p className="font-caveat text-4xl text-neon pt-4">
              I can give them the real thing. That's why I built YUKO.
            </p>
            </ScrollReveal>
          </div>

          {/* CTA Repetition */}
          <div className="text-center mt-10">
            <a href="#apply" className="inline-block bg-neon text-obsidian px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Meet your YUKO →
            </a>
            <div className="text-xs text-white/50 mt-2">Takes 30 seconds</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-24 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-16">
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1 md:mb-2">faq</div>
            <h2 className="text-2xl md:text-5xl font-bold">Good questions.</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {[
              {
                q: "Is it safe?",
                a: "All mates are hand-picked by our founder through in-person interviews. First meetings are always in public places. 24-hour emergency line.",
              },
              {
                q: "Is this a tour guide service?",
                a: "No. Your mate is a peer Korean friend. No flag, no script, no group. You decide what you want to do — they know where to go.",
              },
              {
                q: "How is it custom?",
                a: "2 days before you arrive, your mate chats with you to understand what you love. Then they plan a day just for you. Not a template. Not a package.",
              },
              {
                q: "Can I choose gender preference?",
                a: "Yes — choose same-gender or no preference when you apply. Your safety and comfort come first.",
              },
              {
                q: "What languages?",
                a: "All mates speak English. Some also speak Japanese, Chinese, or other languages — noted on each profile.",
              },
              {
                q: "How much does it cost?",
                a: "Half-day (6h min): $129 (was $222) · Full-day (10h): $219 (was $370) · 2 days: $349 (was $630). Up to 40% launch special. The 6h is a guaranteed minimum — not a hard stop, so your day naturally runs longer if the vibe's right. Price is for 2 people — additional guests or custom requests are discussed in chat. No upfront payment. You only pay after your mate is confirmed.",
              },
              {
                q: "When can I book?",
                a: "Apply now — it takes 30 seconds. We'll match you within 24 hours.",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 100}>
                <details
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-neon/30 transition-colors"
                >
                  <summary className="p-6 cursor-pointer font-bold text-lg flex items-center justify-between hover:bg-white/5">
                    {item.q}
                    <span className="text-neon text-3xl group-open:rotate-45 transition-transform font-light leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-white/70 leading-relaxed">{item.a}</div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="waitlist"
        className="py-20 md:py-32 px-4 md:px-6 border-t border-white/5 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('${waitlistBg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/70 to-obsidian" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon/10 rounded-full blur-3xl" />

        <ScrollReveal direction="scale" className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="font-caveat text-5xl md:text-7xl text-neon mb-2">
            ready?
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Your Seoul is one chat away.
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-10">
            No payment. No commitment. Just say hi.
          </p>
          <a
            href="#apply"
            className="inline-block bg-neon text-obsidian px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform shadow-[0_8px_32px_rgba(243,243,26,0.35)]"
          >
            Meet your YUKO →
          </a>
          <p className="text-center text-xs text-white/50 mt-4">
            Takes 30 seconds
          </p>
        </ScrollReveal>
      </section>

      {/* STICKY MOBILE CTA — appears after scrolling past hero */}
      <StickyCta />

      {/* APPLY MODAL — bottom sheet funnel */}
      <ApplyModal />

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 bg-obsidian">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <div className="font-caveat text-3xl text-off-white" style={{ filter: "drop-shadow(0 0 8px rgba(243,243,26,0.3))" }}>
            y<span className="text-neon">u</span>ko<span className="text-neon logo-dot">.</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://www.instagram.com/yuko_seoul/" target="_blank" rel="noopener" className="hover:text-neon transition-colors group flex items-center gap-1.5" title="Instagram">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              <span className="hidden md:inline text-xs">Instagram</span>
            </a>
            <a href="https://wa.me/821083268528" target="_blank" rel="noopener" className="hover:text-neon transition-colors group flex items-center gap-1.5" title="WhatsApp">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span className="hidden md:inline text-xs">WhatsApp</span>
            </a>
            <a href="https://line.me/R/ti/p/@331kikgs" target="_blank" rel="noopener" className="hover:text-neon transition-colors group flex items-center gap-1.5" title="LINE">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
              <span className="hidden md:inline text-xs">LINE</span>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61572041466581" target="_blank" rel="noopener" className="hover:text-neon transition-colors group flex items-center gap-1.5" title="Facebook">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span className="hidden md:inline text-xs">Facebook</span>
            </a>
            <a href="mailto:youxo@chosim.me" className="hover:text-neon transition-colors group flex items-center gap-1.5" title="Email">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              <span className="hidden md:inline text-xs">Email</span>
            </a>
          </div>
          <div className="text-xs">© 2026 YUKO · Your friend is here.</div>
        </div>
      </footer>
    </main>
  );
}
