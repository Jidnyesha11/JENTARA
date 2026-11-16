// app/admin/automation/logs/page.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

interface MessageLog {
  id: string;
  recipient_email: string | null;
  channel: string;
  event: string | null;
  provider_message_id: string | null;
  status: string;
  subject: string | null;
  error_message: string | null;
  sent_at: string | null;
  created_at: string;
}

function statusClass(
  status: string,
) {
  switch (
    status.toLowerCase()
  ) {
    case "sent":
    case "delivered":
      return "bg-green-100 text-green-700";

    case "failed":
      return "bg-red-100 text-red-700";

    case "pending":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function AutomationLogsPage() {
  const [logs, setLogs] =
    useState<MessageLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    const loadLogs = async () => {
      setLoading(true);

      try {
        const response =
          await fetch(
            "/api/admin/automation/logs",
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.error ??
              "Unable to load logs.",
          );
        }

        if (isMounted) {
          setLogs(
            result.logs ?? [],
          );
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load logs.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadLogs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <header className="border-b border-[#451713]/15 pb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#451713]" />

          <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#451713]/45">
            JENTARA / AUTOMATION / LOGS
          </p>
        </div>

        <h1 className="mt-6 font-serif text-[50px] leading-[0.9] tracking-[-0.06em] sm:text-[70px]">
          Message Logs
        </h1>

        <p className="mt-4 text-[12px] text-[#451713]/50">
          Monitor every automated customer
          communication.
        </p>
      </header>

      <section className="mt-10 overflow-x-auto border border-[#451713]/12">
        {loading ? (
          <div className="p-10 text-[9px] uppercase tracking-[0.18em] text-[#451713]/40">
            Loading
          </div>
        ) : error ? (
          <div className="p-10 text-[10px] text-[#7b2924]">
            {error}
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-serif text-2xl">
              No messages yet.
            </p>

            <p className="mt-2 text-[10px] text-[#451713]/45">
              Sent order emails will appear here.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-[#451713]/10">
                <th className="p-5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/40">
                  Recipient
                </th>

                <th className="p-5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/40">
                  Event
                </th>

                <th className="p-5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/40">
                  Channel
                </th>

                <th className="p-5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/40">
                  Status
                </th>

                <th className="p-5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#451713]/40">
                  Sent
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#451713]/10">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="p-5 text-[11px]">
                    {log.recipient_email ??
                      "—"}
                  </td>

                  <td className="p-5 text-[10px] uppercase tracking-[0.08em]">
                    {log.event ??
                      "—"}
                  </td>

                  <td className="p-5 text-[10px] uppercase tracking-[0.08em]">
                    {log.channel}
                  </td>

                  <td className="p-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] ${statusClass(log.status)}`}
                    >
                      {log.status}
                    </span>
                  </td>

                  <td className="p-5 text-[10px] text-[#451713]/50">
                    {log.sent_at
                      ? new Date(
                          log.sent_at,
                        ).toLocaleString(
                          "en-IN",
                        )
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}