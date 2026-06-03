import Container from "../layout/Container";

export default function HeroSection() {
  return (
    <section className="bg-[#f5f1ec]">

      <Container>

        <div className="grid lg:grid-cols-2 min-h-[750px]">

          <div className="flex items-center">

            <div>

              <p className="uppercase tracking-[0.5em] text-sm text-neutral-600">
                Star Of The New Generation
              </p>

              <h1 className="mt-4 text-6xl md:text-8xl font-bold text-[#4b1e1e]">
                JENTARA
              </h1>

              <p className="mt-8 text-xl max-w-lg">
                Modern streetwear with premium oversized fits,
                authentic style and bold identity.
              </p>

              <button className="mt-10 bg-[#4b1e1e] text-white px-10 py-4 rounded-md">
                Shop Now
              </button>

            </div>
          </div>

          <div className="flex items-center justify-center">

            <div className="w-[500px] h-[650px] bg-neutral-200 rounded-lg">
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}