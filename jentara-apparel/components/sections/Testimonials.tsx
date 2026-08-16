// components/sections/Testimonials.tsx

const reviews = [
  {
    number: "01",
    quote:
      "Amazing quality and fit. The oversized silhouette feels exactly right.",
    name: "Aarav Kumar",
  },
  {
    number: "02",
    quote:
      "Premium fabric, clean design and a fit that actually feels comfortable.",
    name: "Priya Sharma",
  },
  {
    number: "03",
    quote:
      "JENTARA has quickly become one of my favourite streetwear brands.",
    name: "Rohan Singh",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#eee5dc] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        <div className="mb-12 text-center">
          <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#451713]/50">
            The JENTARA Community
          </p>

          <h2 className="mt-4 font-serif text-[54px] leading-[0.85] tracking-[-0.06em] text-[#451713] sm:text-[76px]">
            What People Say
          </h2>

          <p className="mx-auto mt-5 max-w-[440px] text-[10px] leading-6 text-[#151a2a]/50">
            Real feedback from people
            discovering and wearing JENTARA
            every day.
          </p>
        </div>

        <div className="grid border-t border-[#451713]/15 md:grid-cols-3">
          {reviews.map(
            (review, index) => (
              <article
                key={review.number}
                className={`
                  group
                  border-b
                  border-[#451713]/15
                  px-0
                  py-8
                  md:px-8
                  md:py-10
                  ${
                    index !==
                    reviews.length - 1
                      ? "md:border-r"
                      : ""
                  }
                  ${
                    index === 0
                      ? "md:pl-0"
                      : ""
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-[#451713]/30">
                    {review.number}
                  </span>

                  <span className="text-[10px] tracking-[0.2em] text-[#451713]/50">
                    ★★★★★
                  </span>
                </div>

                <blockquote className="mt-12 font-serif text-[27px] leading-[1.05] tracking-[-0.03em] text-[#451713] sm:text-[30px]">
                  “{review.quote}”
                </blockquote>

                <div className="mt-8 flex items-center gap-3">
                  <span className="h-px w-6 bg-[#451713]/30" />

                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#451713]/60">
                    {review.name}
                  </span>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}