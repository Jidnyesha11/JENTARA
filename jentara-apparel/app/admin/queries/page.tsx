// app/admin/queries/page.tsx

export default function QueriesPage() {
  const statuses = [
    ["New", "0"],
    ["Open", "0"],
    ["In progress", "0"],
    ["Resolved", "0"],
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <header className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
              JENTARA / CUSTOMERS
            </p>
          </div>

          <h1 className="mt-6 font-serif text-[48px] leading-[0.9] tracking-[-0.06em] sm:text-[68px]">
            Queries
          </h1>

          <p className="mt-4 max-w-lg text-[12px] leading-6 text-[#451713]/50">
            Manage customer questions, support requests and order-related
            conversations.
          </p>
        </header>

        <section className="grid border-b border-[#451713]/15 sm:grid-cols-2 lg:grid-cols-4">
          {statuses.map(([label, value]) => (
            <div
              key={label}
              className="border-b border-[#451713]/10 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0"
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
                {label}
              </p>

              <p className="mt-4 font-serif text-4xl">{value}</p>
            </div>
          ))}
        </section>

        <section className="py-10">
          <div className="border border-[#451713]/12">
            <div className="border-b border-[#451713]/10 p-6">
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
                Support inbox
              </p>

              <h2 className="mt-2 font-serif text-3xl">
                Customer conversations
              </h2>
            </div>

            <div className="flex min-h-[300px] items-center justify-center p-8 text-center">
              <div>
                <p className="font-serif text-3xl">
                  Your inbox is clear.
                </p>

                <p className="mx-auto mt-3 max-w-md text-[11px] leading-5 text-[#451713]/50">
                  Customer queries will appear here once the support workflow
                  is connected.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}