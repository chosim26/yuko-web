import ScrollReveal from "../components/scroll-reveal";
import StickyCta from "../components/sticky-cta";
import LanguageSwitcher from "../components/language-switcher";
import ApplyModal from "../components/apply-modal";

export default function Home() {
  // 10-image slideshow (hero). 4.2s × 10 = 42s loop with crossfade.
  // `pos` = CSS background-position (which part of the image stays in frame).
  // Theme: hidden/locals-only spots — places guidebooks don't cover.
  const heroSlides = [
    { src: "/photos/yuko-hero-namsan-view.jpg",  label: "Namsan",          sub: "남산 · Where locals watch it",  pos: "center" },
    { src: "/photos/g-oliveyoung-2.jpg",         label: "K-Beauty",        sub: "Indie picks, not the brands",   pos: "center" },
    { src: "/photos/g-kpop-3.jpg",               label: "K-Pop",           sub: "Underground showcase",          pos: "center" },
    { src: "/photos/yuko-hero-izakaya.jpg",      label: "Izakaya",         sub: "이자카야 · 동네 단골집",       pos: "center" },
    { src: "/photos/yuko-hero-hongdae-beer.jpg", label: "Hongdae",         sub: "홍대 · Back alley only",        pos: "center" },
    { src: "/photos/yuko-hero-bookstore.jpg",    label: "Indie Bookstore", sub: "동네 책방 · Quiet corner",      pos: "center" },
    { src: "/photos/u-03-bbq-cheers.png",        label: "Samgyeopsal",     sub: "삼겹살 · Local BBQ pick",       pos: "center" },
    { src: "/photos/u-01-gyeongbokgung.png",     label: "Gyeongbokgung",   sub: "경복궁 · Dawn, no crowds",      pos: "center" },
    { src: "/photos/yuko-hero-hangang-ski.jpg",  label: "Hangang",         sub: "한강 · Locals-only ride",       pos: "center" },
    { src: "/photos/yuko-hero-yongsan-park.jpg", label: "Yongsan Park",    sub: "용산 · Quiet brick-wall walk",  pos: "center" },
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
          <a
            href="#apply"
            className="bg-neon text-obsidian px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform"
          >
            认识你的YUKO
          </a>
          <LanguageSwitcher current="zh" />
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
            你的朋友在这里。
          </div>
          <h1 className="text-xl md:text-4xl font-medium leading-tight text-off-white mb-4 md:mb-5 px-2">
            如果你在韩国有个朋友，
            <br />
            你的旅行会是什么样？
          </h1>
          <p className="text-sm md:text-lg text-white/70 max-w-xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
            落地前2天，一个和你同龄的韩国朋友
            <br className="hidden md:inline" /> 就开始帮你规划这一天。
          </p>
          <div className="mb-8 md:mb-10">
            <a
              href="#apply"
              className="inline-block bg-neon text-obsidian px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base shadow-[0_8px_32px_rgba(243,243,26,0.35)] hover:scale-105 transition-transform"
            >
              认识你的YUKO →
            </a>
          </div>
          <div className="text-xs md:text-sm text-white/70 tracking-wide">
            认证伙伴&nbsp;&nbsp;·&nbsp;&nbsp;行前聊天&nbsp;&nbsp;·&nbsp;&nbsp;定制行程
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
          往下滑 ↓
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-8 px-6 border-t border-b border-white/5 bg-obsidian-soft/40 overflow-hidden">
        <ScrollReveal direction="fade">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-white/60 tracking-widest uppercase">
            <span>没有团队游</span>
            <span className="text-neon/40">✦</span>
            <span>没有小旗子</span>
            <span className="text-neon/40">✦</span>
            <span>没有陌生人</span>
            <span className="text-neon/40">✦</span>
            <span className="text-neon font-bold">只有朋友</span>
          </div>
        </ScrollReveal>
      </section>

      {/* SOUND FAMILIAR? */}
      <section className="py-14 md:py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-10">
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1">听起来熟悉吗？</div>
          </ScrollReveal>
          <div className="space-y-3">
            {[
              "飞了10个小时，结果跟其他游客做一样的事",
              "想想你自己的城市——你会去景点吗？就是这个意思。",
              "我知道自己在付游客价。但不知道怎么避开",
              "看过YouTube上和当地朋友一起旅行的视频。我想要的就是那种。",
              "旅行博主让一切看起来很简单。现实完全不是那样。",
              "我知道首尔有游客看不到的另一面。只是找不到入口。",
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
              所以我们做了YUKO ↓
            </a>
          </div>
        </div>
      </section>

      {/* PAIN POINTS — Tourist Seoul vs. The Seoul you'd live in */}
      <section className="py-14 md:py-24 px-4 md:px-6 border-t border-white/5 bg-gradient-to-b from-obsidian via-obsidian-soft/30 to-obsidian">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-10 md:mb-16">
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1 md:mb-2">两个首尔</div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              你去过的首尔。
              <br />
              <span className="text-neon italic font-fraunces">你想住下来的首尔。</span>
            </h2>
            <p className="text-white/60 mt-6 max-w-2xl mx-auto text-base md:text-lg">
              游客看到的只是TOP 10榜单。
              <br />
              本地人住在小巷里、地下室里、那些多绕30分钟才能找到的地方。
              <br className="hidden md:inline" />
              <span className="text-neon/80">YUKO带你看的，是那个首尔。</span>
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {[
              {
                tourist: "明洞。景福宫。N首尔塔。和1000万游客去一样的3个地方。飞10个小时就为了这个？",
                local:   "圣水洞一个每年只开3周的天台酒吧。Mate昨天刚听说。已经在清单上了。",
              },
              {
                tourist: "搜了「韩国美食推荐」。排了2小时队。坐下了。一般般。旁边桌？全是游客。",
                local:   "第二条巷子，没有招牌，塑料椅子。老板对Mate点了个头。吃到本地人真正吃的东西。₩8,000。",
              },
              {
                tourist: "同一条街走过了4遍。不知道首尔最好的咖啡馆藏在停车场后面。",
                local:   "Mate发来消息：「相信我，在洗衣店那里左转。」找到了。零游客。绝佳空间。",
              },
              {
                tourist: "指着菜单点菜。尬笑。本地人花₩9,000的东西我花了₩18,000。",
                local:   "Mate用韩语点单。隐藏菜单出来了。因为跟本地人一起来的，老板免费送了小菜。",
              },
              {
                tourist: "K-POP粉丝活动。报名页面？全是韩文。晚了2天，错过了。",
                local:   "Mate在你到之前就帮你预约好了。之后呢？去了粉丝真正聚集的咖啡馆——不是Google上搜到的那种。",
              },
              {
                tourist: "让陌生人帮忙拍照。拍到的是额头和垃圾桶。这就是首尔的回忆。",
                local:   "Mate找到了黄金时段的拍照点，帮你拍了40张，终于有了能传达旅行感动的照片。",
              },
            ].map((p, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 100}>
              <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-5 items-stretch">
                {/* Tourist */}
                <div className="bg-obsidian/60 border border-white/10 rounded-2xl p-5 md:p-6 relative">
                  <div className="text-[10px] tracking-widest uppercase text-white/40 font-bold mb-2">
                    游客的首尔
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
                    如果你有个朋友在这里
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
              不需要旅行团。
              <br />
              你需要的，是一个朋友。
            </p>
            <p className="text-white/60 text-sm md:text-base italic font-fraunces">
              本地人真正生活的首尔。不是地图上标的那个。
            </p>
          </div>

          {/* CTA Repetition */}
          <div className="text-center mt-10">
            <a href="#apply" className="inline-block bg-neon text-obsidian px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              认识你的YUKO →
            </a>
            <div className="text-xs text-white/50 mt-2">30秒搞定</div>
          </div>
        </div>
      </section>

      {/* CUSTOM FOR YOU — the 2-day chat process */}
      <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-14">
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1 md:mb-2">只为你定制</div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              不是套餐。
              <br />
              <span className="text-neon italic font-fraunces">从了解你开始的一天。</span>
            </h2>
            <p className="text-white/60 mt-6 max-w-2xl mx-auto">
              到达前2天，你的YUKO就会开始聊天。
              <br />
              问你喜欢什么、不喜欢什么、这次来想做什么，
              <br />
              <span className="text-neon/80">然后为你规划一个别人做不出来的一天。</span>
            </p>
          </ScrollReveal>

          {/* Chat mockup */}
          <ScrollReveal direction="up" delay={200}>
          <div className="max-w-2xl mx-auto bg-obsidian-soft/60 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs tracking-widest uppercase text-white/60">
                和YUKO聊天 · 到达前2天
              </span>
            </div>

            <div className="space-y-2.5 text-[14px] md:text-[15px]">
              <div className="flex justify-end">
                <div className="bg-neon text-obsidian px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] font-medium">
                  嗨！我周二下午3点左右到 🛬
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%]">
                  收到！！你喜欢慢悠悠的咖啡馆还是晚上的酒吧？
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-neon text-obsidian px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] font-medium">
                  说实话两个都要哈哈 🥲
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%]">
                  哈哈不错 你看韩剧吗？有什么不能吃的吗？
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-neon text-obsidian px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] font-medium">
                  看！！想去Lovely Runner的那个咖啡馆 🫶 不能吃辣哈哈
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%]">
                  等等我知道那个地方！告诉你，从那走4分钟有家拉面店，零游客，你绝对会爱上 🍜
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-neon text-obsidian px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] font-medium">
                  天哪已经太期待了 😭
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <div className="text-center mt-12">
            <p className="font-caveat text-3xl md:text-4xl text-neon leading-tight">
              你的首尔。
              <br />
              真正的朋友，为你量身规划。
            </p>
          </div>

          {/* CTA Repetition */}
          <div className="text-center mt-10">
            <a href="#apply" className="inline-block bg-neon text-obsidian px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              认识你的YUKO →
            </a>
            <div className="text-xs text-white/50 mt-2">30秒搞定</div>
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
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1 md:mb-2">怎么玩</div>
            <h2 className="text-2xl md:text-5xl font-bold">
              <span className="text-neon">5步</span>认识你的YUKO。
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-5 gap-5">
            {[
              { n: "1", t: "申请", d: "简单3步，告诉我们时间·人数·喜好。" },
              { n: "2", t: "匹配", d: "24小时内匹配同龄的韩国Mate。" },
              { n: "3", t: "聊天", d: "Mate花2-3小时为你专属规划。" },
              { n: "4", t: "一起玩", d: "属于你的一天，一起度过。" },
              { n: "5", t: "回忆", d: "赠送照片包+韩语短语卡。" },
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
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1 md:mb-2">认识Mate</div>
            <h2 className="text-2xl md:text-5xl font-bold">
              精心挑选的，<span className="text-neon">同龄韩国朋友。</span>
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
              <div className="text-xl font-bold mb-1">Host</div>
              <div className="text-sm text-white/60 mb-3 italic">YUKO 创始人 · 首尔</div>
              <div className="space-y-1.5 text-[13px] bg-obsidian/60 backdrop-blur-sm border border-white/10 rounded-xl p-3.5">
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>PR大使，高丽大学（고려대학교）</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>Beyond Camp — 海外儿童导师</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>韩语、英语 · 有车（可以开车）</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>隐藏酒吧 · 汉江夜景 · 本地烤肉店</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-white/60 italic font-fraunces">
                {'"'}一个人旅行的时候总想着「要是有个本地朋友就好了」。所以我自己成为了那个朋友。这就是YUKO的起点。{'"'}
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
              <div className="text-xl font-bold mb-1">素妍</div>
              <div className="text-sm text-white/60 mb-3 italic">YUKO Mate · 首尔</div>
              <div className="space-y-1.5 text-[13px] bg-obsidian/60 backdrop-blur-sm border border-white/10 rounded-xl p-3.5">
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>梨花女子大学（이화여대）</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>在东京住过2年</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>韩语、英语</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon">✦</span>
                  <span>圣水洞咖啡 · K-Beauty · 汉江野餐</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-white/60 italic font-fraunces">
                {'"'}我想让你看到我和朋友们真正生活着的首尔。{'"'}
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
              创始人精选中。
              <br />
              即将公开。
            </div>
          </div>
        </div>

        {/* Swipe hint — mobile only */}
        <div className="md:hidden text-center mt-3 text-xs text-white/40 tracking-widest">
          ← 滑动 →
        </div>
      </section>

      {/* MESSAGES — pilot testimonials, compact, gen-z tone */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-10">
            <div className="font-caveat text-4xl text-neon mb-1">真实反馈</div>
            <h2 className="text-2xl md:text-4xl font-bold">
              回国后发来的消息。
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
                  看了YouTube上和当地朋友旅行的视频就预订了。完全就是那种感觉🥹
                </div>
                <div className="bg-[#202C33] text-off-white px-3 py-2 rounded-2xl rounded-bl-sm">
                  不是旅行团 感觉真的交到了朋友 真的哭了 ✈️
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
            <span>18位内测用户</span>
            <span className="text-neon/40">✦</span>
            <span>4.9 ★</span>
            <span className="text-neon/40">✦</span>
            <span className="text-neon font-bold">100%想再来</span>
          </div>

          {/* CTA Repetition */}
          <div className="text-center mt-10">
            <a href="#apply" className="inline-block bg-neon text-obsidian px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              认识你的YUKO →
            </a>
            <div className="text-xs text-white/50 mt-2">30秒搞定</div>
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
            <div className="font-caveat text-5xl text-neon mb-2">我们的故事</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-10">为什么做YUKO。</h2>
          </ScrollReveal>
          <div className="font-fraunces text-xl md:text-2xl font-light leading-[1.6] text-white/85 space-y-5">
            <ScrollReveal direction="up" delay={100}>
            <p>
              喜欢旅行。讨厌做攻略。更讨厌当<em className="italic text-neon">游客</em>。
              <br />
              所以我总是去有朋友的地方——那种旅行是{" "}
              <em className="italic text-neon">完全不同的次元</em>。
            </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
            <p>
              东京的隐藏居酒屋。没人发社交媒体的曼谷天台。
              和住在那里的人一起深夜开车穿越洛杉矶。
            </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
            <p>
              然后我突然想到——来韩国的旅行者，能有这样的体验吗？
              <br />
              答案是不能。大家都只是明洞和打卡清单。
              <br />
              但没有真正体验过<em className="italic text-neon">首尔</em>。
            </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={400}>
            <p className="font-caveat text-4xl text-neon pt-4">
              我能把真实的体验带给你们。所以做了YUKO。
            </p>
            </ScrollReveal>
          </div>

          {/* CTA Repetition */}
          <div className="text-center mt-10">
            <a href="#apply" className="inline-block bg-neon text-obsidian px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              认识你的YUKO →
            </a>
            <div className="text-xs text-white/50 mt-2">30秒搞定</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-24 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-16">
            <div className="font-caveat text-3xl md:text-5xl text-neon mb-1 md:mb-2">常见问题</div>
            <h2 className="text-2xl md:text-5xl font-bold">好问题。</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {[
              {
                q: "安全吗？",
                a: "所有Mate都由创始人面对面面试精选。第一次见面一定在公共场所。24小时紧急联系方式。",
              },
              {
                q: "这是导游服务吗？",
                a: "不是。Mate是同龄的韩国朋友。没有小旗子，没有台词，没有团队。你来决定想做什么——去哪里Mate知道。",
              },
              {
                q: "怎么定制的？",
                a: "到达前2天，Mate会在聊天中了解你的喜好。然后为你规划专属的一天。不是模板。也不是套餐。",
              },
              {
                q: "可以选择性别偏好吗？",
                a: "可以——申请时可以选同性或无所谓。安全和舒适是第一位的。",
              },
              {
                q: "支持什么语言？",
                a: "所有Mate都会英语。部分Mate会中文、日语或其他语言——在个人资料中有标注。",
              },
              {
                q: "费用是多少？",
                a: "半天（6小时起）：$129（约¥930 / ₩190,000）· 全天（10小时）：$219（约¥1,580 / ₩320,000）· 两天：$349（约¥2,510 / ₩510,000）。早期推广特价 — 最高可享6折优惠。费用含2人。6小时是最低保障——不是硬性结束，气氛合适自然会更长。无需预付。匹配成功后再付款。",
              },
              {
                q: "不包含哪些？",
                a: "你自己的餐饮、门票、购物和交通费用各付各的（AA制 — 像和普通朋友一起出去玩的感觉）。Mate负担自己的部分。费用涵盖Mate的时间、规划、本地知识。餐厅或需要门票的活动，我们会提前一起商量预算和方案。",
              },
              {
                q: "为什么比团体游贵？",
                a: "团体游（$60）是和30个陌生人走固定路线。YUKO（$129）是1个韩国朋友，到达前2-3小时为你定制规划，专为你设计的一天。还有Google搜不到的本地点。",
              },
              {
                q: "什么时候可以预约？",
                a: "现在就可以申请——60秒搞定。24小时内完成匹配。",
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
            准备好了吗？
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            你的首尔，一条消息就能开始。
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-10">
            无需付款。没有绑定。先发条消息就好。
          </p>
          <a
            href="#apply"
            className="inline-block bg-neon text-obsidian px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform shadow-[0_8px_32px_rgba(243,243,26,0.35)]"
          >
            认识你的YUKO →
          </a>
          <p className="text-center text-xs text-white/50 mt-4">
            30秒搞定
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
          <div className="text-xs">© 2026 YUKO · 你的朋友在这里。</div>
        </div>
      </footer>
    </main>
  );
}
