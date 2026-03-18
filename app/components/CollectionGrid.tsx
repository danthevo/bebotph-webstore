const collections = [
  {
    id: 1,
    name: "Racing Girl",
    subtitle: "Suki Edition",
    tag: "New Drop",
    tagColor: "#FF3EB5",
    bg: "from-[#7B1A2E] to-[#0D1B4B]",
    accent: "#FF3EB5",
    size: "large",
    items: "12 pieces",
  },
  {
    id: 2,
    name: "Barong",
    subtitle: "Heritage Series",
    tag: "Limited",
    tagColor: "#C9922A",
    bg: "from-[#0D1B4B] to-[#111111]",
    accent: "#C9922A",
    size: "small",
    items: "6 pieces",
  },
  {
    id: 3,
    name: "Jeepney",
    subtitle: "Summer '25",
    tag: "Coming Soon",
    tagColor: "#C0C0C0",
    bg: "from-[#111111] to-[#1A55C8]/30",
    accent: "#1A55C8",
    size: "small",
    items: "8 pieces",
  },
  {
    id: 4,
    name: "Chrome Baby",
    subtitle: "Y2K Forever",
    tag: "Bestseller",
    tagColor: "#FF3EB5",
    bg: "from-[#111111] to-[#3a1a3a]",
    accent: "#FF3EB5",
    size: "large",
    items: "10 pieces",
  },
];

export default function CollectionGrid() {
  return (
    <section className="px-4 md:px-8 py-20 bg-[#111111]">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9922A] mb-2">✦ Shop by Collection</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            Women&apos;s<br />
            <span className="chrome-text">Drops</span>
          </h2>
        </div>
        <a
          href="/collections"
          className="mt-4 md:mt-0 text-[10px] tracking-[0.4em] uppercase text-[#FF3EB5] hover:text-white transition-colors border-b border-[#FF3EB5]/40 pb-0.5 self-start md:self-auto"
        >
          View All Collections →
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[240px] md:auto-rows-[320px]">
        {collections.map((col) => (
          <a
            key={col.id}
            href={`/collections/${col.name.toLowerCase().replace(" ", "-")}`}
            className={`
              relative overflow-hidden card-hover glow-border cursor-pointer
              ${col.size === "large" ? "col-span-2 row-span-1" : "col-span-1"}
              bg-gradient-to-br ${col.bg}
            `}
          >
            {/* Placeholder for product image */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg viewBox="0 0 200 200" className="w-32 h-32" fill="none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={i} transform={`rotate(${i * 45} 100 100)`}>
                    <polygon points="100,20 104,85 100,98 96,85" fill={col.accent} />
                  </g>
                ))}
                <circle cx="100" cy="100" r="22" fill={col.accent} />
                <circle cx="100" cy="100" r="14" fill="#111111" />
              </svg>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-transparent to-transparent" />

            {/* Tag */}
            <div className="absolute top-4 left-4">
              <span
                className="text-[9px] font-black tracking-[0.3em] uppercase px-2.5 py-1"
                style={{ backgroundColor: col.tagColor, color: "#111111" }}
              >
                {col.tag}
              </span>
            </div>

            {/* Rhinestone accents */}
            <div className="absolute top-4 right-4 flex gap-1">
              {["✦", "✧"].map((s, i) => (
                <span
                  key={i}
                  className="text-[#C9922A] text-[10px] sparkle"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Collection info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
              <p className="text-[9px] tracking-[0.4em] uppercase mb-1" style={{ color: col.accent }}>
                {col.subtitle}
              </p>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                {col.name}
              </h3>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#C0C0C0]/60 mt-1">
                {col.items}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
