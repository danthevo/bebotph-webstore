export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#FF3EB5]/10">

      {/* Email signup bar */}
      <div className="bg-[#FF3EB5] py-10 px-6 text-center">
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#111111]/60 mb-2">
          ✦ Join the Crew ✦
        </p>
        <h3 className="text-[#111111] font-black uppercase text-2xl md:text-3xl tracking-tight mb-6">
          Get Early Access to Every Drop
        </h3>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-5 py-3 bg-[#111111] text-white text-xs tracking-widest placeholder:text-[#C0C0C0]/50 outline-none border border-transparent focus:border-white/20"
          />
          <button
            type="submit"
            className="whitespace-nowrap px-8 py-3 bg-[#111111] text-[#FF3EB5] text-[10px] font-black tracking-[0.3em] uppercase hover:bg-[#1a1a1a] transition-colors"
          >
            Join →
          </button>
        </form>
      </div>

      {/* Footer links */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <span className="chrome-text font-black text-xl tracking-[0.15em] uppercase block mb-3">
            BEBOTPH
          </span>
          <p className="text-[11px] text-[#C0C0C0]/50 leading-relaxed max-w-[180px]">
            Filipino-American streetwear. For the girl who knows.
          </p>
          <div className="flex gap-3 mt-4">
            {["IG", "TT", "YT"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[9px] font-black tracking-[0.2em] text-[#C0C0C0]/50 hover:text-[#FF3EB5] transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="text-[9px] font-black tracking-[0.4em] uppercase text-[#C9922A] mb-4">Shop</p>
          <ul className="space-y-2.5">
            {["New Arrivals", "Women's", "Collections", "Sale"].map((link) => (
              <li key={link}>
                <a href="#" className="text-[11px] text-[#C0C0C0]/60 hover:text-[#FF3EB5] tracking-wider transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <p className="text-[9px] font-black tracking-[0.4em] uppercase text-[#C9922A] mb-4">Info</p>
          <ul className="space-y-2.5">
            {["Our Story", "Sizing Guide", "Shipping", "Returns"].map((link) => (
              <li key={link}>
                <a href="#" className="text-[11px] text-[#C0C0C0]/60 hover:text-[#FF3EB5] tracking-wider transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[9px] font-black tracking-[0.4em] uppercase text-[#C9922A] mb-4">Contact</p>
          <ul className="space-y-2.5">
            {["hello@bebot.ph", "FAQ", "Wholesale", "Press"].map((link) => (
              <li key={link}>
                <a href="#" className="text-[11px] text-[#C0C0C0]/60 hover:text-[#FF3EB5] tracking-wider transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#FF3EB5]/10 px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#C0C0C0]/30">
          © 2025 BEBOTPH. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map((link) => (
            <a key={link} href="#" className="text-[9px] tracking-[0.3em] uppercase text-[#C0C0C0]/30 hover:text-[#FF3EB5] transition-colors">
              {link}
            </a>
          ))}
        </div>
        <p className="text-[9px] tracking-[0.2em] text-[#C0C0C0]/20">
          ✦ Daly City DNA ✦
        </p>
      </div>
    </footer>
  );
}
