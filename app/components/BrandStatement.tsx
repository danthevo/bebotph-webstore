export default function BrandStatement() {
  return (
    <section className="relative py-28 px-6 overflow-hidden bg-[#111111]">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF3EB5]/5 via-transparent to-transparent pointer-events-none" />

      {/* Top divider */}
      <div className="flex items-center gap-4 mb-16 max-w-4xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FF3EB5]/40 to-transparent" />
        <span className="text-[#C9922A] text-sm">✦</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FF3EB5]/40 to-transparent" />
      </div>

      {/* Statement text */}
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.6em] uppercase text-[#C9922A] mb-8">
          For the girl who knows exactly who she is
        </p>

        <h2 className="font-black uppercase text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-tight mb-8">
          <span className="text-white">Born in the </span>
          <span className="shimmer">Bay.</span>
          <br />
          <span className="text-white">Built in </span>
          <span className="chrome-text">Chrome.</span>
          <br />
          <span className="text-white">Dressed like </span>
          <span className="pink-glow">Suki.</span>
        </h2>

        <p className="text-[#C0C0C0] text-sm md:text-base leading-loose max-w-xl mx-auto tracking-wide">
          Bebot is the Tagalog word for girl. We&apos;re the girls who grew up between two worlds —
          barong at breakfast, Von Dutch by noon, Jeepney at night.
          This is your clothes.
        </p>

        <div className="flex items-center gap-4 mt-12 justify-center">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9922A]" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#C9922A]">
            Est. &apos;25 — Daly City DNA
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9922A]" />
        </div>
      </div>

      {/* Bottom divider */}
      <div className="flex items-center gap-4 mt-16 max-w-4xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FF3EB5]/40 to-transparent" />
        <span className="text-[#C9922A] text-sm">✦</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FF3EB5]/40 to-transparent" />
      </div>
    </section>
  );
}
