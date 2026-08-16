// app/categories/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";

import ProductCard from "@/components/products/ProductCard";

import {
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "@/lib/supabase/categories";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: Props) {
  const { slug } = await params;

  const category =
    await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products =
    await getProductsByCategorySlug(slug);

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#151a2a]">
      <section className="mx-auto max-w-[1500px] px-6 py-14 md:px-10 md:py-20">
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/categories"
            className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#4a0f0f]/60 transition hover:text-[#4a0f0f]"
          >
            Categories
          </Link>

          <span className="text-[#4a0f0f]/30">
            /
          </span>

          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#4a0f0f]">
            {category.name}
          </span>
        </div>

        <div className="border-b border-[#4a0f0f]/15 pb-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#4a0f0f]">
            JENTARA COLLECTION
          </p>

          <h1 className="mt-5 font-serif text-[64px] leading-[0.85] tracking-[-0.07em] sm:text-[90px] md:text-[110px]">
            {category.name}
          </h1>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#151a2a]/50">
              {products.length}{" "}
              {products.length === 1
                ? "PRODUCT"
                : "PRODUCTS"}
            </p>

            <Link
              href="/products"
              className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#4a0f0f] underline underline-offset-4"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10">
        {products.length === 0 ? (
          <div className="border border-[#4a0f0f]/15 bg-[#faf5ef] px-8 py-24 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#4a0f0f]/50">
              {category.name}
            </p>

            <h2 className="mt-5 font-serif text-4xl tracking-[-0.05em]">
              Coming Soon
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#151a2a]/55">
              There are currently no products
              available in this collection.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex bg-[#4a0f0f] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#651717]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug ?? "",
                  price: Number(
                    product.price
                  ),
                  image_url:
                    product.image_url ??
                    "",
                }}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}