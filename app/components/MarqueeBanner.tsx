export default function MarqueeBanner() {
  const items = [
    "BEBOTPH",
    "✦",
    "PILIPINA",
    "✦",
    "BEBOT",
    "✦",
    "JEEPNEY GIRL",
    "✦",
    "LATE NITE KAIN",
    "✦",
    "DALY CITY",
    "✦",
    "SUKI ENERGY",
    "✦",
    "Y2K FOREVER",
    "✦",
  ];

  const repeated = [...items, ...items];

  return (
    <div className="overflow-hidden bg-[#FF3EB5] py-2.5 border-y border-[#FF1493]">
      <div className="marquee-track flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="mx-6 text-[#111111] text-xs font-black tracking-[0.25em] uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
