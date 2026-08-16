// components/sections/InstagramSection.tsx

const socialTiles = [
  {
    number: "01",
    label: "THE NEW GENERATION",
  },
  {
    number: "02",
    label: "WEAR WITH INTENT",
  },
  {
    number: "03",
    label: "DEFINE YOUR PRESENCE",
  },
  {
    number: "04",
    label: "BUILT DIFFERENT",
  },
  {
    number: "05",
    label: "JENTARA / 001",
  },
  {
    number: "06",
    label: "STREET / CULTURE",
  },
];

export default function InstagramSection() {
  return (
    <section className="bg-[#451713] py-20 text-[#f5ede4] sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#f5ede4]/60" />

              <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#f5ede4]/55">
                @JENTARAAPPAREL
              </p>
            </div>

            <h2
              className="
                mt-4
                font-serif
                text-[56px]
                leading-[0.82]
                tracking-[-0.06em]
                sm:text-[74px]
              "
            >
              Instagram
            </h2>
          </div>

          <p className="max-w-[330px] text-[10px] leading-6 text-[#f5ede4]/50 sm:text-right">
            Real people. Real fits.
            <br />
            The JENTARA community.
          </p>
        </div>

        {/* =====================================================
            SOCIAL GRID
        ===================================================== */}

        <div className="grid grid-cols-2 gap-px bg-[#f5ede4]/15 md:grid-cols-3">

          {socialTiles.map((tile) => (
              <a
                key={tile.number}
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  relative
                  aspect-square
                  overflow-hidden
                  bg-[#4f1b16]
                "
              >
                {/* Editorial visual */}

                <div className="absolute inset-0 bg-gradient-to-br from-[#65231c] via-[#451713] to-[#24100d] transition-transform duration-700 group-hover:scale-105" />

                <div className="absolute inset-[9%] border border-[#f5ede4]/10 transition-all duration-500 group-hover:inset-[7%] group-hover:border-[#f5ede4]/25" />

                <div className="absolute left-[12%] top-[12%]">
                  <p className="font-serif text-[65px] leading-none tracking-[-0.08em] text-[#f5ede4]/10 sm:text-[90px]">
                    J
                  </p>
                </div>

                <div className="absolute bottom-[12%] left-[12%] right-[12%]">
                  <p className="text-[7px] font-semibold uppercase tracking-[0.25em] text-[#f5ede4]/45">
                    {tile.number}
                  </p>

                  <p className="mt-2 max-w-[180px] font-serif text-xl leading-none tracking-[-0.03em] text-[#f5ede4]/70 sm:text-2xl">
                    {tile.label}
                  </p>
                </div>

                <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#f5ede4]/20 text-sm opacity-50 transition-all duration-300 group-hover:bg-[#f5ede4] group-hover:text-[#451713] group-hover:opacity-100">
                  ↗
                </div>
              </a>
            )
          )}

        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              items-center
              gap-5
              border-b
              border-[#f5ede4]/30
              pb-2
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.2em]
              transition-colors
              hover:border-[#f5ede4]
            "
          >
            Follow @JENTARAAPPAREL

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}