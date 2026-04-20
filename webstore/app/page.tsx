"use client";
import Image from "next/image";
import { useState } from "react";

const products = [
  {
    name: "bebot baby tee",
    price: 1000,
    images: [
      "/products/baby-tee/1.jpg",
      "/products/baby-tee/2.jpg",
      "/products/baby-tee/3.jpg",
    ],
  },
  {
    name: "bebot tank",
    price: 900,
    images: [
      "/products/tank/1.jpg",
      "/products/tank/2.jpg",
      "/products/tank/3.jpg",
    ],
  },
];

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-[#f0e8e4]">
        <Image
          src={product.images[active]}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-3">
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-14 h-14 rounded overflow-hidden border-2 transition-colors ${
              active === i ? "border-[#F887AE]" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`${product.name} view ${i + 1}`}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      <p
        className="mt-4 text-center text-sm uppercase tracking-widest"
        style={{ fontFamily: "Verdana, sans-serif", color: "#532C23" }}
      >
        {product.name}
      </p>
      <p className="mt-1 text-lg font-semibold" style={{ color: "#F887AE" }}>
        ₱{product.price.toLocaleString()}
      </p>
      <button
        className="mt-3 w-full rounded-full py-2 text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-80"
        style={{
          backgroundColor: "#532C23",
          fontFamily: "Verdana, sans-serif",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff8f9] px-6 py-12">
      <h1
        className="mb-10 text-center text-4xl tracking-widest uppercase"
        style={{ fontFamily: "Playbill, serif", color: "#532C23" }}
      >
        bebot
      </h1>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.name} product={p} />
        ))}
      </div>
    </main>
  );
}
