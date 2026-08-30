import Link from "next/link";
import { Download } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import type { LeadStatus } from "@prisma/client";

const STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "Nouveau",
  IN_PROGRESS: "En cours",
  DONE: "Traité",
};

const STATUS_STYLES: Record<LeadStatus, string> = {
  NEW: "bg-secondary/10 text-secondary",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  DONE: "bg-accent/10 text-accent",
};

const dateFormatter = new Intl.DateTimeFormat("fr-BE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

const FILTERS: { value: LeadStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "Tous" },
  { value: "NEW", label: "Nouveaux" },
  { value: "IN_PROGRESS", label: "En cours" },
  { value: "DONE", label: "Traités" },
];

export default async function AdminLeadsPage({ searchParams }: { searchParams: { status?: string } }) {
  const statusFilter = searchParams.status as LeadStatus | undefined;
  const leads = await prisma.lead.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl">Contacts (leads)</h1>
        <a
          href="/api/admin/leads/export"
          className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
        >
          <Download className="h-4 w-4" /> Export CSV
        </a>
      </div>

      <div className="mt-4 flex gap-2">
        {FILTERS.map((filter) => (
          <Link
            key={filter.value}
            href={filter.value === "ALL" ? "/admin/leads" : `/admin/leads?status=${filter.value}`}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium",
              (filter.value === "ALL" && !statusFilter) || statusFilter === filter.value
                ? "bg-primary text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            )}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Reçu le</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="cursor-pointer hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="block">
                    <p className="font-medium text-neutral-900">
                      {lead.firstName} {lead.lastName}
                    </p>
                    <p className="text-xs text-neutral-500">{lead.email}</p>
                  </Link>
                </td>
                <td className="max-w-xs truncate px-4 py-3 text-neutral-600">{lead.message}</td>
                <td className="px-4 py-3 text-neutral-600">{lead.source}</td>
                <td className="px-4 py-3">
                  <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", STATUS_STYLES[lead.status])}>
                    {STATUS_LABELS[lead.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-500">{dateFormatter.format(lead.createdAt)}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  Aucun message pour ce filtre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
