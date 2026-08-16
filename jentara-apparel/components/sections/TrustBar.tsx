// components/sections/TrustBar.tsx

const trustItems = [
  "PARTIAL COD AVAILABLE",
  "100% GENUINE PRODUCT",
  "100% SECURE PAYMENT",
  "FREE SHIPPING ₹999+",
];

export default function TrustBar() {
  return (
    <section className="bg-[#451713] text-[#f5ede4]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 divide-x divide-[#f5ede4]/15 md:grid-cols-4">

          {trustItems.map(
            (item, index) => (
              <div
                key={item}
                className="
                  flex
                  min-h-[72px]
                  items-center
                  justify-center
                  px-4
                  text-center
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#f5ede4]/80
                  transition-colors
                  duration-300
                  hover:text-[#f5ede4]
                  md:min-h-[82px]
                "
              >
                <span>
                  {index === 0 && "✦ "}
                  {index === 1 && "✓ "}
                  {index === 2 && "◇ "}
                  {index === 3 && "↓ "}
                  {item}
                </span>
              </div>
            )
          )}

        </div>
      </div>
    </section>
  );
}