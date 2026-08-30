
"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getAnalyticsDataset,
  type AnalyticsDataset,
} from "@/lib/supabase/admin-analytics";

type DateRange =
  | "7"
  | "30"
  | "90"
  | "365"
  | "all";

type OrderSort =
  | "date_desc"
  | "date_asc"
  | "amount_desc"
  | "amount_asc";

function money(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function shortMoney(value: number): string {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }

  return money(value);
}

function normalizeStatus(status: string | null): string {
  return (
    status?.trim().toLowerCase() || "pending"
  );
}

function statusLabel(status: string): string {
  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

function dateRangeStart(
  range: DateRange,
): Date | null {
  if (range === "all") {
    return null;
  }

  const days = Number(range);
  const date = new Date();

  date.setDate(
    date.getDate() - days + 1,
  );

  date.setHours(0, 0, 0, 0);

  return date;
}

function formatDate(
  value: string,
): string {
  return new Date(value).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
}

function Chart({
  values,
  labels,
  formatter,
}: {
  values: number[];
  labels: string[];
  formatter: (value: number) => string;
}) {
  const width = 900;
  const height = 280;
  const paddingX = 20;
  const paddingY = 30;

  const max = Math.max(
    ...values,
    1,
  );

  const points = values.map(
    (value, index) => {
      const x =
        values.length === 1
          ? width / 2
          : paddingX +
            (index /
              (values.length - 1)) *
              (width - paddingX * 2);

      const y =
        height -
        paddingY -
        (value / max) *
          (height - paddingY * 2);

      return {
        x,
        y,
      };
    },
  );

  const line = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
    )
    .join(" ");

  const area = `${line} L ${width - paddingX} ${height - paddingY} L ${paddingX} ${height - paddingY} Z`;

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[280px] w-full"
        role="img"
        aria-label="Analytics chart"
      >
        <line
          x1={paddingX}
          y1={height - paddingY}
          x2={width - paddingX}
          y2={height - paddingY}
          stroke="currentColor"
          className="text-[#451713]/15"
        />

        <path
          d={area}
          fill="currentColor"
          className="text-[#451713]/[0.06]"
        />

        <path
          d={line}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className="text-[#451713]"
        />

        {points.map(
          (point, index) => (
            <circle
              key={`${labels[index]}-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="currentColor"
              className="text-[#451713]"
            >
              <title>
                {labels[index]}:{" "}
                {formatter(
                  values[index],
                )}
              </title>
            </circle>
          ),
        )}
      </svg>

      <div className="grid grid-cols-4 gap-2 text-[8px] uppercase tracking-[0.12em] text-[#451713]/35 sm:grid-cols-6 lg:grid-cols-12">
        {labels.map(
          (label, index) => (
            <span
              key={`${label}-${index}`}
              className={
                index %
                  Math.ceil(
                    labels.length /
                      6,
                  ) ===
                0
                  ? "block"
                  : "hidden sm:block"
              }
            >
              {label}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="border-b border-[#451713]/10 px-1 py-7 sm:border-r sm:px-6 lg:border-b-0">
      <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
        {label}
      </p>

      <p className="mt-4 font-serif text-4xl tracking-[-0.05em]">
        {value}
      </p>

      {detail && (
        <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-[#451713]/35">
          {detail}
        </p>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  const [dataset, setDataset] =
    useState<AnalyticsDataset | null>(
      null,
    );

  const [range, setRange] =
    useState<DateRange>("30");

  const [status, setStatus] =
    useState("all");

  const [sort, setSort] =
    useState<OrderSort>("date_desc");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data =
          await getAnalyticsDataset();

        if (!cancelled) {
          setDataset(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          console.error(
            "Analytics loading failed:",
            loadError,
          );

          setError(
            "Analytics could not be loaded.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredOrders =
    useMemo(() => {
      if (!dataset) {
        return [];
      }

      const start =
        dateRangeStart(range);

      return dataset.orders.filter(
        (order) => {
          const date =
            new Date(
              order.created_at,
            );

          if (
            start &&
            date < start
          ) {
            return false;
          }

          if (
            status !== "all" &&
            normalizeStatus(
              order.status,
            ) !== status
          ) {
            return false;
          }

          return true;
        },
      );
    }, [dataset, range, status]);

  const metrics = useMemo(() => {
    if (!dataset) {
      return {
        revenue: 0,
        orders: 0,
        customers: 0,
        averageOrder: 0,
        lowStock: 0,
        pendingOrders: 0,
      };
    }

    const revenue =
      filteredOrders.reduce(
        (sum, order) =>
          sum +
          Number(
            order.total_amount || 0,
          ),
        0,
      );

    const customerIds =
      new Set(
        filteredOrders
          .map(
            (order) =>
              order.user_id,
          )
          .filter(Boolean),
      );

    const lowStock =
      dataset.products.filter(
        (product) =>
          Number(
            product.stock ?? 0,
          ) <= 5,
      ).length;

    const pendingOrders =
      dataset.orders.filter(
        (order) =>
          normalizeStatus(
            order.status,
          ) === "pending",
      ).length;

    return {
      revenue,
      orders: filteredOrders.length,
      customers:
        customerIds.size,
      averageOrder:
        filteredOrders.length
          ? revenue /
            filteredOrders.length
          : 0,
      lowStock,
      pendingOrders,
    };
  }, [dataset, filteredOrders]);

  const revenueChart =
    useMemo(() => {
      const groups = new Map<
        string,
        number
      >();

      const now = new Date();

      const count =
        range === "7"
          ? 7
          : range === "30"
            ? 10
            : range === "90"
              ? 12
              : 12;

      for (
        let index = count - 1;
        index >= 0;
        index -= 1
      ) {
        const date = new Date(
          now,
        );

        if (range === "7") {
          date.setDate(
            date.getDate() -
              index,
          );
        } else {
          date.setMonth(
            date.getMonth() -
              index,
          );
        }

        const key =
          range === "7"
            ? date.toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                },
              )
            : date.toLocaleDateString(
                "en-IN",
                {
                  month: "short",
                },
              );

        groups.set(
          `${key}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
          0,
        );
      }

      const entries =
        Array.from(
          groups.entries(),
        );

      for (const order of filteredOrders) {
        const date =
          new Date(
            order.created_at,
          );

        const matching =
          entries.find(
            ([key]) => {
              const parts =
                key.split("-");

              if (
                range === "7"
              ) {
                return (
                  Number(
                    parts[
                      parts.length -
                        3
                    ],
                  ) ===
                    date.getFullYear() &&
                  Number(
                    parts[
                      parts.length -
                        2
                    ],
                  ) ===
                    date.getMonth() &&
                  Number(
                    parts[
                      parts.length -
                        1
                    ],
                  ) ===
                    date.getDate()
                );
              }

              return (
                Number(
                  parts[
                    parts.length -
                      2
                  ],
                ) ===
                  date.getMonth() &&
                Number(
                  parts[
                    parts.length -
                      1
                  ],
                ) ===
                  date.getDate()
              );
            },
          );

        if (matching) {
          groups.set(
            matching[0],
            (groups.get(
              matching[0],
            ) ?? 0) +
              Number(
                order.total_amount ||
                  0,
              ),
          );
        }
      }

      return {
        labels: entries.map(
          ([key]) =>
            key.split("-")[0],
        ),
        values: entries.map(
          ([key]) =>
            groups.get(key) ?? 0,
        ),
      };
    }, [filteredOrders, range]);

  const statusBreakdown =
    useMemo(() => {
      if (!dataset) {
        return [];
      }

      const map = new Map<
        string,
        number
      >();

      for (const order of filteredOrders) {
        const value =
          normalizeStatus(
            order.status,
          );

        map.set(
          value,
          (map.get(value) ?? 0) +
            1,
        );
      }

      const total =
        filteredOrders.length ||
        1;

      return Array.from(
        map.entries(),
      )
        .map(
          ([value, count]) => ({
            value,
            count,
            percentage:
              (count / total) *
              100,
          }),
        )
        .sort(
          (a, b) =>
            b.count -
            a.count,
        );
    }, [dataset, filteredOrders]);

  const topProducts =
    useMemo(() => {
      if (!dataset) {
        return [];
      }

      const map = new Map<
        string,
        {
          quantity: number;
          revenue: number;
        }
      >();

      const orderIds =
        new Set(
          filteredOrders.map(
            (order) =>
              order.id,
          ),
        );

      for (const item of dataset.orderItems) {
        if (
          item.order_id &&
          !orderIds.has(
            item.order_id,
          )
        ) {
          continue;
        }

        const name =
          item.product_name ||
          "Unknown product";

        const quantity =
          Number(
            item.quantity ?? 0,
          );

        const revenue =
          Number(
            item.price ?? 0,
          ) * quantity;

        const current =
          map.get(name) ?? {
            quantity: 0,
            revenue: 0,
          };

        map.set(name, {
          quantity:
            current.quantity +
            quantity,
          revenue:
            current.revenue +
            revenue,
        });
      }

      return Array.from(
        map.entries(),
      )
        .map(
          ([productName, data]) => ({
            productName,
            ...data,
          }),
        )
        .sort(
          (a, b) =>
            b.revenue -
            a.revenue,
        );
    }, [dataset, filteredOrders]);

  const sortedOrders =
    useMemo(() => {
      return [...filteredOrders].sort(
        (a, b) => {
          if (
            sort ===
            "amount_desc"
          ) {
            return (
              Number(
                b.total_amount,
              ) -
              Number(
                a.total_amount,
              )
            );
          }

          if (
            sort ===
            "amount_asc"
          ) {
            return (
              Number(
                a.total_amount,
              ) -
              Number(
                b.total_amount,
              )
            );
          }

          const aDate =
            new Date(
              a.created_at,
            ).getTime();

          const bDate =
            new Date(
              b.created_at,
            ).getTime();

          return sort ===
            "date_asc"
            ? aDate - bDate
            : bDate - aDate;
        },
      );
    }, [filteredOrders, sort]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="animate-pulse">
          <div className="h-2 w-32 bg-[#451713]/10" />
          <div className="mt-7 h-16 w-64 bg-[#451713]/10" />
          <div className="mt-12 grid gap-px sm:grid-cols-3">
            <div className="h-32 bg-[#451713]/5" />
            <div className="h-32 bg-[#451713]/5" />
            <div className="h-32 bg-[#451713]/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !dataset) {
    return (
      <div className="mx-auto max-w-[1500px] px-5 py-24 text-center">
        <p className="font-serif text-3xl">
          {error ||
            "Analytics unavailable."}
        </p>

        <button
          type="button"
          onClick={() =>
            window.location.reload()
          }
          className="mt-6 border-b border-[#451713] pb-1 text-[9px] font-semibold uppercase tracking-[0.18em]"
        >
          Try again →
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />

          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / ANALYTICS
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-serif text-[52px] leading-[0.9] tracking-[-0.06em] sm:text-[72px]">
              Analytics
            </h1>

            <p className="mt-4 max-w-xl text-[12px] leading-6 text-[#451713]/55">
              Read the movement of the JENTARA
              collection across revenue, orders,
              customers and stock.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(
              [
                ["7", "7 days"],
                ["30", "30 days"],
                ["90", "90 days"],
                ["365", "12 months"],
                ["all", "All time"],
              ] as const
            ).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setRange(value)
                  }
                  className={`min-h-9 border px-4 text-[8px] font-semibold uppercase tracking-[0.15em] transition ${
                    range === value
                      ? "border-[#451713] bg-[#451713] text-[#f5ede4]"
                      : "border-[#451713]/15 hover:bg-[#451713]/5"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>
      </header>

      <section className="grid border-b border-[#451713]/15 sm:grid-cols-2 lg:grid-cols-6">
        <StatCard
          label="Revenue"
          value={money(
            metrics.revenue,
          )}
          detail={`${filteredOrders.length} orders in view`}
        />

        <StatCard
          label="Orders"
          value={metrics.orders.toLocaleString(
            "en-IN",
          )}
          detail={
            status === "all"
              ? "All statuses"
              : statusLabel(
                  status,
                )
          }
        />

        <StatCard
          label="Customers"
          value={metrics.customers.toLocaleString(
            "en-IN",
          )}
          detail="Unique buyers"
        />

        <StatCard
          label="Average order"
          value={money(
            metrics.averageOrder,
          )}
          detail="Revenue / orders"
        />

        <StatCard
          label="Low stock"
          value={metrics.lowStock.toLocaleString(
            "en-IN",
          )}
          detail="5 units or fewer"
        />

        <StatCard
          label="Pending"
          value={metrics.pendingOrders.toLocaleString(
            "en-IN",
          )}
          detail="Across all orders"
        />
      </section>

      <section className="grid gap-8 py-10 lg:grid-cols-[1.6fr_0.8fr]">
        <article className="border border-[#451713]/12 p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
                Financial movement
              </p>

              <h2 className="mt-2 font-serif text-3xl">
                Revenue
              </h2>
            </div>

            <p className="text-[10px] text-[#451713]/40">
              {money(metrics.revenue)}
            </p>
          </div>

          <div className="mt-8">
            <Chart
              values={
                revenueChart.values
              }
              labels={
                revenueChart.labels
              }
              formatter={shortMoney}
            />
          </div>
        </article>

        <article className="border border-[#451713]/12 p-6 sm:p-8">
          <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
            Order composition
          </p>

          <h2 className="mt-2 font-serif text-3xl">
            Status
          </h2>

          <div className="mt-8 space-y-5">
            {statusBreakdown.length ===
            0 ? (
              <p className="text-[11px] text-[#451713]/45">
                No orders in this
                period.
              </p>
            ) : (
              statusBreakdown.map(
                (item) => (
                  <div
                    key={item.value}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.12em]">
                        {statusLabel(
                          item.value,
                        )}
                      </span>

                      <span className="text-[9px] text-[#451713]/45">
                        {item.count} ·{" "}
                        {Math.round(
                          item.percentage,
                        )}
                        %
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 bg-[#451713]/8">
                      <div
                        className="h-full bg-[#451713]"
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                ),
              )
            )}
          </div>
        </article>
      </section>

      <section className="border-t border-[#451713]/15 py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
              Product performance
            </p>

            <h2 className="mt-2 font-serif text-4xl">
              Top Products
            </h2>
          </div>

          <p className="text-[9px] uppercase tracking-[0.15em] text-[#451713]/35">
            Sorted by revenue
          </p>
        </div>

        <div className="mt-7 divide-y divide-[#451713]/10 border-y border-[#451713]/12">
          {topProducts.length ===
          0 ? (
            <div className="py-16 text-center text-[11px] text-[#451713]/45">
              No product sales in
              this period.
            </div>
          ) : (
            topProducts
              .slice(0, 10)
              .map(
                (
                  product,
                  index,
                ) => (
                  <div
                    key={
                      product.productName
                    }
                    className="grid gap-3 px-5 py-5 sm:grid-cols-[50px_1fr_120px_140px] sm:items-center sm:px-6"
                  >
                    <span className="font-serif text-2xl text-[#451713]/30">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span className="text-[12px]">
                      {
                        product.productName
                      }
                    </span>

                    <span className="text-[10px] text-[#451713]/50">
                      {
                        product.quantity
                      }{" "}
                      sold
                    </span>

                    <span className="text-[11px] font-semibold sm:text-right">
                      {money(
                        product.revenue,
                      )}
                    </span>
                  </div>
                ),
              )
          )}
        </div>
      </section>

      <section className="border-t border-[#451713]/15 py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#451713]/40">
              Order intelligence
            </p>

            <h2 className="mt-2 font-serif text-4xl">
              Recent Orders
            </h2>
          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value,
              )
            }
            className="min-h-10 border border-[#451713]/15 bg-transparent px-3 text-[8px] font-semibold uppercase tracking-[0.13em] outline-none"
          >
            <option value="all">
              All statuses
            </option>

            {Array.from(
              new Set(
                dataset.orders.map(
                  (order) =>
                    normalizeStatus(
                      order.status,
                    ),
                ),
              ),
            )
              .sort()
              .map(
                (value) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {statusLabel(
                      value,
                    )}
                  </option>
                ),
              )}
          </select>
        </div>

        <div className="mt-7 overflow-x-auto border-y border-[#451713]/12">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[1fr_1fr_150px_130px_130px] border-b border-[#451713]/10 px-5 py-4 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#451713]/35">
              <span>Order</span>
              <span>Customer</span>
              <button
                type="button"
                onClick={() =>
                  setSort(
                    sort ===
                      "amount_desc"
                      ? "amount_asc"
                      : "amount_desc",
                  )
                }
                className="text-left"
              >
                Amount ↕
              </button>
              <span>Status</span>
              <button
                type="button"
                onClick={() =>
                  setSort(
                    sort ===
                      "date_desc"
                      ? "date_asc"
                      : "date_desc",
                  )
                }
                className="text-left"
              >
                Date ↕
              </button>
            </div>

            {sortedOrders
              .slice(0, 20)
              .map(
                (order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-[1fr_1fr_150px_130px_130px] items-center border-b border-[#451713]/8 px-5 py-5 last:border-b-0"
                  >
                    <span className="font-mono text-[9px]">
                      #{order.id.slice(
                        0,
                        8,
                      )}
                    </span>

                    <span className="truncate pr-5 text-[10px]">
                      {order.customer_name ||
                        order.customer_email ||
                        "Customer"}
                    </span>

                    <span className="text-[11px] font-semibold">
                      {money(
                        Number(
                          order.total_amount,
                        ),
                      )}
                    </span>

                    <span className="text-[8px] font-semibold uppercase tracking-[0.1em]">
                      {statusLabel(
                        normalizeStatus(
                          order.status,
                        ),
                      )}
                    </span>

                    <span className="text-[9px] text-[#451713]/45">
                      {formatDate(
                        order.created_at,
                      )}
                    </span>
                  </div>
                ),
              )}

            {sortedOrders.length ===
              0 && (
              <div className="py-16 text-center text-[11px] text-[#451713]/45">
                No orders match
                these filters.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
