// app/layout.tsx

import "./globals.css";

import type { Metadata } from "next";

import {
  Playfair_Display,
  Poppins,
} from "next/font/google";

import SiteChrome from "@/components/layout/SiteChrome";

export const playfair =
  Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
  });

export const poppins =
  Poppins({
    subsets: ["latin"],
    weight: [
      "300",
      "400",
      "500",
      "600",
      "700",
    ],
    variable: "--font-poppins",
  });

export const metadata: Metadata = {
  title: "Jentara Apparel",
  description:
    "Premium Streetwear Brand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${poppins.variable}`}
    >
      <body
        className={`
          ${poppins.className}
          bg-[#f5ede4]
          text-[#151a2a]
          antialiased
        `}
      >
        <SiteChrome>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}