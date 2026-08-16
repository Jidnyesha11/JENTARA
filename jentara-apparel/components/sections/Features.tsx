// components/sections/Features.tsx

const features = [
  {
    number: "01",
    title: "Perfect Oversize Fit",
    description:
      "Balanced proportions designed for comfort, structure and effortless street presence.",
  },
  {
    number: "02",
    title: "High Quality Fabric",
    description:
      "Premium fabric selected for softness, durability and a luxe everyday feel.",
  },
  {
    number: "03",
    title: "High Quality Print",
    description:
      "Crisp detailing and lasting impact designed to keep your graphics looking fresh.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#f5ede4] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        <div className="mb-12 flex flex-col gap-5 border-b border-[#451713]/15 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/50">
              Why JENTARA
            </p>

            <h2 className="mt-3 max-w-[620px] font-serif text-[43px] leading-[0.9] tracking-[-0.05em] text-[#451713] sm:text-[56px]">
              Built for the way
              <br />
              you move.
            </h2>
          </div>

          <p className="max-w-[330px] text-[10px] leading-6 text-[#151a2a]/50 md:text-right">
            Every detail is intentional —
            from the silhouette and fabric
            to the final print.
          </p>
        </div>

        <div className="grid md:grid-cols-3">
          {features.map(
            (feature, index) => (
              <article
                key={feature.number}
                className={`
                  group
                  relative
                  border-[#451713]/15
                  py-8
                  md:px-8
                  md:py-10
                  ${
                    index !==
                    features.length - 1
                      ? "border-b md:border-b-0 md:border-r"
                      : ""
                  }
                  ${
                    index === 0
                      ? "md:pl-0"
                      : ""
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif text-xl text-[#451713]/30">
                    {feature.number}
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#451713]/15 text-sm transition-all duration-300 group-hover:bg-[#451713] group-hover:text-[#f5ede4]">
                    +
                  </span>
                </div>

                <h3 className="mt-12 max-w-[280px] font-serif text-[32px] leading-[0.95] tracking-[-0.04em] text-[#451713]">
                  {feature.title}
                </h3>

                <p className="mt-5 max-w-[330px] text-[11px] leading-6 text-[#151a2a]/55">
                  {feature.description}
                </p>

                <div className="mt-8 h-px w-8 bg-[#451713]/30 transition-all duration-500 group-hover:w-16" />
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}