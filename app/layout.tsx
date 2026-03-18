import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BEBOTPH — Filipino-American Streetwear",
  description: "Women's streetwear rooted in early-2000s Fil-Am culture. Jeepney energy. Suki vibes. All pink everything.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased bg-[#111111] text-white`}>
        {children}
      </body>
    </html>
  );
}
