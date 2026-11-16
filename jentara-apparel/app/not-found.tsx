import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f5ede4] px-6 py-20 text-[#451713]">
      <section className="w-full max-w-xl border-y border-[#451713]/15 py-14 text-center sm:py-20">
        <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
          JENTARA / 404
        </p>
        <h1 className="mt-6 font-serif text-5xl tracking-[-0.07em] sm:text-7xl">
          PAGE NOT FOUND
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[12px] leading-6 text-[#451713]/55">
          This page may have moved or the link may be incorrect.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#451713] px-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition hover:bg-[#32100d]"
        >
          Explore the collection
        </Link>
      </section>
    </main>
  );
}
