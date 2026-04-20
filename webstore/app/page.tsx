"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    openReserve: (name: string, price: string) => void;
    closeReserve: () => void;
    selectSize: (btn: HTMLButtonElement, size: string) => void;
    submitReserve: (type: string) => void;
    toggleTheme: () => void;
  }
}

export default function Home() {
  useEffect(() => {
    /* ══ RESERVATION ══ */
    let rvItem = { name: "", price: "" };
    let rvSize = "";

    function openReserve(name: string, price: string) {
      rvItem = { name, price };
      rvSize = "";
      const nameEl = document.getElementById("rvItemName");
      const priceEl = document.getElementById("rvItemPrice");
      const nameInput = document.getElementById("rvNameInput") as HTMLInputElement;
      const phoneInput = document.getElementById("rvPhone") as HTMLInputElement;
      if (nameEl) nameEl.textContent = name;
      if (priceEl) priceEl.textContent = "₱" + parseInt(price).toLocaleString();
      if (nameInput) nameInput.value = "";
      if (phoneInput) phoneInput.value = "";
      document.querySelectorAll(".rv-sz").forEach(b => b.classList.remove("on"));
      const success = document.getElementById("rvSuccess");
      const form = document.getElementById("rvForm");
      if (success) success.style.display = "none";
      if (form) form.style.display = "block";
      document.getElementById("rdrawer")?.classList.add("open");
      document.getElementById("overlay")?.classList.add("on");
    }
    function closeReserve() {
      document.getElementById("rdrawer")?.classList.remove("open");
      document.getElementById("overlay")?.classList.remove("on");
    }
    function selectSize(btn: HTMLButtonElement, size: string) {
      rvSize = size;
      document.querySelectorAll(".rv-sz").forEach(b => b.classList.remove("on"));
      btn.classList.add("on");
    }
    const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";

    function submitReserve(type: string) {
      const nameInput = document.getElementById("rvNameInput") as HTMLInputElement;
      const contactInput = document.getElementById("rvPhone") as HTMLInputElement;
      const errEl = document.getElementById("rvErr");
      const submitBtns = document.querySelectorAll<HTMLButtonElement>(".rv-btn");
      const name = nameInput?.value.trim();
      const contact = contactInput?.value.trim();
      if (!name || !contact || !rvSize) {
        if (errEl) { errEl.textContent = "Please fill in all fields and select a size."; errEl.style.display = "block"; }
        return;
      }
      if (errEl) errEl.style.display = "none";
      submitBtns.forEach(b => { b.disabled = true; b.style.opacity = ".5"; });

      const payload = { name, contact, size: rvSize, item: rvItem.name, price: rvItem.price, type, event: "April 25 2026" };

      fetch(APPS_SCRIPT_URL, { method: "POST", body: JSON.stringify(payload) })
        .catch(() => {/* silent fail — still show success */})
        .finally(() => {
          submitBtns.forEach(b => { b.disabled = false; b.style.opacity = "1"; });
          const success = document.getElementById("rvSuccess");
          const form = document.getElementById("rvForm");
          const typeEl = document.getElementById("rvSuccessType");
          const msgEl = document.getElementById("rvSuccessMsg");
          if (form) form.style.display = "none";
          if (success) success.style.display = "flex";
          if (typeEl) typeEl.textContent = type === "pickup" ? "You're reserved! 🎉" : "You're on the waitlist! ✦";
          if (msgEl) msgEl.innerHTML = type === "pickup"
            ? `<strong>${rvItem.name}</strong> · Size ${rvSize}<br><br>Bebot Party · April 25, 2026<br>Annex · 5638 Don Pedro, Makati City<br>1209 Metro Manila · After 5pm<br><br>Pay at the door — see you there!`
            : `<strong>${rvItem.name}</strong> · Size ${rvSize}<br><br>We'll reach out via ${contact.includes("@") ? "email" : "Viber/phone"} to confirm payment details.`;
        });
    }

    window.openReserve = openReserve;
    window.closeReserve = closeReserve;
    window.selectSize = selectSize;
    window.submitReserve = submitReserve;

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
      delete (window as unknown as Record<string, unknown>).openReserve;
      delete (window as unknown as Record<string, unknown>).closeReserve;
      delete (window as unknown as Record<string, unknown>).selectSize;
      delete (window as unknown as Record<string, unknown>).submitReserve;
      delete (window as unknown as Record<string, unknown>).toggleTheme;
    };
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <div className="overlay" id="overlay" onClick={() => window.closeReserve()}></div>
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
        </div>
      </section>

      {/* ── WE RECOMMEND ── */}
      <section className="recommend" id="recommend">
        <div className="blob blob-cr" style={{ top: "-100px", right: "-80px", zIndex: 0 }}></div>
        <div className="blob blob-pink-sm" style={{ bottom: "80px", left: "-60px", opacity: 0.07, zIndex: 0 }}></div>

        <div className="sec-head">
          <h2 className="sec-title">We <span>Recommend</span></h2>
        </div>

        <div className="prod-grid">
          {/* bebot Baby Tee */}
          <div className="pcard" onClick={() => window.openReserve("bebot Baby Tee", "1000")}>
            <div className="pc-imgs">
              <div className="pc-badge">NEW</div>
              <img className="img1" src="/assets/bebot-baby-tee-1.jpg" alt="bebot Baby Tee"
                onError={(e) => { (e.currentTarget as HTMLImageElement).outerHTML = '<div class="pc-img-ph">bebot</div>'; }} />
              <img className="img2" src="/assets/bebot-baby-tee-2.jpg" alt=""
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              <div className="pc-qa">+ Reserve</div>
            </div>
            <div className="pc-info">
              <div className="pc-sub">Baby Tee</div>
              <div className="pc-name">bebot Baby Tee</div>
              <div className="pc-price"><span className="p-now">₱1,000</span></div>
            </div>
          </div>

          {/* bebot Tank */}
          <div className="pcard" onClick={() => window.openReserve("bebot Tank", "900")}>
            <div className="pc-imgs">
              <div className="pc-badge">NEW</div>
              <img className="img1" src="/assets/bebot-tank-1.jpg" alt="bebot Tank"
                onError={(e) => { (e.currentTarget as HTMLImageElement).outerHTML = '<div class="pc-img-ph">bebot</div>'; }} />
              <img className="img2" src="/assets/bebot-tank-2.jpg" alt=""
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              <div className="pc-qa">+ Reserve</div>
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
              <a href="https://www.instagram.com/bebot.ph" target="_blank" rel="noopener noreferrer" className="soc" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@bebot.ph" target="_blank" rel="noopener noreferrer" className="soc" aria-label="TikTok">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.84 4.84 0 01-1.02-.09z"/></svg>
              </a>
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
          <span>© 2026 bebot. All rights reserved.</span>
          <span><a href="/privacy" style={{color:"inherit"}}>Privacy</a> · <a href="/terms" style={{color:"inherit"}}>Terms</a></span>
        </div>
      </footer>

      {/* ── SPOTIFY PLAYER ── */}
      <div className="player">
        <iframe
          src="https://open.spotify.com/embed/playlist/5fer54vyXk9avMBGtMwX62?utm_source=generator&theme=0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      {/* ── RESERVATION DRAWER ── */}
      <div className="cdrawer" id="rdrawer" role="dialog" aria-modal={true} aria-label="Reserve item">
        <div className="cd-hd">
          <div className="cd-title">Reserve</div>
          <button className="cd-x" onClick={() => window.closeReserve()} aria-label="Close">✕</button>
        </div>

        {/* form state */}
        <div id="rvForm">
          <div className="cd-body rv-body">
            <div className="rv-item">
              <div className="rv-item-name" id="rvItemName"></div>
              <div className="rv-item-price" id="rvItemPrice"></div>
            </div>

            <div className="rv-field">
              <label className="rv-label">Size</label>
              <div className="rv-sizes">
                {["S","M","L","XL"].map(s => (
                  <button key={s} className="rv-sz" onClick={(e) => window.selectSize(e.currentTarget as HTMLButtonElement, s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className="rv-field">
              <label className="rv-label">Name</label>
              <input id="rvNameInput" className="rv-input" type="text" placeholder="Your name" />
            </div>

            <div className="rv-field">
              <label className="rv-label">Phone / Viber / Email</label>
              <input id="rvPhone" className="rv-input" type="text" placeholder="+63 9XX XXX XXXX or email" />
            </div>

            <div className="rv-pickup-info">
              <div className="rv-pi-icon">📍</div>
              <div>
                <div className="rv-pi-title">Bebot Party · April 25, 2026</div>
                <div className="rv-pi-addr">Annex · 5638 Don Pedro<br />Makati City, 1209 Metro Manila</div>
                <div className="rv-pi-time">After 5pm · Cash payment at door</div>
              </div>
            </div>

            <div id="rvErr" className="rv-err" style={{display:"none"}}></div>
          </div>

          <div className="cd-ft rv-ft">
            <button className="rv-btn rv-pickup" onClick={() => window.submitReserve("pickup")}>Reserve for Pickup →</button>
            <button className="rv-btn rv-waitlist" onClick={() => window.submitReserve("waitlist")}>Join Waitlist</button>
          </div>
        </div>

        {/* success state */}
        <div id="rvSuccess" className="rv-success" style={{display:"none"}}>
          <div className="rv-success-icon">✦</div>
          <div className="rv-success-type" id="rvSuccessType"></div>
          <div className="rv-success-msg" id="rvSuccessMsg"></div>
          <button className="rv-btn rv-pickup" style={{marginTop:"1.5rem"}} onClick={() => window.closeReserve()}>Done</button>
        </div>
      </div>

    </>
  );
}
