// app/about/page.tsx

import Link from "next/link";

const values = [
  {
    number: "01",
    title: "Individuality",
    text: "We don't believe you were made to blend in. Your style should feel like you.",
  },
  {
    number: "02",
    title: "Ambition",
    text: "For the ones building something, chasing something, and refusing to stay ordinary.",
  },
  {
    number: "03",
    title: "Authenticity",
    text: "No pretending. No forced identity. Just pieces that let your real personality show.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#4b1712]">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8">
        {/* =======================================================
            HERO
        ======================================================= */}

        <section className="pt-8 md:pt-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#4b1712]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.35em]">
                  Star of the New Generation
                </p>
              </div>

              <h1
                className="
                  font-serif
                  text-[64px]
                  leading-[0.8]
                  tracking-[-0.07em]
                  sm:text-[82px]
                  md:text-[110px]
                  lg:text-[135px]
                "
              >
                ABOUT US
              </h1>
            </div>

            <p className="max-w-[250px] pb-1 text-[11px] leading-6 text-[#4b1712]/60 md:text-right">
              Four young creators.
              <br />
              One shared vision.
              <br />
              A new generation.
            </p>
          </div>

          <div className="group relative mt-8 overflow-hidden rounded-[20px] border border-[#4b1712]/10 bg-[#d7d1ca]">
            <div className="flex h-[180px] items-center justify-center transition-transform duration-700 group-hover:scale-[1.015] sm:h-[230px] md:h-[320px]">
              <div className="text-center">
                <p
                  className="
                    font-serif
                    text-[52px]
                    tracking-[-0.07em]
                    text-[#4b1712]/20
                    sm:text-[72px]
                    md:text-[100px]
                  "
                >
                  JENTARA
                </p>

                <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.4em] text-[#4b1712]/30">
                  Born From An Idea
                </p>
              </div>
            </div>

            <div className="absolute bottom-4 left-5 flex items-center gap-3">
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#4b1712]/50">
                EST. 2026
              </span>

              <span className="h-px w-8 bg-[#4b1712]/30" />

              <span className="text-[8px] uppercase tracking-[0.25em] text-[#4b1712]/50">
                INDIA
              </span>
            </div>
          </div>
        </section>

        {/* =======================================================
            TRUST STRIP
        ======================================================= */}

        <section className="mt-5 border-y border-[#4b1712]/25">
          <div className="grid md:grid-cols-3">
            {[
              "✓ 100% Genuine Product",
              "◇ Premium Quality",
              "🔒 100% Secure Payment",
            ].map((item, index) => (
              <div
                key={item}
                className={`
                  px-4
                  py-3.5
                  text-center
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  ${
                    index !== 2
                      ? "border-b border-[#4b1712]/20 md:border-b-0 md:border-r"
                      : ""
                  }
                `}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* =======================================================
            INTRODUCTION
        ======================================================= */}

        <section className="py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:gap-20">
            <div>
              <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#4b1712]/50">
                The Story
              </p>

              <h2
                className="
                  max-w-[850px]
                  font-serif
                  text-[31px]
                  leading-[1.02]
                  tracking-[-0.04em]
                  sm:text-[38px]
                  md:text-[46px]
                "
              >
                JENTARA was founded in 2026 by four young creators driven by
                one vision—to build a brand that represents the spirit of a
                new generation.
              </h2>
            </div>

            <div className="flex items-end">
              <div>
                <span className="mb-5 block font-serif text-3xl">
                  “
                </span>

                <p className="text-[13px] leading-[1.8] text-[#4b1712]/70">
                  We believe clothing is more than what you wear. It is a
                  reflection of ambition, confidence, creativity, and
                  identity. Every piece we create is designed to help you
                  express who you are and who you aspire to become.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            OUR VISION / PRODUCTS
        ======================================================= */}

        <section className="border-t border-[#4b1712]/30">
          <div className="grid md:grid-cols-2">
            <article className="border-b border-[#4b1712]/30 py-9 md:border-b-0 md:border-r md:pr-14">
              <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#4b1712]" />

                  <h2 className="text-[9px] font-semibold uppercase tracking-[0.22em]">
                    Our Vision
                  </h2>
                </div>

                <span className="font-serif text-xl">
                  01
                </span>
              </div>

              <p
                className="
                  max-w-[600px]
                  font-serif
                  text-[30px]
                  leading-[1.02]
                  tracking-[-0.04em]
                  sm:text-[37px]
                  md:text-[42px]
                "
              >
                In a world full of trends, JENTARA stands for individuality.
              </p>

              <p className="mt-8 max-w-[500px] text-[12px] leading-[1.8] text-[#4b1712]/65">
                We do not want you to dress like everyone else. We want you to
                feel more like yourself.
              </p>
            </article>

            <article className="py-9 md:pl-14">
              <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#4b1712]" />

                  <h2 className="text-[9px] font-semibold uppercase tracking-[0.22em]">
                    Our Products
                  </h2>
                </div>

                <span className="font-serif text-xl">
                  02
                </span>
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <p className="text-[12px] leading-[1.8] text-[#4b1712]/75">
                  Every JENTARA piece is crafted with purpose.
                </p>

                <p className="text-[12px] leading-[1.8] text-[#4b1712]/75">
                  From premium fabrics and comfortable oversized fits to clean
                  aesthetics and meaningful designs, we focus on creating
                  apparel that balances style, comfort, and self-expression.
                </p>
              </div>

              <Link
                href="/shop"
                className="
                  group
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  border-b
                  border-[#4b1712]
                  pb-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                "
              >
                Explore The Collection

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>

              <div className="group mt-8 overflow-hidden rounded-[16px] bg-[#d7d1ca]">
                <div className="flex h-[210px] items-center justify-center transition-transform duration-700 group-hover:scale-[1.03] sm:h-[250px]">
                  <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#4b1712]/30">
                    Product Visual
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* =======================================================
            VALUES
        ======================================================= */}

        <section className="border-t border-[#4b1712]/30 py-14 md:py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em]">
                What We Stand For
              </p>

              <h2
                className="
                  font-serif
                  text-[42px]
                  leading-[0.9]
                  tracking-[-0.05em]
                  sm:text-[52px]
                "
              >
                More Than Clothes.
              </h2>
            </div>

            <p className="max-w-[300px] text-[11px] leading-6 text-[#4b1712]/60 md:text-right">
              A mindset. A community. A way of showing up in the world.
            </p>
          </div>

          <div className="grid border-t border-[#4b1712]/25 md:grid-cols-3">
            {values.map((value, index) => (
              <article
                key={value.number}
                className={`
                  group
                  py-7
                  ${
                    index !== values.length - 1
                      ? "border-b border-[#4b1712]/25 md:border-b-0 md:border-r"
                      : ""
                  }
                  ${index > 0 ? "md:pl-8" : ""}
                  ${index < values.length - 1 ? "md:pr-8" : ""}
                `}
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-serif text-2xl transition-transform duration-300 group-hover:-translate-y-1">
                    {value.number}
                  </span>

                  <span className="h-px w-10 bg-[#4b1712]/30 transition-all duration-300 group-hover:w-16 group-hover:bg-[#4b1712]" />
                </div>

                <h3 className="font-serif text-3xl tracking-[-0.03em]">
                  {value.title}
                </h3>

                <p className="mt-4 max-w-[300px] text-[12px] leading-[1.8] text-[#4b1712]/65">
                  {value.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* =======================================================
            INSPIRATION / COMMUNITY
        ======================================================= */}

        <section className="border-t border-[#4b1712]/30">
          <div className="grid md:grid-cols-2">
            <article className="border-b border-[#4b1712]/30 py-10 md:border-b-0 md:border-r md:pr-14">
              <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#4b1712]" />

                  <h2 className="text-[9px] font-semibold uppercase tracking-[0.22em]">
                    What Inspires Us
                  </h2>
                </div>

                <span className="font-serif text-xl">
                  03
                </span>
              </div>

              <p
                className="
                  max-w-[650px]
                  font-serif
                  text-[29px]
                  leading-[1.07]
                  tracking-[-0.04em]
                  sm:text-[37px]
                "
              >
                JENTARA is inspired by the energy of today&apos;s
                generation—the late-night ideas, the endless hustle, the
                setbacks, the comebacks, and the determination to keep moving
                forward.
              </p>

              <p className="mt-8 max-w-[550px] text-[12px] leading-[1.8] text-[#4b1712]/70">
                We celebrate the people who create their own opportunities,
                challenge expectations, and refuse to settle for ordinary.
              </p>
            </article>

            <article className="py-10 md:pl-14">
              <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#4b1712]" />

                  <h2 className="text-[9px] font-semibold uppercase tracking-[0.22em]">
                    Our Community
                  </h2>
                </div>

                <span className="font-serif text-xl">
                  04
                </span>
              </div>

              <p className="max-w-[600px] text-[13px] leading-[1.9] text-[#4b1712]/75">
                We&apos;re not here simply to sell clothing. We&apos;re
                building a community of individuals who believe in growth,
                authenticity, and purpose. A community that supports ambition,
                creativity, and self-expression.
              </p>

              <div className="mt-9 border-l border-[#4b1712] pl-6">
                <p
                  className="
                    max-w-[520px]
                    font-serif
                    text-[28px]
                    leading-[1.05]
                    tracking-[-0.04em]
                    sm:text-[34px]
                  "
                >
                  When you wear JENTARA, you become part of something bigger
                  than fashion.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* =======================================================
            BRAND STATEMENT
        ======================================================= */}

        <section className="py-16 md:py-24">
          <div className="relative overflow-hidden rounded-[22px] bg-[#4b1712] px-7 py-14 text-[#f5ede4] sm:px-10 md:px-16 md:py-20">
            <div className="absolute right-[-30px] top-[-80px] font-serif text-[280px] leading-none text-[#f5ede4]/[0.035]">
              J
            </div>

            <div className="relative max-w-[900px]">
              <p className="text-[8px] font-semibold uppercase tracking-[0.4em] text-[#f5ede4]/60">
                The Beginning of Something Bigger
              </p>

              <h2
                className="
                  mt-6
                  font-serif
                  text-[48px]
                  leading-[0.88]
                  tracking-[-0.055em]
                  sm:text-[62px]
                  md:text-[86px]
                "
              >
                This is only
                <br />
                the beginning.
              </h2>

              <p className="mt-8 max-w-[600px] text-[12px] leading-[1.9] text-[#f5ede4]/70 md:text-[13px]">
                Every collection we release is a reminder that your story
                matters, your ambitions deserve attention, and your presence
                should never go unnoticed.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <span className="font-serif text-2xl">
                  Welcome to JENTARA.
                </span>

                <span className="text-[8px] uppercase tracking-[0.25em] text-[#f5ede4]/60">
                  Star of the New Generation
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            FINAL CTA
        ======================================================= */}

        <section className="pb-14 md:pb-20">
          <div className="border-y border-[#4b1712]/30 py-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#4b1712]/50">
                  Your Story. Your Style.
                </p>

                <h2
                  className="
                    mt-3
                    font-serif
                    text-[38px]
                    leading-none
                    tracking-[-0.045em]
                    sm:text-[48px]
                  "
                >
                  Find your piece.
                </h2>
              </div>

              <Link
                href="/shop"
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-8
                  border
                  border-[#4b1712]
                  px-7
                  py-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  transition-all
                  duration-300
                  hover:bg-[#4b1712]
                  hover:text-[#f5ede4]
                "
              >
                Shop JENTARA

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* =======================================================
            FINAL IMAGE
        ======================================================= */}

        <section className="pb-12 md:pb-16">
          <div className="group relative overflow-hidden rounded-[20px] bg-[#d7d1ca]">
            <div className="flex h-[170px] items-center justify-center transition-transform duration-700 group-hover:scale-[1.02] sm:h-[220px] md:h-[280px]">
              <div className="text-center">
                <p
                  className="
                    font-serif
                    text-[52px]
                    tracking-[-0.07em]
                    text-[#4b1712]/20
                    sm:text-[70px]
                    md:text-[90px]
                  "
                >
                  jentara
                </p>

                <p className="mt-2 text-[7px] font-semibold uppercase tracking-[0.4em] text-[#4b1712]/30">
                  Wear With Intent. Define Your Presence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}