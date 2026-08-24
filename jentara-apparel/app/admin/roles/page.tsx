// app/admin/roles/page.tsx

const permissions = [
  "Dashboard",
  "Products",
  "Categories",
  "Inventory",
  "Orders",
  "Customers",
  "Reviews",
  "Queries",
  "Analytics",
];

const roles = [
  {
    name: "Super Admin",
    description: "Complete access to JENTARA administration.",
  },
  {
    name: "Admin",
    description: "Manage the day-to-day store operations.",
  },
  {
    name: "Operations",
    description: "Orders, inventory and delivery operations.",
  },
  {
    name: "Support",
    description: "Customers, reviews and support queries.",
  },
];

export default function RolesPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <header className="border-b border-[#451713]/15 pb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#451713]" />

            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
              JENTARA / ADMINISTRATION
            </p>
          </div>

          <h1 className="mt-6 font-serif text-[48px] leading-[0.9] tracking-[-0.06em] sm:text-[68px]">
            Roles & Permissions
          </h1>

          <p className="mt-4 max-w-xl text-[12px] leading-6 text-[#451713]/50">
            Define which areas of the JENTARA administration each team member
            can access.
          </p>
        </header>

        <section className="grid gap-5 py-10 lg:grid-cols-2">
          {roles.map((role) => (
            <article
              key={role.name}
              className="border border-[#451713]/12 p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-serif text-3xl tracking-[-0.04em]">
                    {role.name}
                  </p>

                  <p className="mt-3 max-w-md text-[11px] leading-5 text-[#451713]/50">
                    {role.description}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label={`Edit ${role.name}`}
                  className="text-[9px] font-semibold uppercase tracking-[0.16em] underline underline-offset-4"
                >
                  Edit
                </button>
              </div>

              <div className="mt-8 border-t border-[#451713]/10 pt-6">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
                  Available permissions
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {permissions.map((permission) => (
                    <span
                      key={permission}
                      className="border border-[#451713]/12 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#451713]/60"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="border-t border-[#451713]/15 pt-8">
          <p className="max-w-2xl text-[10px] leading-5 text-[#451713]/45">
            The UI defines the permission model, but access must ultimately be
            enforced by authenticated server-side authorization and database
            policies. Hiding a navigation item alone is not a security
            boundary.
          </p>
        </section>
      </div>
    </div>
  );
}