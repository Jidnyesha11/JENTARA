// app/categories/page.tsx

import Link from "next/link";

import {
  getCategories,
  type Category,
} from "@/lib/supabase/categories";

export default async function CategoriesPage() {
  let categories: Category[] = [];

  try {
    categories = await getCategories();
  } catch (error) {
    console.error(
      "CATEGORIES PAGE ERROR:",
      error
    );
  }

  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#151a2a]">
      <section className="mx-auto max-w-[1500px] px-6 py-16 md:px-10 md:py-24">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#4a0f0f]" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#4a0f0f]">
            JENTARA / COLLECTIONS
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h1 className="font-serif text-[64px] leading-[0.82] tracking-[-0.07em] sm:text-[90px] md:text-[110px] lg:text-[130px]">
            CATEGORIES
          </h1>

          <p className="max-w-[390px] pb-2 text-[10px] uppercase leading-6 tracking-[0.14em] text-[#151a2a]/50 md:text-right">
            Explore JENTARA drops, collections
            and pieces created for the new
            generation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10">
        {categories.length === 0 ? (
          <div className="border border-[#4a0f0f]/15 bg-[#faf5ef] px-8 py-24 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#4a0f0f]/50">
              COLLECTIONS
            </p>

            <h2 className="mt-5 font-serif text-4xl tracking-[-0.05em]">
              No Collections Available
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#151a2a]/55">
              JENTARA collections will appear
              here once they are added.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex bg-[#4a0f0f] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#651717]"
            >
              Shop All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(
              (category, index) => {
                const slug =
                  category.slug ||
                  category.id;

                return (
                  <Link
                    key={category.id}
                    href={`/categories/${slug}`}
                    className="group"
                  >
                    <article className="relative min-h-[430px] overflow-hidden border border-[#4a0f0f]/15 bg-[#4a0f0f] p-8 transition duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
                      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10 transition duration-700 group-hover:scale-125" />

                      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/10 transition duration-700 group-hover:scale-125" />

                      <div className="relative z-10 flex h-full min-h-[370px] flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <span className="font-serif text-3xl text-[#f5ede4]/50">
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>

                          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4]/50">
                            JENTARA
                          </span>
                        </div>

                        <div>
                          <h2 className="font-serif text-5xl leading-none tracking-[-0.05em] text-[#f5ede4] md:text-6xl">
                            {category.name}
                          </h2>

                          <div className="mt-8 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#f5ede4]">
                            Explore Collection

                            <span className="transition-transform duration-300 group-hover:translate-x-2">
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              }
            )}
          </div>
        )}
      </section>

      <section className="border-t border-[#4a0f0f]/15 px-6 py-20 text-center md:px-10 md:py-28">
        <p className="font-serif text-4xl tracking-[-0.04em] md:text-6xl">
          Star of the New Generation
        </p>

        <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.35em] text-[#4a0f0f]/45">
          JENTARA APPAREL
        </p>
      </section>
    </main>
  );
}