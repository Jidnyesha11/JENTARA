import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/supabase/products";
import { getProductImages } from "@/lib/supabase/product-images";

import ProductGallery from "@/components/products/ProductGallery";
import ProductActions from "@/components/products/ProductActions";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const sizeInventory = (
    product.size_inventory ?? {}
  ) as Record<string, number>;

  const totalStock = Object.values(
    sizeInventory
  ).reduce(
    (total, quantity) =>
      total + Number(quantity || 0),
    0
  );

  const galleryImages =
    await getProductImages(product.id);

  const hasDiscount =
    product.original_price != null &&
    Number(product.original_price) >
      Number(product.price);

  const discountPercentage = hasDiscount
    ? Math.round(
        ((Number(product.original_price) -
          Number(product.price)) /
          Number(product.original_price)) *
          100
      )
    : 0;

  return (
    <main className="bg-[#f5ede4] text-[#451713]">
      {/* =====================================================
          PRODUCT HERO
      ===================================================== */}

      <section className="mx-auto max-w-[1600px] px-5 pb-16 pt-5 sm:px-8 sm:pb-20 lg:px-10 lg:pt-7">
        {/* Breadcrumb */}

        <div className="mb-6 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45">
          <Link
            href="/shop"
            className="transition-opacity hover:text-[#451713]"
          >
            Shop
          </Link>

          <span>/</span>

          <span className="max-w-[260px] truncate text-[#451713]/70">
            {product.name}
          </span>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.85fr)] xl:gap-12">
          {/* =================================================
              IMAGE AREA
          ================================================= */}

          <div className="min-w-0">
            <ProductGallery
              mainImage={product.image_url ?? ""}
              galleryImages={galleryImages ?? []}
              productName={product.name}
            />
          </div>

          {/* =================================================
              PRODUCT BUYING PANEL
          ================================================= */}

          <aside className="lg:sticky lg:top-[105px]">
            <div className="border-t border-[#451713]/20 pt-5">
              {/* Collection */}

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#451713]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]/65">
                  JENTARA / COLLECTION
                </p>
              </div>

              {/* Product title */}

              <h1 className="mt-6 max-w-[650px] font-serif text-[48px] leading-[0.92] tracking-[-0.055em] sm:text-[58px] lg:text-[62px] xl:text-[72px]">
                {product.name}
              </h1>

              {/* Price */}

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="text-[24px] font-semibold tracking-[-0.025em] sm:text-[27px]">
                  ₹{formatPrice(Number(product.price))}
                </span>

                {hasDiscount && (
                  <>
                    <span className="text-[14px] text-[#451713]/35 line-through">
                      ₹
                      {formatPrice(
                        Number(
                          product.original_price
                        )
                      )}
                    </span>

                    <span className="border border-[#451713]/20 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.15em]">
                      {discountPercentage}% Off
                    </span>
                  </>
                )}

                <span
                  className={`text-[8px] font-semibold uppercase tracking-[0.2em] ${
                    totalStock > 0
                      ? "text-[#451713]/50"
                      : "text-[#451713]"
                  }`}
                >
                  {totalStock > 0
                    ? "In Stock"
                    : "Sold Out"}
                </span>
              </div>

              {/* Description */}

              {product.description && (
                <p className="mt-7 max-w-[620px] text-[12px] leading-6 text-[#451713]/65 sm:text-[13px] sm:leading-7">
                  {product.description}
                </p>
              )}

              {/* Purchase actions */}

              {totalStock > 0 ? (
                <ProductActions
                  product={{
                    id: product.id,
                    name: product.name,
                    price: Number(
                      product.price
                    ),
                    image_url:
                      product.image_url ?? "",
                  }}
                  sizeInventory={sizeInventory}
                />
              ) : (
                <div className="mt-9 border border-[#451713]/20 px-5 py-6 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                    Currently Sold Out
                  </p>

                  <Link
                    href="/shop"
                    className="mt-4 inline-block border-b border-[#451713]/40 pb-1 text-[9px] font-semibold uppercase tracking-[0.2em]"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}

              {/* Reassurance */}

              <div className="mt-7 border-y border-[#451713]/15">
                <div className="grid grid-cols-3 divide-x divide-[#451713]/15">
                  <div className="py-4 pr-3">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.12em]">
                      Shipping
                    </p>

                    <p className="mt-1.5 text-[9px] leading-4 text-[#451713]/50">
                      Free over ₹999
                    </p>
                  </div>

                  <div className="px-3 py-4">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.12em]">
                      Returns
                    </p>

                    <p className="mt-1.5 text-[9px] leading-4 text-[#451713]/50">
                      7 day returns
                    </p>
                  </div>

                  <div className="py-4 pl-3">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.12em]">
                      Payment
                    </p>

                    <p className="mt-1.5 text-[9px] leading-4 text-[#451713]/50">
                      Secure checkout
                    </p>
                  </div>
                </div>
              </div>

              {/* Policies */}

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#451713]/45">
                <Link
                  href="/policies#shipping"
                  className="underline underline-offset-4 transition-colors hover:text-[#451713]"
                >
                  Shipping Policy
                </Link>

                <Link
                  href="/policies#returns"
                  className="underline underline-offset-4 transition-colors hover:text-[#451713]"
                >
                  Returns
                </Link>

                <Link
                  href="/size-guide"
                  className="underline underline-offset-4 transition-colors hover:text-[#451713]"
                >
                  Size Guide
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          PRODUCT STORY
      ===================================================== */}

      <section className="border-y border-[#451713]/15">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid lg:grid-cols-2">
            {/* Details */}

            <div className="px-5 py-14 sm:px-8 sm:py-16 lg:border-r lg:border-[#451713]/15 lg:px-10 lg:py-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#451713]" />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em]">
                    The Details
                  </p>
                </div>

                <span className="font-serif text-2xl text-[#451713]/25">
                  01
                </span>
              </div>

              <h2 className="mt-8 max-w-[650px] font-serif text-[42px] leading-[0.95] tracking-[-0.05em] sm:text-[54px]">
                Made with purpose.
              </h2>

              <p className="mt-6 max-w-[650px] text-[12px] leading-7 text-[#451713]/65 sm:text-[13px]">
                {product.description ||
                  "Designed for everyday expression, JENTARA pieces balance comfort, character and a distinctive point of view."}
              </p>

              <div className="mt-9 border-t border-[#451713]/15">
                <div className="flex items-center justify-between border-b border-[#451713]/15 py-4">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em]">
                    Fabric
                  </span>

                  <span className="text-[10px] text-[#451713]/55">
                    Premium Quality
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#451713]/15 py-4">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em]">
                    Fit
                  </span>

                  <span className="text-[10px] text-[#451713]/55">
                    Comfortable
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-[#451713]/15 py-4">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em]">
                    Collection
                  </span>

                  <span className="text-[10px] text-[#451713]/55">
                    JENTARA
                  </span>
                </div>
              </div>
            </div>

            {/* Fit */}

            <div className="px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#451713]" />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em]">
                    Fit Guide
                  </p>
                </div>

                <span className="font-serif text-2xl text-[#451713]/25">
                  02
                </span>
              </div>

              <h2 className="mt-8 max-w-[650px] font-serif text-[42px] leading-[0.95] tracking-[-0.05em] sm:text-[54px]">
                Find your fit.
              </h2>

              <p className="mt-6 max-w-[580px] text-[12px] leading-7 text-[#451713]/65 sm:text-[13px]">
                Not sure which size to choose? Use
                our size guide to find the right
                measurements before ordering.
              </p>

              <Link
                href="/size-guide"
                className="group mt-8 inline-flex items-center gap-4 border-b border-[#451713]/40 pb-2 text-[9px] font-semibold uppercase tracking-[0.2em]"
              >
                Open Size Guide

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <div className="mt-12 border-t border-[#451713]/15 pt-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em]">
                  Need help?
                </p>

                <p className="mt-2 max-w-[460px] text-[11px] leading-6 text-[#451713]/55">
                  Our team can help with sizing,
                  product information and your
                  order.
                </p>

                <Link
                  href="/contact"
                  className="mt-4 inline-block text-[9px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4"
                >
                  Contact JENTARA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

