// app/size-guide/page.tsx
const sizeRows = [
  {
    size: "XS",
    chest: "34–36",
    length: "26",
    shoulder: "16",
  },
  {
    size: "S",
    chest: "36–38",
    length: "27",
    shoulder: "17",
  },
  {
    size: "M",
    chest: "38–40",
    length: "28",
    shoulder: "18",
  },
  {
    size: "L",
    chest: "40–42",
    length: "29",
    shoulder: "19",
  },
  {
    size: "XL",
    chest: "42–44",
    length: "30",
    shoulder: "20",
  },
  {
    size: "XXL",
    chest: "44–46",
    length: "31",
    shoulder: "21",
  },
];

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen bg-[#f5ede4] text-[#151a2a]">

      <section className="mx-auto max-w-[1500px] px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />

          <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#451713]">
            JENTARA / FIT GUIDE
          </p>
        </div>

        <div className="grid gap-10 border-b border-[#451713]/15 pb-16 md:grid-cols-[1fr_420px] md:items-end">
          <h1 className="font-serif text-[62px] leading-[0.82] tracking-[-0.07em] sm:text-[86px] md:text-[112px]">
            SIZE
            <br />
            GUIDE
          </h1>

          <p className="max-w-md text-sm leading-7 text-[#151a2a]/55 md:pb-2">
            Find your JENTARA fit. Use
            the measurements below as a
            guide and compare them with a
            garment that fits you well.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-24 md:px-10 md:pb-32">
        <div className="mb-10 grid gap-8 md:grid-cols-2">
          <div className="border border-[#451713]/15 bg-[#faf6f1] p-8 md:p-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]">
              01 / CHEST
            </p>

            <p className="mt-5 text-sm leading-7 text-[#151a2a]/60">
              Measure around the fullest
              part of your chest. Keep the
              measuring tape relaxed and
              parallel to the floor.
            </p>
          </div>

          <div className="border border-[#451713]/15 bg-[#faf6f1] p-8 md:p-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]">
              02 / LENGTH
            </p>

            <p className="mt-5 text-sm leading-7 text-[#151a2a]/60">
              Measure from the highest
              point of the shoulder down to
              the bottom hem of the garment.
            </p>
          </div>
        </div>

        <div className="overflow-hidden border border-[#451713]/15 bg-[#faf6f1]">
          <div className="border-b border-[#451713]/15 px-6 py-5 md:px-8">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#451713]">
                JENTARA / STANDARD FIT
              </p>

              <p className="text-[8px] uppercase tracking-[0.18em] text-[#151a2a]/40">
                Measurements in inches
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse">
              <thead>
                <tr className="border-b border-[#451713]/15">
                  <th className="px-6 py-5 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713] md:px-8">
                    Size
                  </th>

                  <th className="px-6 py-5 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]">
                    Chest
                  </th>

                  <th className="px-6 py-5 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]">
                    Length
                  </th>

                  <th className="px-6 py-5 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-[#451713]">
                    Shoulder
                  </th>
                </tr>
              </thead>

              <tbody>
                {sizeRows.map(
                  (row) => (
                    <tr
                      key={row.size}
                      className="
                        border-b
                        border-[#451713]/10
                        transition-colors
                        last:border-b-0
                        hover:bg-[#451713]
                        hover:text-[#faf6f1]
                      "
                    >
                      <td className="px-6 py-6 font-serif text-2xl md:px-8">
                        {row.size}
                      </td>

                      <td className="px-6 py-6 text-sm">
                        {row.chest}
                      </td>

                      <td className="px-6 py-6 text-sm">
                        {row.length}
                      </td>

                      <td className="px-6 py-6 text-sm">
                        {row.shoulder}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 border-t border-[#451713]/15 pt-8">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#451713]">
            FIT NOTE
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#151a2a]/55">
            Measurements can vary slightly
            between products because of
            fabric, construction and fit.
            Always check the individual
            product description when
            available.
          </p>
        </div>
      </section>
    </main>
  );
}