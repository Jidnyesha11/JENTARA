// app/admin/users/page.tsx

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <header className="flex flex-col justify-between gap-6 border-b border-[#451713]/15 pb-10 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#451713]" />

              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
                JENTARA / ADMINISTRATION
              </p>
            </div>

            <h1 className="mt-6 font-serif text-[48px] leading-[0.9] tracking-[-0.06em] sm:text-[68px]">
              Admin Users
            </h1>

            <p className="mt-4 max-w-lg text-[12px] leading-6 text-[#451713]/50">
              Control who can access the JENTARA administration area.
            </p>
          </div>

          <button
            type="button"
            className="min-h-11 bg-[#451713] px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#f5ede4] transition hover:bg-[#5c211b]"
          >
            + Add admin
          </button>
        </header>

        <section className="py-10">
          <div className="border border-[#451713]/12">
            <div className="hidden grid-cols-[1fr_160px_140px_100px] border-b border-[#451713]/10 px-6 py-4 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40 md:grid">
              <span>Administrator</span>
              <span>Role</span>
              <span>Status</span>
              <span>Access</span>
            </div>

            <div className="flex min-h-[340px] items-center justify-center p-8 text-center">
              <div>
                <p className="font-serif text-3xl">
                  Admin management is ready to configure.
                </p>

                <p className="mx-auto mt-3 max-w-md text-[11px] leading-5 text-[#451713]/50">
                  Connect this page to your admin-role tables before allowing
                  additional administrator accounts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}