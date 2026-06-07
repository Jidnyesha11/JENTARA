import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import Features from "@/components/sections/Features";
import NewArrivals from "@/components/sections/NewArrivals";
import Testimonials from "@/components/sections/Testimonials";
import InstagramSection from "@/components/sections/InstagramSection";
import Newsletter from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <TrustBar />

      <Features />

      <NewArrivals />

      <Testimonials />

      <InstagramSection />

      <Newsletter />

      <Footer />
    </>
  );
}