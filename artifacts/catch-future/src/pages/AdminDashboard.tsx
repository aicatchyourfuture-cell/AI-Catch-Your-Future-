import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAdminMe,
  useListInquiries,
  useAdminLogout,
  getAdminMeQueryKey,
  getListInquiriesQueryKey,
  type Inquiry,
  type InquiryType,
} from "@workspace/api-client-react";

const TYPE_LABELS: Record<InquiryType, string> = {
  lookbook: "Lookbook",
  trade: "Trade",
  general: "General",
};

const TYPE_FILTERS: ReadonlyArray<{ value: "all" | InquiryType; label: string }> = [
  { value: "all", label: "All" },
  { value: "lookbook", label: "Lookbook" },
  { value: "trade", label: "Trade" },
  { value: "general", label: "General" },
];

function escapeCsv(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function downloadCsv(rows: Inquiry[]): void {
  const header = ["id", "createdAt", "name", "email", "inquiryType", "message"];
  const lines = [header.join(",")];
  for (const row of rows) {
    lines.push(
      [
        String(row.id),
        row.createdAt,
        escapeCsv(row.name),
        escapeCsv(row.email),
        row.inquiryType,
        escapeCsv(row.message),
      ].join(","),
    );
  }
  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `catch-future-inquiries-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | InquiryType>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const me = useAdminMe({
    query: {
      queryKey: getAdminMeQueryKey(),
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  const listEnabled = me.isSuccess;
  const list = useListInquiries({
    query: {
      queryKey: getListInquiriesQueryKey(),
      enabled: listEnabled,
    },
  });

  const logout = useAdminLogout({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: getAdminMeQueryKey(),
        });
        await queryClient.invalidateQueries({
          queryKey: getListInquiriesQueryKey(),
        });
        navigate("/admin/login");
      },
    },
  });

  const items = list.data?.items ?? [];
  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.inquiryType === filter)),
    [items, filter],
  );

  const selected = useMemo(
    () => (selectedId == null ? null : items.find((i) => i.id === selectedId) ?? null),
    [items, selectedId],
  );

  const counts = useMemo(() => {
    const byType: Record<InquiryType, number> = {
      lookbook: 0,
      trade: 0,
      general: 0,
    };
    for (const i of items) byType[i.inquiryType] += 1;
    return byType;
  }, [items]);

  if (me.isLoading) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center text-forest font-sans text-sm uppercase tracking-[0.25em]">
        Loading…
      </main>
    );
  }

  if (me.isError) {
    navigate("/admin/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-cream text-forest">
      <header className="bg-forest text-cream weave-texture">
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Catch Future · Atelier
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight">
              The <span className="italic">Lookbook</span> Ledger.
            </h1>
            <p className="font-sans text-cream/60 text-sm mt-3 max-w-xl">
              Every inquiry received from the salon floor, newest first.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => downloadCsv(filtered)}
              disabled={filtered.length === 0}
              className="font-sans text-xs uppercase tracking-[0.25em] border-b border-cream/30 pb-1 hover:border-gold hover:text-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => logout.mutate()}
              className="font-sans text-xs uppercase tracking-[0.25em] border-b border-cream/30 pb-1 hover:border-gold hover:text-gold transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="border-b border-forest/10 bg-beige/40">
        <div className="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-forest/50 mb-2">
              Total inquiries
            </p>
            <p className="font-serif text-4xl">{items.length}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-forest/50 mb-2">
              Lookbook
            </p>
            <p className="font-serif text-4xl">{counts.lookbook}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-forest/50 mb-2">
              Trade
            </p>
            <p className="font-serif text-4xl">{counts.trade}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-forest/50 mb-2">
              General
            </p>
            <p className="font-serif text-4xl">{counts.general}</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {TYPE_FILTERS.map((option) => {
            const isActive = filter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-sans border transition-colors ${
                  isActive
                    ? "bg-forest text-cream border-forest"
                    : "border-forest/20 text-forest/70 hover:border-forest"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {list.isLoading ? (
          <p className="font-sans text-sm text-forest/60">Loading inquiries…</p>
        ) : list.isError ? (
          <p className="font-sans text-sm text-red-700">
            Could not load inquiries. Please refresh.
          </p>
        ) : filtered.length === 0 ? (
          <div className="border border-forest/15 p-12 text-center">
            <p className="font-serif text-2xl mb-2">No inquiries yet.</p>
            <p className="font-sans text-sm text-forest/60">
              When someone reaches out from the landing page, they will appear here.
            </p>
          </div>
        ) : (
          <div className="border border-forest/15 divide-y divide-forest/10">
            {filtered.map((inquiry) => {
              const isOpen = selectedId === inquiry.id;
              return (
                <article key={inquiry.id} className="bg-cream">
                  <button
                    type="button"
                    onClick={() => setSelectedId(isOpen ? null : inquiry.id)}
                    className="w-full text-left px-6 py-5 grid grid-cols-12 items-baseline gap-4 hover:bg-beige/30 transition-colors"
                  >
                    <span className="col-span-12 md:col-span-3 font-serif text-lg text-forest">
                      {inquiry.name}
                    </span>
                    <span className="col-span-7 md:col-span-3 font-sans text-sm text-forest/70 truncate">
                      {inquiry.email}
                    </span>
                    <span className="col-span-5 md:col-span-2">
                      <span className="inline-block text-[0.65rem] uppercase tracking-[0.2em] font-sans text-gold border border-gold/40 px-2 py-1">
                        {TYPE_LABELS[inquiry.inquiryType]}
                      </span>
                    </span>
                    <span className="col-span-12 md:col-span-3 font-sans text-xs text-forest/50 md:text-right">
                      {formatDate(inquiry.createdAt)}
                    </span>
                    <span className="col-span-12 md:col-span-1 md:text-right font-sans text-xs text-forest/40">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="px-6 pb-8 pt-2 bg-beige/20 border-t border-forest/10">
                      <p className="text-xs uppercase tracking-widest font-sans text-forest/50 mb-3">
                        Message
                      </p>
                      <p className="font-serif text-lg text-forest leading-relaxed whitespace-pre-wrap max-w-3xl">
                        {inquiry.message}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-6 text-xs font-sans text-forest/60">
                        <a
                          href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                            "Re: your inquiry — Catch Future",
                          )}`}
                          className="uppercase tracking-[0.2em] border-b border-forest/30 pb-1 hover:border-gold hover:text-gold transition-colors"
                        >
                          Reply by email
                        </a>
                        <span className="uppercase tracking-[0.2em]">
                          Inquiry #{inquiry.id}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}

        {selected ? null : null}
      </section>
    </main>
  );
}
