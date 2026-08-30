import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateLeadStatusAction, addLeadNoteAction } from "@/app/admin/(protected)/leads/actions";

const dateFormatter = new Intl.DateTimeFormat("fr-BE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: { notes: { orderBy: { createdAt: "desc" } } },
  });
  if (!lead) notFound();

  const updateStatus = updateLeadStatusAction.bind(null, lead.id);
  const addNote = addLeadNoteAction.bind(null, lead.id);

  return (
    <div className="max-w-2xl">
      <Link href="/admin/leads" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Retour aux contacts
      </Link>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h1 className="text-xl">
          {lead.firstName} {lead.lastName}
        </h1>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-neutral-600">
          <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 hover:text-primary">
            <Mail className="h-4 w-4" /> {lead.email}
          </a>
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary">
              <Phone className="h-4 w-4" /> {lead.phone}
            </a>
          )}
        </div>
        <p className="mt-4 whitespace-pre-wrap rounded-lg bg-neutral-50 p-4 text-sm text-neutral-700">{lead.message}</p>
        <p className="mt-3 text-xs text-neutral-400">
          Reçu le {dateFormatter.format(lead.createdAt)} · Source : {lead.source}
        </p>

        <form action={updateStatus} className="mt-5 flex items-center gap-3">
          <select
            name="status"
            defaultValue={lead.status}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="NEW">Nouveau</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="DONE">Traité</option>
          </select>
          <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
            Mettre à jour le statut
          </button>
        </form>
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-heading font-semibold text-neutral-900">Notes internes</h2>
        <form action={addNote} className="mt-3 flex gap-3">
          <input
            name="body"
            placeholder="Ajouter une note (ex. appelé le 12/09, en attente de retour)"
            className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button type="submit" className="rounded-lg bg-neutral-800 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-900">
            Ajouter
          </button>
        </form>

        <ul className="mt-4 space-y-3">
          {lead.notes.map((note) => (
            <li key={note.id} className="rounded-lg bg-neutral-50 p-3 text-sm">
              <p className="text-neutral-700">{note.body}</p>
              <p className="mt-1 text-xs text-neutral-400">{dateFormatter.format(note.createdAt)}</p>
            </li>
          ))}
          {lead.notes.length === 0 && <p className="text-sm text-neutral-500">Aucune note pour le moment.</p>}
        </ul>
      </div>
    </div>
  );
}
