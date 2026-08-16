// components/sections/ServiceBenefits.tsx

const benefits = [
  {
    number: "01",
    title: "100% Secure Payment",
    description:
      "Safe and secure checkout designed for a smooth shopping experience.",
    symbol: "◇",
  },
  {
    number: "02",
    title: "Easy Return",
    description:
      "Hassle-free returns because your comfort comes first.",
    symbol: "↺",
  },
  {
    number: "03",
    title: "WhatsApp Support",
    description:
      "Chat with our team for quick and easy help.",
    symbol: "◌",
  },
  {
    number: "04",
    title: "Free Shipping",
    description:
      "Enjoy free shipping when you spend ₹999 or more.",
    symbol: "→",
  },
];

export default function ServiceBenefits() {
  return (
    <section className="bg-[#eee5dc] pb-20 pt-4 sm:pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        <div className="border-t border-[#451713]/15">
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {benefits.map(
              (benefit, index) => (
                <article
                  key={benefit.number}
                  className={`
                    group
                    border-b
                    border-[#451713]/15
                    py-9
                    md:px-7
                    lg:border-b-0
                    lg:border-r
                    lg:py-10
                    ${
                      index === 0
                        ? "md:pl-0"
                        : ""
                    }
                    ${
                      index ===
                      benefits.length - 1
                        ? "lg:border-r-0 lg:pr-0"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg text-[#451713]/30">
                      {benefit.number}
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#451713]/15 text-sm transition-all duration-300 group-hover:bg-[#451713] group-hover:text-[#f5ede4]">
                      {benefit.symbol}
                    </span>
                  </div>

                  <h3 className="mt-9 font-serif text-[26px] leading-none tracking-[-0.03em] text-[#451713]">
                    {benefit.title}
                  </h3>

                  <p className="mt-4 max-w-[250px] text-[10px] leading-6 text-[#151a2a]/50">
                    {benefit.description}
                  </p>
                </article>
              )
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-[#451713]/15 pt-10 text-center">
          <p className="font-serif text-[30px] tracking-[-0.04em] text-[#451713] sm:text-[40px]">
            Star Of The New Generation
          </p>

          <p className="mt-3 text-[7px] font-semibold uppercase tracking-[0.35em] text-[#451713]/40">
            JENTARA APPAREL · 2026
          </p>
        </div>
      </div>
    </section>
  );
}