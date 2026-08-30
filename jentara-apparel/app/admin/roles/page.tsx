// app/admin/roles/page.tsx
const permissions = [
  "Dashboard",
  "Analytics",
  "Products",
  "Categories",
  "Inventory",
  "Orders",
  "Customers",
  "Reviews",
  "Queries",
  "Admin Users",
];

const roles = [
  {
    name: "Super Admin",
    key: "super_admin",
    description: "Complete access to JENTARA administration.",
    access: permissions,
  },
  {
    name: "Admin",
    key: "admin",
    description: "Manage the day-to-day store and customer operations.",
    access: permissions.filter((item) => item !== "Admin Users"),
  },
  {
    name: "Operations",
    key: "operations",
    description: "Orders, inventory and catalogue operations.",
    access: ["Dashboard", "Products", "Inventory", "Orders", "Analytics"],
  },
  {
    name: "Support",
    key: "support",
    description: "Customer care, reviews and support conversations.",
    access: ["Dashboard", "Customers", "Reviews", "Queries", "Orders"],
  },
  {
    name: "Customer",
    key: "customer",
    description: "Storefront access only. No administration access.",
    access: [],
  },
];

export default function RolesPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / ADMINISTRATION
          </p>
        </div>
        <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
          Roles & Permissions
        </h1>
        <p className="mt-4 max-w-xl text-[12px] leading-6 text-[#451713]/50">
          A clear permission model for the team behind the collection.
        </p>
      </header>

      <section className="grid gap-5 py-10 lg:grid-cols-2">
        {roles.map((role) => (
          <article key={role.key} className="border border-[#451713]/12 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-serif text-3xl">{role.name}</p>
                <p className="mt-3 max-w-md text-[11px] leading-5 text-[#451713]/50">
                  {role.description}
                </p>
              </div>
              <span className="border border-[#451713]/12 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.12em]">
                {role.key}
              </span>
            </div>

            <div className="mt-8 border-t border-[#451713]/10 pt-6">
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">
                Access
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {role.access.length === 0 ? (
                  <span className="text-[10px] text-[#451713]/45">Storefront only</span>
                ) : (
                  role.access.map((permission) => (
                    <span key={permission} className="border border-[#451713]/12 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#451713]/60">
                      {permission}
                    </span>
                  ))
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="border-t border-[#451713]/15 pt-8">
        <p className="max-w-2xl text-[10px] leading-5 text-[#451713]/45">
          This permission matrix matches the roles used by the admin UI. Supabase RLS must enforce these boundaries server-side; navigation visibility alone is not security.
        </p>
      </div>
    </div>
  );
}
