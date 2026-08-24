// app/admin/reviews/page.tsx

export default function ReviewsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <header className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
              JENTARA / CUSTOMERS
            </p>
          </div>

          <h1 className="mt-6 font-serif text-[48px] leading-[0.9] tracking-[-0.06em] sm:text-[68px]">
            Reviews
          </h1>

          <p className="mt-4 max-w-lg text-[12px] leading-6 text-[#451713]/50">
            Review customer feedback and moderate product reviews.
          </p>
        </header>

        <section className="grid gap-4 py-10 sm:grid-cols-3">
          {["All reviews", "Pending", "Published"].map((label) => (
            <div
              key={label}
              className="border border-[#451713]/12 p-6"
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
                {label}
              </p>

              <p className="mt-4 font-serif text-4xl">0</p>
            </div>
          ))}
        </section>

        <section className="border border-[#451713]/12">
          <div className="border-b border-[#451713]/10 p-6">
            <p className="font-serif text-3xl tracking-[-0.04em]">
              Review inbox
            </p>
          </div>

          <div className="flex min-h-[300px] items-center justify-center p-8 text-center">
            <div>
              <p className="font-serif text-3xl">
                No reviews to moderate.
              </p>

              <p className="mt-3 text-[11px] text-[#451713]/50">
                Customer reviews will appear here once the review system is
                connected.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}