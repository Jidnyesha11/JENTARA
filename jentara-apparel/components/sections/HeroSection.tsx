// components/sections/HeroSection.tsx

import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  image_url: string | null;
  price: number;
  featured: boolean | null;
}

interface HeroSectionProps {
  products: Product[];
}

export default function HeroSection({
  products,
}: HeroSectionProps) {
  const heroProduct =
    products.find(
      (product) =>
        product.featured &&
        product.image_url
    ) ??
    products.find(
      (product) => product.image_url
    );

  return (
    <section className="bg-[#f5ede4]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        <div className="grid min-h-[calc(100svh-82px)] lg:grid-cols-[0.82fr_1.18fr]">

          {/* =====================================================
              LEFT
          ===================================================== */}

          <div className="flex flex-col justify-center py-16 sm:py-20 lg:py-24 lg:pr-14">

            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#451713]" />

              <p className="text-[8px] font-semibold uppercase tracking-[0.35em]">
                Star of the New Generation
              </p>
            </div>

            <h1
              className="
                mt-7
                font-serif
                text-[72px]
                leading-[0.76]
                tracking-[-0.085em]
                sm:text-[100px]
                md:text-[120px]
                lg:text-[135px]
              "
            >
              JENTARA
            </h1>

            <p className="mt-8 max-w-[430px] text-[15px] leading-7 text-[#451713]/65 sm:text-[17px]">
              Modern streetwear.
              <br />
              Premium fits.
              <br />
              Bold identity.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="
                  group
                  inline-flex
                  items-center
                  gap-8
                  bg-[#451713]
                  px-6
                  py-4
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#f5ede4]
                  transition-all
                  duration-300
                  hover:bg-[#641f18]
                "
              >
                Shop The Drop

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/about"
                className="
                  inline-flex
                  items-center
                  border
                  border-[#451713]/25
                  px-6
                  py-4
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  transition-all
                  duration-300
                  hover:border-[#451713]
                "
              >
                Our Story
              </Link>
            </div>

            <div className="mt-12 grid max-w-[440px] grid-cols-3 border-t border-[#451713]/15 pt-5">
              <div>
                <p className="font-serif text-xl">
                  01
                </p>

                <p className="mt-1 text-[7px] uppercase tracking-[0.15em] text-[#451713]/45">
                  Premium
                </p>
              </div>

              <div>
                <p className="font-serif text-xl">
                  02
                </p>

                <p className="mt-1 text-[7px] uppercase tracking-[0.15em] text-[#451713]/45">
                  Oversized
                </p>
              </div>

              <div>
                <p className="font-serif text-xl">
                  03
                </p>

                <p className="mt-1 text-[7px] uppercase tracking-[0.15em] text-[#451713]/45">
                  Original
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT IMAGE
          ===================================================== */}

          <div className="relative min-h-[560px] py-5 lg:min-h-0 lg:py-8">

            <div className="relative h-full min-h-[560px] overflow-hidden bg-[#d7d0c8]">

              {heroProduct?.image_url ? (
                <Image
                  src={heroProduct.image_url}
                  alt={heroProduct.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="
                    object-cover
                    object-center
                    transition-transform
                    duration-1000
                    hover:scale-[1.025]
                  "
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#d8cec5] via-[#eee6de] to-[#b9aaa0]">
                  <div className="absolute inset-[8%] border border-[#451713]/15" />

                  <div className="absolute left-[10%] top-[13%]">
                    <p className="font-serif text-[90px] leading-none tracking-[-0.08em] text-[#451713]/20 sm:text-[130px]">
                      J
                    </p>
                  </div>

                  <div className="absolute bottom-[10%] right-[9%] text-right">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/40">
                      Born From An Idea
                    </p>

                    <p className="mt-2 font-serif text-4xl text-[#451713]/30">
                      2026
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#f5ede4]">
                <div>
                  <p className="text-[7px] font-semibold uppercase tracking-[0.3em]">
                    JENTARA / 001
                  </p>

                  <p className="mt-2 font-serif text-2xl tracking-[-0.04em]">
                    Born From An Idea
                  </p>
                </div>

                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f5ede4]/50">
                  ↓
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}