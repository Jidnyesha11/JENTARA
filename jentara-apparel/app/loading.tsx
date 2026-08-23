export default function Loading() {
  return (
    <main
      className="
        fixed
        inset-0
        z-[9999]
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#f5ede4]
        text-[#451713]
      "
      aria-label="Loading JENTARA"
      role="status"
    >
      <div className="flex w-full max-w-sm flex-col items-center px-8">
        <div className="overflow-hidden">
          <p
            className="
              select-none
              font-serif
              text-[42px]
              font-medium
              leading-none
              tracking-[-0.07em]
              opacity-90
              animate-pulse
              sm:text-[52px]
            "
          >
            jentara
          </p>
        </div>

        <div className="mt-8 h-px w-full overflow-hidden bg-[#451713]/10">
          <div
            className="
              h-full
              w-1/3
              bg-[#451713]
              animate-[loading_1.4s_ease-in-out_infinite]
            "
          />
        </div>

        <p
          className="
            mt-5
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.32em]
            text-[#451713]/45
          "
        >
          Preparing your experience
        </p>
      </div>
    </main>
  );
}