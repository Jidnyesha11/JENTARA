
"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase/client";

interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  review: string;
  reviewer_name: string;
  created_at: string;
}

interface ProductReviewsProps {
  productId: string;
}

const STAR_VALUES = [1, 2, 3, 4, 5];

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getInitials(name: string) {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "J";
  }

  if (words.length === 1) {
    return words[0].slice(0, 1).toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

function StarRating({
  rating,
  interactive = false,
  onChange,
  size = "normal",
}: {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: "small" | "normal" | "large";
}) {
  const textSize =
    size === "large"
      ? "text-[27px]"
      : size === "small"
        ? "text-[15px]"
        : "text-[20px]";

  return (
    <div
      className={`flex items-center ${textSize} leading-none`}
      aria-label={`${rating} out of 5 stars`}
    >
      {STAR_VALUES.map((star) => {
        const filled = star <= rating;

        if (interactive && onChange) {
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              aria-label={`Give ${star} star${star === 1 ? "" : "s"}`}
              className={`px-0.5 transition-transform hover:scale-110 ${
                filled
                  ? "text-[#451713]"
                  : "text-[#451713]/20"
              }`}
            >
              ★
            </button>
          );
        }

        return (
          <span
            key={star}
            className={`px-0.5 ${
              filled
                ? "text-[#451713]"
                : "text-[#451713]/15"
            }`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default function ProductReviews({
  productId,
}: ProductReviewsProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentUserReview, setCurrentUserReview] =
    useState<ProductReview | null>(null);

  const loadReviews = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("product_reviews")
      .select(
        `
          id,
          product_id,
          user_id,
          rating,
          review,
          reviewer_name,
          created_at
        `
      )
      .eq("product_id", productId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("PRODUCT REVIEWS ERROR:", error);
      setReviews([]);
      setLoading(false);
      return;
    }

    const reviewData = (data ?? []) as ProductReview[];

    setReviews(reviewData);

    if (user) {
      const ownReview =
        reviewData.find(
          (item) => item.user_id === user.id
        ) ?? null;

      setCurrentUserReview(ownReview);
    } else {
      setCurrentUserReview(null);
    }

    setLoading(false);
  }, [productId, user]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadReviews();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadReviews]);

  const reviewCount = reviews.length;

  const averageRating = useMemo(() => {
    if (reviewCount === 0) {
      return 0;
    }

    const total = reviews.reduce(
      (sum, review) =>
        sum + Number(review.rating),
      0
    );

    return total / reviewCount;
  }, [reviews, reviewCount]);

  const ratingCounts = useMemo(() => {
    return STAR_VALUES.reduce(
      (counts, star) => {
        counts[star] = reviews.filter(
          (review) =>
            Number(review.rating) === star
        ).length;

        return counts;
      },
      {} as Record<number, number>
    );
  }, [reviews]);

  function handleWriteReview() {
    if (!user) {
      router.push("/login");
      return;
    }

    if (currentUserReview) {
      setErrorMessage(
        "You have already reviewed this product."
      );
      return;
    }

    setErrorMessage("");
    setShowForm(true);
  }

  async function handleSubmitReview(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    if (rating < 1 || rating > 5) {
      setErrorMessage(
        "Please select a star rating."
      );
      return;
    }

    const cleanReview = reviewText.trim();

    if (cleanReview.length < 5) {
      setErrorMessage(
        "Please write at least a few words about the product."
      );
      return;
    }

    if (cleanReview.length > 1000) {
      setErrorMessage(
        "Your review must be 1000 characters or less."
      );
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    const metadata =
      user.user_metadata ?? {};

    const firstName =
      metadata.first_name ??
      metadata.firstName ??
      "";

    const lastName =
      metadata.last_name ??
      metadata.lastName ??
      "";

    const metadataName =
      `${firstName} ${lastName}`.trim();

    const reviewerName =
      metadataName ||
      metadata.full_name ||
      metadata.name ||
      user.email?.split("@")[0] ||
      "JENTARA Customer";

    const { data, error } = await supabase
      .from("product_reviews")
      .insert({
        product_id: productId,
        user_id: user.id,
        rating,
        review: cleanReview,
        reviewer_name: reviewerName,
      })
      .select(
        `
          id,
          product_id,
          user_id,
          rating,
          review,
          reviewer_name,
          created_at
        `
      )
      .single();

    if (error) {
      console.error(
        "SUBMIT REVIEW ERROR:",
        error
      );

      if (
        error.code === "23505"
      ) {
        setErrorMessage(
          "You have already reviewed this product."
        );
      } else {
        setErrorMessage(
          "We could not submit your review. Please try again."
        );
      }

      setSubmitting(false);
      return;
    }

    const insertedReview =
      data as ProductReview;

    setReviews((current) => [
      insertedReview,
      ...current,
    ]);

    setCurrentUserReview(
      insertedReview
    );

    setRating(0);
    setReviewText("");
    setShowForm(false);
    setSubmitting(false);
  }

  return (
    <section className="border-t border-[#451713]/15">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {/* Section heading */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em]">
              Customer Reviews
            </p>
          </div>

          <span className="font-serif text-2xl text-[#451713]/25">
            03
          </span>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-8 border-b border-[#451713]/15 pb-10 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-[48px] leading-[0.92] tracking-[-0.055em] sm:text-[64px]">
              Loved by those
              <br />
              who wear it.
            </h2>

            <p className="mt-5 max-w-[540px] text-[12px] leading-6 text-[#451713]/60 sm:text-[13px] sm:leading-7">
              Honest thoughts from the JENTARA
              community. Your experience helps
              others choose their next piece.
            </p>
          </div>

          <button
            type="button"
            onClick={handleWriteReview}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-5 bg-[#451713] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition hover:bg-[#5c211b]"
          >
            Write a Review
            <span>→</span>
          </button>
        </div>

        {/* Rating summary */}

        <div className="grid border-b border-[#451713]/15 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="border-b border-[#451713]/15 py-10 lg:border-b-0 lg:border-r lg:py-12 lg:pr-12">
            <div className="flex items-end gap-4">
              <span className="font-serif text-[68px] leading-none tracking-[-0.06em]">
                {reviewCount > 0
                  ? averageRating.toFixed(1)
                  : "—"}
              </span>

              {reviewCount > 0 && (
                <span className="pb-2 text-[10px] uppercase tracking-[0.15em] text-[#451713]/45">
                  / 5
                </span>
              )}
            </div>

            <div className="mt-5">
              <StarRating
                rating={Math.round(
                  averageRating
                )}
                size="large"
              />
            </div>

            <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-[#451713]/45">
              {reviewCount}{" "}
              {reviewCount === 1
                ? "customer review"
                : "customer reviews"}
            </p>
          </div>

          <div className="py-10 lg:py-12 lg:pl-12">
            <p className="mb-6 text-[9px] font-semibold uppercase tracking-[0.2em]">
              Rating Breakdown
            </p>

            <div className="max-w-[650px] space-y-3">
              {[5, 4, 3, 2, 1].map(
                (star) => {
                  const count =
                    ratingCounts[star] ?? 0;

                  const percentage =
                    reviewCount > 0
                      ? (count /
                          reviewCount) *
                        100
                      : 0;

                  return (
                    <div
                      key={star}
                      className="grid grid-cols-[35px_minmax(0,1fr)_45px] items-center gap-3"
                    >
                      <div className="flex items-center gap-1 text-[11px]">
                        <span>{star}</span>
                        <span>★</span>
                      </div>

                      <div className="h-1 overflow-hidden bg-[#451713]/10">
                        <div
                          className="h-full bg-[#451713] transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      <span className="text-right text-[9px] text-[#451713]/45">
                        {count}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Review form */}

        {showForm && (
          <div className="border-b border-[#451713]/15 py-10 sm:py-12">
            <form
              onSubmit={handleSubmitReview}
              className="max-w-[850px]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                    Your Experience
                  </p>

                  <h3 className="mt-3 font-serif text-[34px] tracking-[-0.04em]">
                    How was your piece?
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setErrorMessage("");
                  }}
                  className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#451713]/45 underline underline-offset-4"
                >
                  Close
                </button>
              </div>

              <div className="mt-7">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em]">
                  Your Rating
                </p>

                <StarRating
                  rating={rating}
                  interactive
                  onChange={setRating}
                  size="large"
                />
              </div>

              <div className="mt-8">
                <label
                  htmlFor="product-review"
                  className="mb-3 block text-[9px] font-semibold uppercase tracking-[0.18em]"
                >
                  Your Review
                </label>

                <textarea
                  id="product-review"
                  value={reviewText}
                  onChange={(event) =>
                    setReviewText(
                      event.target.value
                    )
                  }
                  maxLength={1000}
                  rows={6}
                  placeholder="Tell us about the fit, fabric, comfort or anything else you noticed..."
                  className="w-full resize-none border border-[#451713]/20 bg-transparent px-5 py-4 text-[12px] leading-6 outline-none transition placeholder:text-[#451713]/30 focus:border-[#451713]/60"
                />

                <div className="mt-2 flex justify-end text-[9px] text-[#451713]/40">
                  {reviewText.length}/1000
                </div>
              </div>

              {errorMessage && (
                <p className="mt-5 border-l-2 border-[#451713] px-4 py-3 text-[11px] leading-5 text-[#451713]">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-5 bg-[#451713] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition hover:bg-[#5c211b] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Submitting..."
                  : "Publish Review"}
                {!submitting && (
                  <span>→</span>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Review list */}

        <div className="mt-10">
          {loading ? (
            <div className="border-y border-[#451713]/15 py-16 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]/45">
                Loading reviews
              </p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="border-y border-[#451713]/15 py-20 text-center">
              <p className="font-serif text-[38px] tracking-[-0.04em]">
                Be the first to review.
              </p>

              <p className="mx-auto mt-4 max-w-[440px] text-[11px] leading-6 text-[#451713]/50">
                Your experience can help another
                customer decide if this piece is
                right for them.
              </p>

              <button
                type="button"
                onClick={handleWriteReview}
                className="mt-7 border-b border-[#451713]/40 pb-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
              >
                Write the first review →
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                  Customer Voices
                </p>

                <p className="text-[9px] uppercase tracking-[0.15em] text-[#451713]/40">
                  {reviews.length}{" "}
                  {reviews.length === 1
                    ? "review"
                    : "reviews"}
                </p>
              </div>

              <div className="divide-y divide-[#451713]/15 border-y border-[#451713]/15">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="grid gap-7 py-8 md:grid-cols-[240px_minmax(0,1fr)] md:gap-12"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#451713]/15 font-serif text-sm">
                          {getInitials(
                            review.reviewer_name
                          )}
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold">
                            {review.reviewer_name}
                          </p>

                          <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-[#451713]/40">
                            {formatReviewDate(
                              review.created_at
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <StarRating
                          rating={Number(
                            review.rating
                          )}
                          size="small"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="max-w-[800px] text-[13px] leading-7 text-[#451713]/70 sm:text-[14px] sm:leading-8">
                        {review.review}
                      </p>

                      {user?.id ===
                        review.user_id && (
                        <span className="mt-5 inline-block text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/40">
                          Your review
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}