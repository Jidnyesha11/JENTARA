// components/sections/NewArrivals.tsx

import Image from "next/image";
import Link from "next/link";

import HomeAddToCartButton from "@/components/sections/HomeAddToCartButton";

interface Product {
  id: string;
  name: string;
  slug: string | null;
  image_url: string | null;
  price: number;
  original_price: number | null;
  stock: number | null;
  sizes: string | null;
  size_inventory: Record<string, number> | null;
  featured: boolean | null;
  created_at: string | null;
}

interface NewArrivalsProps {
  products: Product[];
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function getTotalStock(product: Product) {
  if (
    product.size_inventory &&
    Object.keys(product.size_inventory).length > 0
  ) {
    return Object.values(product.size_inventory).reduce(
      (total, quantity) => total + Number(quantity || 0),
      0
    );
  }

  return Number(product.stock ?? 0);
}

function getProductSizes(product: Product) {
  if (!product.sizes) {
    return [];
  }

  return product.sizes
    .split(",")
    .map((size) => size.trim())
    .filter(Boolean);
}

function ProductVisual({
  product,
}: {
  product: Product;
}) {
  if (product.image_url) {
    return (
      <Image
        src={product.image_url}
        alt={product.name}
        fill
        sizes="
          (max-width: 640px) 88vw,
          (max-width: 1024px) 45vw,
          30vw
        "
        className="
          object-cover
          object-center
          transition-transform
          duration-700
          group-hover:scale-[1.035]
        "
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#ddd3ca] via-[#eee7df] to-[#c0b3a9]">
      <div className="absolute inset-5 border border-[#451713]/10" />

      <div className="absolute left-6 top-6">
        <p className="text-[7px] font-semibold uppercase tracking-[0.3em] text-[#451713]/30">
          JENTARA
        </p>
      </div>

      <div className="absolute bottom-6 left-6">
        <p className="font-serif text-4xl tracking-[-0.06em] text-[#451713]/25">
          DROP
        </p>
      </div>
    </div>
  );
}

function sortProducts(products: Product[]) {
  return [...products]
    .sort((a, b) => {
      if (a.featured && !b.featured) {
        return -1;
      }

      if (!a.featured && b.featured) {
        return 1;
      }

      return (
        new Date(b.created_at ?? 0).getTime() -
        new Date(a.created_at ?? 0).getTime()
      );
    })
    .slice(0, 3);
}

export default function NewArrivals({
  products,
}: NewArrivalsProps) {
  const arrivals = sortProducts(products);

  return (
    <section className="bg-[#f5ede4] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        {/* Header */}

        <div className="mb-10 flex flex-col gap-7 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#451713]" />

              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/55">
                JENTARA / Latest
              </p>
            </div>

            <h2
              className="
                mt-4
                font-serif
                text-[54px]
                leading-[0.82]
                tracking-[-0.06em]
                text-[#451713]
                sm:text-[72px]
              "
            >
              New Arrivals
            </h2>

            <p className="mt-5 max-w-[420px] text-[11px] leading-6 text-[#451713]/55">
              Stay ahead of the curve with our newest arrivals.
            </p>
          </div>

          <Link
            href="/shop"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-4
              border-b
              border-[#451713]/30
              pb-2
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.2em]
            "
          >
            View All

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Products */}

        {arrivals.length === 0 ? (
          <div className="border-y border-[#451713]/15 py-24 text-center">
            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/40">
              New arrivals coming soon
            </p>
          </div>
        ) : (
          <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {arrivals.map((product, index) => {
              const totalStock = getTotalStock(product);
              const inStock = totalStock > 0;

              const sizes = getProductSizes(product);

              const productHref = `/product/${
                product.slug ?? product.id
              }`;

              return (
                <article
                  key={product.id}
                  className="group"
                >
                  {/* Product Image */}

                  <Link
                    href={productHref}
                    className="block"
                  >
                    <div
                      className="
                        relative
                        aspect-[0.78]
                        overflow-hidden
                        bg-[#ddd4cc]
                      "
                    >
                      <ProductVisual product={product} />

                      {/* Product Number */}

                      <div className="absolute left-4 top-4">
                        <span className="font-serif text-lg text-[#451713]/35">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Stock Status */}

                      <div className="absolute bottom-4 left-4">
                        <span
                          className={`
                            px-3
                            py-2
                            text-[7px]
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            backdrop-blur-sm
                            ${
                              inStock
                                ? "bg-[#f5ede4]/90 text-[#451713]"
                                : "bg-[#451713] text-[#f5ede4]"
                            }
                          `}
                        >
                          {inStock ? "In Stock" : "Out Of Stock"}
                        </span>
                      </div>

                      {/* Hover Arrow */}

                      <div
                        className="
                          absolute
                          bottom-4
                          right-4
                          flex
                          h-11
                          w-11
                          translate-y-2
                          items-center
                          justify-center
                          rounded-full
                          bg-[#451713]
                          text-[#f5ede4]
                          opacity-0
                          shadow-lg
                          transition-all
                          duration-300
                          group-hover:translate-y-0
                          group-hover:opacity-100
                        "
                      >
                        →
                      </div>
                    </div>
                  </Link>

                  {/* Product Information */}

                  <div className="pt-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Link href={productHref}>
                          <h3
                            className="
                              font-serif
                              text-[25px]
                              leading-none
                              tracking-[-0.035em]
                              text-[#451713]
                              transition-opacity
                              hover:opacity-60
                            "
                          >
                            {product.name}
                          </h3>
                        </Link>

                        {/* Prices */}

                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-[13px] font-semibold text-[#451713]">
                            ₹
                            {formatPrice(
                              Number(product.price)
                            )}
                          </span>

                          {product.original_price &&
                            Number(product.original_price) >
                              Number(product.price) && (
                              <span className="text-[10px] text-[#451713]/35 line-through">
                                ₹
                                {formatPrice(
                                  Number(product.original_price)
                                )}
                              </span>
                            )}
                        </div>
                      </div>

                      <span className="shrink-0 text-[7px] font-semibold uppercase tracking-[0.15em] text-[#451713]/35">
                        {inStock ? "Available" : "Sold Out"}
                      </span>
                    </div>

                    {/* Add To Cart */}

                    <HomeAddToCartButton
                      id={product.id}
                      name={product.name}
                      price={Number(product.price)}
                      image_url={product.image_url ?? ""}
                      sizes={sizes}
                      disabled={!inStock}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}