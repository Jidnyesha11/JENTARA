// app/admin/reviews/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllProducts } from "@/lib/supabase/admin-products";
import {
  deleteAdminReview,
  getAdminReviews,
  type AdminReview,
} from "@/lib/supabase/admin-reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="tracking-[0.1em]">
      {"★".repeat(Math.max(0, Math.min(5, rating)))}
      <span className="text-[#451713]/15">
        {"★".repeat(Math.max(0, 5 - rating))}
      </span>
    </span>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAdminReviews(), getAllProducts()])
      .then(([reviewData, productData]) => {
        setReviews(reviewData);
        setProducts(productData ?? []);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const productNames = useMemo(
    () => new Map(products.map((product) => [product.id, product.name])),
    [products],
  );

  const filtered = reviews.filter((review) => {
    if (filter === "all") return true;
    return Number(review.rating) === Number(filter);
  });

  async function removeReview(review: AdminReview) {
    if (!window.confirm("Delete this customer review?")) return;

    try {
      await deleteAdminReview(review.id);
      setReviews((current) => current.filter((item) => item.id !== review.id));
    } catch (error) {
      console.error(error);
      window.alert("Review could not be deleted.");
    }
  }

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) / reviews.length
      : 0;

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / CUSTOMERS
          </p>
        </div>
        <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
          Reviews
        </h1>
        <p className="mt-4 max-w-lg text-[12px] leading-6 text-[#451713]/50">
          Moderate the voice of the JENTARA community.
        </p>
      </header>

      <section className="grid border-b border-[#451713]/15 sm:grid-cols-3">
        {[
          ["Reviews", reviews.length],
          ["Average rating", average ? average.toFixed(1) : "—"],
          ["Five stars", reviews.filter((review) => Number(review.rating) === 5).length],
        ].map(([label, value]) => (
          <div key={label} className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0">
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">{label}</p>
            <p className="mt-4 font-serif text-4xl">{value}</p>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap gap-2 py-7">
        {["all", "5", "4", "3", "2", "1"].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`min-h-9 border px-4 text-[8px] font-semibold uppercase tracking-[0.15em] ${
              filter === value ? "border-[#451713] bg-[#451713] text-[#f5ede4]" : "border-[#451713]/15"
            }`}
          >
            {value === "all" ? "All" : `${value} stars`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-[9px] uppercase tracking-[0.2em] text-[#451713]/40">Loading reviews</div>
      ) : filtered.length === 0 ? (
        <div className="border-y border-[#451713]/12 py-20 text-center">
          <p className="font-serif text-3xl">No reviews in this view.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#451713]/10 border-y border-[#451713]/12">
          {filtered.map((review) => (
            <article key={review.id} className="grid gap-5 py-7 lg:grid-cols-[220px_1fr_auto]">
              <div>
                <p className="text-[11px] font-semibold">{review.reviewer_name}</p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.13em] text-[#451713]/40">
                  {productNames.get(review.product_id) ?? "Unknown product"}
                </p>
                <div className="mt-4 text-[15px] text-[#451713]">
                  <Stars rating={Number(review.rating)} />
                </div>
              </div>

              <p className="max-w-3xl text-[12px] leading-7 text-[#451713]/65">{review.review}</p>

              <button
                type="button"
                onClick={() => void removeReview(review)}
                className="self-start text-[8px] font-semibold uppercase tracking-[0.15em] text-[#7b2924] underline underline-offset-4"
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
