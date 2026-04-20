import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bebot",
  description: "Y2K reborn. Manila streetwear for those who never let go of the era.",
  openGraph: {
    title: "bebot",
    description: "Y2K reborn. Manila streetwear for those who never let go of the era.",
    url: "https://www.bebot.ph",
    siteName: "bebot",
    images: [
      {
        url: "https://www.bebot.ph/assets/sam-aplfi-outside.jpg",
        width: 1200,
        height: 800,
        alt: "bebot — Y2K reborn, Manila streetwear",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bebot",
    description: "Y2K reborn. Manila streetwear for those who never let go of the era.",
    images: ["https://www.bebot.ph/assets/sam-aplfi-outside.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playbill&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
