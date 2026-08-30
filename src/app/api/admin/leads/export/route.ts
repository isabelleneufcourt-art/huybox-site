import { prisma } from "@/lib/prisma";

// Toujours exécuté par requête (export protégé par le middleware, données
// mutables) — jamais mis en cache statique au build.
export const dynamic = "force-dynamic";

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  const header = ["Prénom", "Nom", "Email", "Téléphone", "Message", "Statut", "Source", "Reçu le"];
  const rows = leads.map((lead) => [
    lead.firstName,
    lead.lastName,
    lead.email,
    lead.phone ?? "",
    lead.message,
    lead.status,
    lead.source,
    lead.createdAt.toISOString(),
  ]);

  const csv = [header, ...rows].map((row) => row.map((cell) => csvEscape(String(cell))).join(",")).join("\n");

  return new Response(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contacts-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
