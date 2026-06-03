import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import Features from "@/components/sections/Features";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <TrustBar />

      <Features />

      <Footer />
    </>
  );
}