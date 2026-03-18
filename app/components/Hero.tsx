export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#111111]">

      {/* Background — radial gradient + tribal sun */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Radial pink glow */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-[#FF3EB5]/5 blur-[120px]" />
        {/* Tribal sun SVG */}
        <svg
          className="sun-bg absolute w-[600px] h-[600px] opacity-[0.12]"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 8-ray Philippine sun */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45} 100 100)`}>
              <polygon
                points="100,10 106,80 100,95 94,80"
                fill="#FF3EB5"
                opacity="0.9"
              />
            </g>
          ))}
          <circle cx="100" cy="100" r="28" fill="#FF3EB5" opacity="0.9" />
          <circle cx="100" cy="100" r="18" fill="#111111" opacity="1" />
          {/* Decorative outer ring */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={`dot-${i}`}
              cx={100 + 45 * Math.cos((i * Math.PI * 2) / 8 - Math.PI / 2)}
              cy={100 + 45 * Math.sin((i * Math.PI * 2) / 8 - Math.PI / 2)}
              r="3"
              fill="#C9922A"
              opacity="0.8"
            />
          ))}
        </svg>
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#FF3EB5 1px, transparent 1px), linear-gradient(90deg, #FF3EB5 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Rhinestone corner accents */}
      <div className="absolute top-28 left-8 flex flex-col gap-1 opacity-40">
        {["✦", "✧", "✦"].map((s, i) => (
          <span key={i} className="sparkle text-[#C9922A] text-xs" style={{ animationDelay: `${i * 0.4}s` }}>{s}</span>
        ))}
      </div>
      <div className="absolute top-28 right-8 flex flex-col gap-1 opacity-40">
        {["✦", "✧", "✦"].map((s, i) => (
          <span key={i} className="sparkle text-[#C9922A] text-xs" style={{ animationDelay: `${i * 0.4 + 0.2}s` }}>{s}</span>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Eyebrow */}
        <p className="mb-6 text-[10px] tracking-[0.5em] uppercase text-[#C9922A] font-semibold">
          ✦ &nbsp; Fil-Am Streetwear &nbsp; ✦
        </p>

        {/* Main wordmark */}
        <h1 className="font-black uppercase leading-none mb-2">
          <span className="block chrome-text text-[clamp(4rem,15vw,10rem)] tracking-[-0.02em]">
            BEBOT
          </span>
          <span className="block text-[clamp(1rem,4vw,2.5rem)] tracking-[0.6em] text-[#FF3EB5] mt-1">
            PH
          </span>
        </h1>

        {/* Baybayin-style decorative line */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#FF3EB5]" />
          <span className="text-[#C9922A] text-sm">✦</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#FF3EB5]" />
        </div>

        {/* Tagline */}
        <p className="text-[#C0C0C0] text-sm md:text-base tracking-[0.2em] uppercase max-w-xs md:max-w-md leading-relaxed">
          For the girl who pulled up in a pink Honda<br />
          and stayed all night.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <a
            href="/collections"
            className="px-10 py-4 bg-[#FF3EB5] text-[#111111] text-xs font-black tracking-[0.3em] uppercase hover:bg-[#FF1493] transition-colors"
          >
            Shop Women's
          </a>
          <a
            href="/collections"
            className="px-10 py-4 border border-[#FF3EB5]/40 text-[#FF3EB5] text-xs font-black tracking-[0.3em] uppercase hover:border-[#FF3EB5] hover:bg-[#FF3EB5]/5 transition-all"
          >
            View Lookbook
          </a>
        </div>

        {/* Drop teaser */}
        <p className="mt-8 text-[10px] tracking-[0.4em] uppercase text-[#C0C0C0]/50">
          New Drop — Spring &apos;25 — Dropping Soon
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[9px] tracking-[0.4em] uppercase text-[#C0C0C0]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#FF3EB5] to-transparent" />
      </div>
    </section>
  );
}
