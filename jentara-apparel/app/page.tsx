// app/page.tsx

import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import Features from "@/components/sections/Features";
import NewArrivals from "@/components/sections/NewArrivals";
import ViewGrab from "@/components/sections/ViewGrab";
import Testimonials from "@/components/sections/Testimonials";
import InstagramSection from "@/components/sections/InstagramSection";
import ServiceBenefits from "@/components/sections/ServiceBenefits";

import { getAllProducts } from "@/lib/supabase/admin-products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let products = [];

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error(
      "HOME PRODUCTS ERROR:",
      error
    );
  }

  return (
    <main className="overflow-hidden bg-[#f5ede4] text-[#451713]">
      <HeroSection products={products} />

      <TrustBar />

      <Features />

      <NewArrivals products={products} />

      <ViewGrab products={products} />

      <Testimonials />

      <InstagramSection />

      <ServiceBenefits />
    </main>
  );
}