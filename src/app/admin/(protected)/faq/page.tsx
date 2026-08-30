import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteFaqAction } from "@/app/admin/(protected)/faq/actions";

export default async function AdminFaqPage() {
  const items = await prisma.faqItem.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">FAQ</h1>
        <Link href="/admin/faq/new" className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
          <Plus className="h-4 w-4" /> Nouvelle question
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Catégorie</th>
              <th className="px-4 py-3 font-medium">Question</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-neutral-600">{item.category}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">{item.question}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.published ? "bg-accent/10 text-accent" : "bg-neutral-100 text-neutral-500"}`}>
                    {item.published ? "Publiée" : "Masquée"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/faq/${item.id}`} className="text-primary hover:underline" aria-label="Modifier">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <form action={deleteFaqAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className="text-red-600 hover:underline" aria-label="Supprimer">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-500">
                  Aucune question — la base n'est peut-être pas encore seedée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
