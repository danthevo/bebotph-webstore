"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    addToCart: (name: string, price: string) => void;
    removeFromCart: (i: number) => void;
    openCart: () => void;
    closeCart: () => void;
    toggleTheme: () => void;
  }
}

export default function Home() {
  useEffect(() => {
    /* ══ CART ══ */
    const cart: { name: string; price: number }[] = [];

    function openCart() {
      document.getElementById("cdrawer")?.classList.add("open");
      document.getElementById("overlay")?.classList.add("on");
    }
    function closeCart() {
      document.getElementById("cdrawer")?.classList.remove("open");
      document.getElementById("overlay")?.classList.remove("on");
    }
    function addToCart(name: string, price: string) {
      cart.push({ name, price: parseFloat(price) });
      renderCart(); showToast(name); setTimeout(openCart, 320);
    }
    function removeFromCart(i: number) { cart.splice(i, 1); renderCart(); }
    function renderCart() {
      const cartCount = document.getElementById("cartCount");
      const empty = document.getElementById("cdEmpty");
      const items = document.getElementById("cdItems");
      const total = document.getElementById("cdTotal");
      if (cartCount) cartCount.textContent = String(cart.length);
      if (cart.length === 0) {
        if (empty) empty.style.display = "flex";
        if (items) items.innerHTML = "";
        if (total) total.textContent = "₱0";
        return;
      }
      if (empty) empty.style.display = "none";
      if (items) {
        items.innerHTML = cart.map((x, i) =>
          `<div class="ci-row"><span class="ci-n">${x.name}</span><span class="ci-p">₱${x.price.toLocaleString()}</span><button class="ci-rm" onclick="window.removeFromCart(${i})">✕</button></div>`
        ).join("");
      }
      if (total) total.textContent = "₱" + cart.reduce((s, x) => s + x.price, 0).toLocaleString();
    }
    function showToast(name: string) {
      const t = document.getElementById("toast");
      const tMsg = document.getElementById("tMsg");
      if (tMsg) tMsg.textContent = name + " added";
      t?.classList.add("on");
      setTimeout(() => t?.classList.remove("on"), 2600);
    }

    window.openCart = openCart;
    window.closeCart = closeCart;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;

    /* ══ HEADER SCROLL ══ */
    const onScroll = () => {
      document.getElementById("hdr")?.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ══ CATEGORY PILLS ══ */
    document.querySelectorAll(".cat-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".cat-pill").forEach((p) => p.classList.remove("on"));
        pill.classList.add("on");
      });
    });

    /* ══ DARK / LIGHT MODE ══ */
    function updateThemeIcons(dark: boolean) {
      const iconLight = document.getElementById("iconLight");
      const iconDark = document.getElementById("iconDark");
      if (iconLight) iconLight.style.opacity = dark ? ".35" : "1";
      if (iconDark) iconDark.style.opacity = dark ? "1" : ".35";
    }
    function toggleTheme() {
      const dark = document.body.classList.toggle("dark");
      localStorage.setItem("bebot-theme", dark ? "dark" : "light");
      updateThemeIcons(dark);
    }
    function initTheme() {
      const saved = localStorage.getItem("bebot-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const dark = saved ? saved === "dark" : prefersDark;
      if (dark) document.body.classList.add("dark");
      updateThemeIcons(dark);
    }
    initTheme();
    window.toggleTheme = toggleTheme;

    /* ══ CATS TRACK DRAG ══ */
    const ct = document.getElementById("catsTrack");
    if (ct) {
      let ctD = false, ctX = 0, ctSL = 0;
      ct.addEventListener("mousedown", (e) => {
        ctD = true; ctX = (e as MouseEvent).pageX; ctSL = ct.scrollLeft;
        ct.classList.add("dragging");
      });
      const onMouseUp = () => { ctD = false; ct.classList.remove("dragging"); };
      const onMouseMove = (e: Event) => {
        if (!ctD) return;
        ct.scrollLeft = ctSL - ((e as MouseEvent).pageX - ctX) * 1.2;
      };
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);
    }

    /* ══ EMAIL FORM ══ */
    const form = document.getElementById("droplistForm") as HTMLFormElement | null;
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailEl = document.getElementById("droplistEmail") as HTMLInputElement;
        const msg = document.getElementById("droplistMsg") as HTMLElement;
        const email = emailEl?.value;
        const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";
        fetch(APPS_SCRIPT_URL, {
          method: "POST",
          body: new URLSearchParams({ email }),
        }).then(() => {
          form.style.display = "none";
          if (msg) msg.style.display = "block";
        }).catch(() => {
          if (msg) { msg.textContent = "Something went wrong. Try again."; msg.style.display = "block"; }
        });
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      delete (window as unknown as Record<string, unknown>).addToCart;
      delete (window as unknown as Record<string, unknown>).removeFromCart;
      delete (window as unknown as Record<string, unknown>).openCart;
      delete (window as unknown as Record<string, unknown>).closeCart;
      delete (window as unknown as Record<string, unknown>).toggleTheme;
      delete (window as unknown as Record<string, unknown>).togglePlay;
      delete (window as unknown as Record<string, unknown>).prevTrack;
      delete (window as unknown as Record<string, unknown>).nextTrack;
      delete (window as unknown as Record<string, unknown>).setVol;
      delete (window as unknown as Record<string, unknown>).seekAudio;
    };
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <div className="overlay" id="overlay" onClick={() => window.closeCart()}></div>
      <div className="toast" id="toast">
        <span className="pk">✓</span>
        <span id="tMsg">Added</span>
      </div>

      {/* ── HEADER ── */}
      <header className="hdr" id="hdr">
        <a className="hdr-logo" href="#">
          <img src="/assets/bebot-logo.png" alt="bebot" />
        </a>
        <nav className="hdr-nav">
          <a href="#recommend">New In</a>
          <a href="#categories">Collections</a>
          <a href="https://www.instagram.com/p/DXJkJbHEflz/?igsh=Ym9rcWw4ajB2Yng2" target="_blank" rel="noopener noreferrer">Events</a>
          <a href="#signup">Contact</a>
        </nav>
        <div className="hdr-actions">
          <div className="theme-toggle-wrap">
            <span className="theme-icon" id="iconLight">☀️</span>
            <button className="theme-toggle" id="themeToggle" onClick={() => window.toggleTheme()} aria-label="Toggle dark mode"></button>
            <span className="theme-icon" id="iconDark">🌙</span>
          </div>
          <button className="btn-cart" onClick={() => window.openCart()}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Cart (<span id="cartCount">0</span>)
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="blob blob-pink-lg"></div>
        <div className="blob blob-pink-sm" style={{ bottom: "8%", left: "52%", animationDelay: "-3s" }}></div>
        <div className="blob blob-bk" style={{ bottom: "-80px", left: "-40px", animationDelay: "-6s" }}></div>

        <div className="hero-left">
          <div className="hero-tag">SS26 Collection</div>
          <h1 className="hero-h1">
            Made for<br />
            every<br />
            <span className="pink">bebot.</span>
          </h1>
          <p className="hero-sub">
            Baby tees, vintage denim, and the spirit of the early 2000s — reborn for those who remember. Y2K streetwear, Manila-made.
          </p>
          <div className="hero-ctas">
            <button
              className="btn btn-solid"
              onClick={() => document.getElementById("recommend")?.scrollIntoView({ behavior: "smooth" })}
            >
              Shop Now →
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img-frame">
            <img
              src="/assets/bebot-tank-1.jpg"
              alt="bebot Baby Tank"
              onError={(e) => { (e.currentTarget as HTMLImageElement).outerHTML = '<div class="hero-img-ph">bebot</div>'; }}
            />
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="categories" id="categories">
        <div className="cats-label">Browse by</div>
        <div className="cats-track" id="catsTrack">
          <div className="cat-pill on"><span className="dot"></span>All</div>
          <div className="cat-pill"><span className="dot"></span>Baby Tees</div>
          <div className="cat-pill"><span className="dot"></span>Accessories</div>
        </div>
      </section>

      {/* ── WE RECOMMEND ── */}
      <section className="recommend" id="recommend">
        <div className="blob blob-cr" style={{ top: "-100px", right: "-80px", zIndex: 0 }}></div>
        <div className="blob blob-pink-sm" style={{ bottom: "80px", left: "-60px", opacity: 0.07, zIndex: 0 }}></div>

        <div className="sec-head">
          <h2 className="sec-title">We <span>Recommend</span></h2>
          <a href="#" className="sec-link">View All →</a>
        </div>

        <div className="prod-grid">
          {/* bebot Baby Tee */}
          <div className="pcard" onClick={() => window.addToCart("bebot Baby Tee", "1000")}>
            <div className="pc-imgs">
              <div className="pc-badge">NEW</div>
              <img className="img1" src="/assets/bebot-baby-tee-1.jpg" alt="bebot Baby Tee"
                onError={(e) => { (e.currentTarget as HTMLImageElement).outerHTML = '<div class="pc-img-ph">bebot</div>'; }} />
              <img className="img2" src="/assets/bebot-baby-tee-2.jpg" alt=""
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              <div className="pc-qa">+ Quick Add</div>
            </div>
            <div className="pc-info">
              <div className="pc-sub">Baby Tee</div>
              <div className="pc-name">bebot Baby Tee</div>
              <div className="pc-price"><span className="p-now">₱1,000</span></div>
            </div>
          </div>

          {/* bebot Tank */}
          <div className="pcard" onClick={() => window.addToCart("bebot Tank", "900")}>
            <div className="pc-imgs">
              <div className="pc-badge">NEW</div>
              <img className="img1" src="/assets/bebot-tank-1.jpg" alt="bebot Tank"
                onError={(e) => { (e.currentTarget as HTMLImageElement).outerHTML = '<div class="pc-img-ph">bebot</div>'; }} />
              <img className="img2" src="/assets/bebot-tank-2.jpg" alt=""
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              <div className="pc-qa">+ Quick Add</div>
            </div>
            <div className="pc-info">
              <div className="pc-sub">Tank</div>
              <div className="pc-name">bebot Tank</div>
              <div className="pc-price"><span className="p-now">₱900</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMAIL SIGNUP ── */}
      <section className="signup" id="signup">
        <div className="signup-tag">Join the Drop List</div>
        <h2 className="signup-h">Get early access to new drops</h2>
        <form className="signup-form" id="droplistForm">
          <input type="email" id="droplistEmail" placeholder="your@email.com" autoComplete="email" />
          <button type="submit">Subscribe</button>
        </form>
        <p id="droplistMsg" style={{ display: "none", marginTop: ".75rem", fontFamily: "var(--fm)", fontSize: "13px", color: "var(--pk)" }}>
          You&apos;re on the list! ✦
        </p>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <span className="f-logo"><img src="/assets/bebot-logo.png" alt="bebot" /></span>
            <p className="f-sub">Y2K reborn. Manila streetwear for those who never let go of the era.</p>
            <div className="socials">
              <a href="#" className="soc" aria-label="Instagram">ig</a>
              <a href="#" className="soc" aria-label="TikTok">tk</a>
            </div>
          </div>
          <div className="f-col">
            <h4>Shop</h4>
            <ul>
              <li><a href="#">New Arrivals</a></li>
            </ul>
          </div>
          <div className="f-col">
            <h4>Info</h4>
            <ul>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bar">
          <span>© 2025 bebot. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>

      {/* ── SPOTIFY PLAYER ── */}
      <div className="player">
        <iframe
          src="https://open.spotify.com/embed/playlist/5fer54vyXk9avMBGtMwX62?utm_source=generator&theme=0"
          width="100%"
          height="80"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      {/* ── CART DRAWER ── */}
      <div className="cdrawer" id="cdrawer" role="dialog" aria-modal={true} aria-label="Shopping cart">
        <div className="cd-hd">
          <div className="cd-title">Cart</div>
          <button className="cd-x" onClick={() => window.closeCart()} aria-label="Close">✕</button>
        </div>
        <div className="cd-body">
          <div className="cd-empty" id="cdEmpty">
            <div className="cd-empty-ico">🛍</div>
            <p>Your cart is empty.</p>
            <button onClick={() => window.closeCart()}>Continue Shopping</button>
          </div>
          <div id="cdItems"></div>
        </div>
        <div className="cd-ft">
          <div className="cd-sub">
            <span className="cd-sub-lbl">Subtotal</span>
            <span className="cd-sub-amt" id="cdTotal">₱0</span>
          </div>
          <button className="cd-checkout">Checkout →</button>
        </div>
      </div>

    </>
  );
}
