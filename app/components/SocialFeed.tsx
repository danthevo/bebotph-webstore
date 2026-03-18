const feedItems = [
  { id: 1, type: "image", platform: "instagram", col: "col-span-1 row-span-2", bg: "from-[#7B1A2E] to-[#0D1B4B]" },
  { id: 2, type: "image", platform: "tiktok", col: "col-span-1 row-span-1", bg: "from-[#0D1B4B] to-[#1A55C8]/40" },
  { id: 3, type: "video", platform: "tiktok", col: "col-span-1 row-span-1", bg: "from-[#111111] to-[#FF3EB5]/10" },
  { id: 4, type: "image", platform: "instagram", col: "col-span-1 row-span-1", bg: "from-[#3a1a3a] to-[#111111]" },
  { id: 5, type: "image", platform: "instagram", col: "col-span-1 row-span-1", bg: "from-[#0D1B4B] to-[#111111]" },
];

const platformIcon = (platform: string) => {
  if (platform === "tiktok") return "TT";
  return "IG";
};

export default function SocialFeed() {
  return (
    <section className="px-4 md:px-8 py-20 bg-[#0a0a0a]">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9922A] mb-2">✦ The Feed</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            The Crew<br />
            <span className="chrome-text">IRL</span>
          </h2>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0 self-start md:self-auto">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.4em] uppercase text-[#C0C0C0] hover:text-[#FF3EB5] transition-colors"
          >
            @bebotph ↗
          </a>
        </div>
      </div>

      {/* Masonry feed grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 auto-rows-[140px] md:auto-rows-[200px]">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className={`${item.col} relative overflow-hidden glow-border cursor-pointer group bg-gradient-to-br ${item.bg}`}
          >
            {/* Placeholder pattern */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-12 h-12 rounded-full bg-[#FF3EB5]" />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#FF3EB5]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Platform badge */}
            <div className="absolute top-2 left-2">
              <span className="text-[8px] font-black tracking-[0.2em] px-1.5 py-0.5 bg-[#111111]/80 text-[#FF3EB5]">
                {platformIcon(item.platform)}
              </span>
            </div>

            {/* Video indicator */}
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#111111]/60 flex items-center justify-center">
                  <span className="text-white text-xs ml-0.5">▶</span>
                </div>
              </div>
            )}

            {/* Rhinestone */}
            <span className="absolute bottom-2 right-2 text-[#C9922A] text-[8px] opacity-50">✦</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <a
          href="/social"
          className="inline-block px-8 py-3 border border-[#FF3EB5]/30 text-[#FF3EB5] text-[10px] font-black tracking-[0.4em] uppercase hover:bg-[#FF3EB5]/5 hover:border-[#FF3EB5] transition-all"
        >
          See Full Feed →
        </a>
      </div>
    </section>
  );
}
