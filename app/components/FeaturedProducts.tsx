const products = [
  {
    id: 1,
    name: "Racing Crop Set",
    price: "$128",
    tag: "New",
    colors: ["#FF3EB5", "#1A55C8", "#0D1B4B"],
    sold: false,
  },
  {
    id: 2,
    name: "OG Hoodie",
    price: "$98",
    tag: "Bestseller",
    colors: ["#111111", "#7B1A2E"],
    sold: false,
  },
  {
    id: 3,
    name: "Barong Halter",
    price: "$88",
    tag: "Limited",
    colors: ["#F5E6C8", "#FF3EB5"],
    sold: true,
  },
  {
    id: 4,
    name: "Baby Tee — Bebot",
    price: "$48",
    tag: null,
    colors: ["#111111", "#FF3EB5", "#0D1B4B"],
    sold: false,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="px-4 md:px-8 py-20 bg-[#0a0a0a]">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9922A] mb-2">✦ Just Dropped</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            Featured<br />
            <span className="pink-glow">Pieces</span>
          </h2>
        </div>
        <a
          href="/products"
          className="mt-4 md:mt-0 text-[10px] tracking-[0.4em] uppercase text-[#FF3EB5] hover:text-white transition-colors border-b border-[#FF3EB5]/40 pb-0.5 self-start md:self-auto"
        >
          Shop All →
        </a>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            {/* Image placeholder */}
            <div className="relative aspect-[3/4] bg-[#1a1a1a] overflow-hidden glow-border mb-3">

              {/* Placeholder visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-16 h-16 rounded-full opacity-20"
                  style={{ backgroundColor: product.colors[0] }}
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#FF3EB5]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Tag */}
              {product.tag && (
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-black tracking-[0.2em] uppercase px-2 py-1 bg-[#FF3EB5] text-[#111111]">
                    {product.tag}
                  </span>
                </div>
              )}

              {/* Sold out */}
              {product.sold && (
                <div className="absolute inset-0 bg-[#111111]/60 flex items-center justify-center">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#C0C0C0]">
                    Sold Out
                  </span>
                </div>
              )}

              {/* Quick add — appears on hover */}
              {!product.sold && (
                <button className="absolute bottom-0 left-0 right-0 py-3 bg-[#FF3EB5] text-[#111111] text-[9px] font-black tracking-[0.3em] uppercase translate-y-full group-hover:translate-y-0 transition-transform">
                  Quick Add
                </button>
              )}

              {/* Rhinestone corner */}
              <span className="absolute top-3 right-3 text-[#C9922A] text-[10px] sparkle opacity-60">✦</span>
            </div>

            {/* Product info */}
            <div className="px-0.5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white truncate pr-2">
                  {product.name}
                </h3>
                <span className="text-xs font-black text-[#FF3EB5] whitespace-nowrap">
                  {product.price}
                </span>
              </div>

              {/* Color swatches */}
              <div className="flex gap-1.5 mt-1.5">
                {product.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full border border-white/20 cursor-pointer hover:scale-125 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
