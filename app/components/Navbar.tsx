"use client";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#111111]/80 backdrop-blur-md border-b border-[#FF3EB5]/20">
      {/* Left nav */}
      <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase text-[#C0C0C0]">
        <a href="/collections" className="hover:text-[#FF3EB5] transition-colors">Shop</a>
        <a href="/collections" className="hover:text-[#FF3EB5] transition-colors">Collections</a>
        <a href="/social" className="hover:text-[#FF3EB5] transition-colors">Feed</a>
      </div>

      {/* Logo / Wordmark */}
      <a href="/" className="absolute left-1/2 -translate-x-1/2">
        <span className="chrome-text font-black text-2xl tracking-[0.15em] uppercase">
          BEBOTPH
        </span>
      </a>

      {/* Right nav */}
      <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase text-[#C0C0C0]">
        <a href="/about" className="hover:text-[#FF3EB5] transition-colors">Story</a>
        <a href="/cart" className="relative hover:text-[#FF3EB5] transition-colors">
          Bag
          <span className="absolute -top-1 -right-3 w-4 h-4 rounded-full bg-[#FF3EB5] text-[#111111] text-[9px] font-bold flex items-center justify-center">
            0
          </span>
        </a>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden ml-auto text-[#C0C0C0] hover:text-[#FF3EB5]"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#111111] border-t border-[#FF3EB5]/20 flex flex-col items-center gap-6 py-8 text-sm tracking-[0.2em] uppercase text-[#C0C0C0]">
          <a href="/collections" className="hover:text-[#FF3EB5]">Shop</a>
          <a href="/collections" className="hover:text-[#FF3EB5]">Collections</a>
          <a href="/social" className="hover:text-[#FF3EB5]">Feed</a>
          <a href="/about" className="hover:text-[#FF3EB5]">Story</a>
          <a href="/cart" className="hover:text-[#FF3EB5]">Bag (0)</a>
        </div>
      )}
    </nav>
  );
}
