// app/admin/queries/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getAdminQueries,
  updateQueryStatus,
  type CustomerQuery,
  type QueryStatus,
} from "@/lib/supabase/admin-queries";

const statuses: QueryStatus[] = ["new", "open", "in_progress", "resolved"];

function label(value: string) {
  return value.replace("_", " ");
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<CustomerQuery[]>([]);
  const [filter, setFilter] = useState<"all" | QueryStatus>("all");
  const [loading, setLoading] = useState(true);

  async function loadQueries() {
    try {
      setQueries(await getAdminQueries());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadQueries();
  }, []);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? queries
        : queries.filter((query) => query.status === filter),
    [filter, queries],
  );

  async function changeStatus(id: string, status: QueryStatus) {
    try {
      const updated = await updateQueryStatus(id, status);
      setQueries((current) =>
        current.map((query) => (query.id === id ? updated : query)),
      );
    } catch (error) {
      console.error(error);
      window.alert("Query status could not be updated.");
    }
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />
          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / CUSTOMERS
          </p>
        </div>
        <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
          Queries
        </h1>
        <p className="mt-4 max-w-lg text-[12px] leading-6 text-[#451713]/50">
          Keep customer questions visible until they are resolved.
        </p>
      </header>

      <section className="grid border-b border-[#451713]/15 sm:grid-cols-2 lg:grid-cols-4">
        {statuses.map((status) => (
          <div key={status} className="border-b border-[#451713]/10 px-1 py-7 sm:border-r sm:px-6 lg:border-b-0">
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#451713]/40">{label(status)}</p>
            <p className="mt-4 font-serif text-4xl">
              {queries.filter((query) => query.status === status).length}
            </p>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap gap-2 py-7">
        {(["all", ...statuses] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`min-h-9 border px-4 text-[8px] font-semibold uppercase tracking-[0.15em] ${
              filter === status ? "border-[#451713] bg-[#451713] text-[#f5ede4]" : "border-[#451713]/15"
            }`}
          >
            {label(status)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-[9px] uppercase tracking-[0.2em] text-[#451713]/40">Loading queries</div>
      ) : filtered.length === 0 ? (
        <div className="border-y border-[#451713]/12 py-20 text-center">
          <p className="font-serif text-3xl">Your inbox is clear.</p>
          <p className="mt-3 text-[11px] text-[#451713]/45">New contact messages will appear here.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#451713]/10 border-y border-[#451713]/12">
          {filtered.map((query) => (
            <article key={query.id} className="grid gap-5 py-7 lg:grid-cols-[220px_1fr_auto]">
              <div>
                <p className="text-[11px] font-semibold">{query.full_name}</p>
                <p className="mt-1 break-all text-[9px] text-[#451713]/45">{query.email}</p>
                <p className="mt-3 text-[8px] uppercase tracking-[0.13em] text-[#451713]/35">
                  {new Date(query.created_at).toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl">{query.subject}</h2>
                <p className="mt-3 max-w-3xl whitespace-pre-wrap text-[12px] leading-7 text-[#451713]/65">
                  {query.message}
                </p>
              </div>

              <select
                value={query.status}
                onChange={(event) =>
                  void changeStatus(query.id, event.target.value as QueryStatus)
                }
                className="min-h-9 self-start border border-[#451713]/15 bg-transparent px-3 text-[8px] font-semibold uppercase tracking-[0.12em]"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{label(status)}</option>
                ))}
              </select>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
