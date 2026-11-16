"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f5ede4] px-6 py-20 text-[#451713]">
      <section className="w-full max-w-xl border-y border-[#451713]/15 py-14 text-center sm:py-20">
        <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
          JENTARA / SOMETHING WENT WRONG
        </p>
        <h1 className="mt-6 font-serif text-4xl tracking-[-0.05em] sm:text-5xl">
          We couldn&apos;t load this page.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[12px] leading-6 text-[#451713]/55">
          Please try again. If the issue continues, return to the collection and
          try again later.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#451713] px-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f5ede4] transition hover:bg-[#32100d]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
