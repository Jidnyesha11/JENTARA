import "./globals.css";
import type { Metadata } from "next";

import { Playfair_Display, Poppins } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jentara Apparel",
  description: "Premium Streetwear Brand",
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
    >
      <body>{children}</body>
    </html>
  );
}