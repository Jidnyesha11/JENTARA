// components/sections/ViewGrab.tsx

import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string | null;
  image_url: string | null;
  price: number;
  featured: boolean | null;
}

interface ViewGrabProps {
  products: Product[];
}

export default function ViewGrab({
  products,
}: ViewGrabProps) {
  const product =
    products.find(
      (item) =>
        item.featured &&
        item.image_url
    ) ??
    products.find(
      (item) => item.image_url
    ) ??
    products[0] ??
    null;

  const imageUrl =
    product?.image_url ?? "";

  return (
    <section className="bg-[#f5ede4] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        <div className="relative overflow-hidden bg-[#451713] text-[#f5ede4]">

          <div className="grid min-h-[570px] lg:grid-cols-[0.78fr_1.22fr]">

            {/* Content */}

            <div className="relative z-10 flex flex-col justify-between p-8 sm:p-12 lg:p-16">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#f5ede4]/50">
                  JENTARA / The Drop
                </p>

                <h2 className="mt-8 max-w-[520px] font-serif text-[58px] leading-[0.84] tracking-[-0.06em] sm:text-[76px]">
                  View
                  <br />
                  &amp; Grab.
                </h2>

                <p className="mt-7 max-w-[390px] text-[11px] leading-6 text-[#f5ede4]/60">
                  View the drop.
                  <br />
                  Grab your fit before
                  it&apos;s gone.
                </p>
              </div>

              <div>
                {product && (
                  <div className="mb-7 border-t border-[#f5ede4]/20 pt-5">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-[#f5ede4]/40">
                      Featured Piece
                    </p>

                    <p className="mt-2 font-serif text-2xl tracking-[-0.03em]">
                      {product.name}
                    </p>
                  </div>
                )}

                <Link
                  href={
                    product
                      ? `/product/${product.slug ?? product.id}`
                      : "/shop"
                  }
                  className="
                    group
                    flex
                    w-fit
                    items-center
                    gap-8
                    border
                    border-[#f5ede4]/35
                    px-6
                    py-4
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    transition-all
                    duration-300
                    hover:bg-[#f5ede4]
                    hover:text-[#451713]
                  "
                >
                  Shop The Drop

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Visual */}

            <div className="relative min-h-[420px] overflow-hidden bg-[#d2c8bf] lg:min-h-0">

              {imageUrl ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-[1.025]"
                  style={{
                    backgroundImage: `url("${imageUrl}")`,
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9beb5] via-[#eee6dd] to-[#9f9187]">
                  <div className="absolute inset-[8%] border border-[#451713]/15" />

                  <div className="absolute left-[12%] top-[15%]">
                    <p className="font-serif text-[70px] leading-none tracking-[-0.08em] text-[#451713]/25 sm:text-[100px]">
                      J
                    </p>
                  </div>

                  <div className="absolute bottom-[12%] right-[10%] text-right">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/40">
                      View The Drop
                    </p>

                    <p className="mt-2 font-serif text-4xl text-[#451713]/30">
                      001
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#451713] text-xl text-[#f5ede4]">
                ↗
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}