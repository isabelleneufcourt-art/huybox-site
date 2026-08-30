import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatEuro, monthlyPrice } from "@/lib/utils";
import { deleteBoxAction } from "@/app/admin/(protected)/box/actions";

export default async function AdminBoxPage() {
  const boxes = await prisma.boxType.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Box &amp; tarifs</h1>
        <Link
          href="/admin/box/new"
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" /> Nouveau box
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Volume</th>
              <th className="px-4 py-3 font-medium">Prix/mois</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {boxes.map((box) => (
              <tr key={box.id}>
                <td className="px-4 py-3 font-medium text-neutral-900">{box.name}</td>
                <td className="px-4 py-3 text-neutral-600">{box.volumeM3} m³</td>
                <td className="px-4 py-3 text-neutral-600">
                  {formatEuro(monthlyPrice(box.volumeM3, box.pricePerM3))}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      box.active ? "bg-accent/10 text-accent" : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {box.active ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/box/${box.id}`} className="text-primary hover:underline" aria-label="Modifier">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <form action={deleteBoxAction}>
                      <input type="hidden" name="id" value={box.id} />
                      <button type="submit" className="text-red-600 hover:underline" aria-label="Supprimer">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {boxes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  Aucun box — la base n'est peut-être pas encore seedée (voir README &gt; `npm run db:seed`).
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
