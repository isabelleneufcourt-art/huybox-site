import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteBlogPostAction } from "@/app/admin/(protected)/blog/actions";

const dateFormatter = new Intl.DateTimeFormat("fr-BE", { day: "2-digit", month: "2-digit", year: "numeric" });

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Blog</h1>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
          <Plus className="h-4 w-4" /> Nouvel article
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Titre</th>
              <th className="px-4 py-3 font-medium">Catégorie</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Publié le</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-3 font-medium text-neutral-900">{post.title}</td>
                <td className="px-4 py-3 text-neutral-600">{post.category}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${post.published ? "bg-accent/10 text-accent" : "bg-neutral-100 text-neutral-500"}`}>
                    {post.published ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-500">{dateFormatter.format(post.publishedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/blog/${post.id}`} className="text-primary hover:underline" aria-label="Modifier">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <form action={deleteBlogPostAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="text-red-600 hover:underline" aria-label="Supprimer">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  Aucun article — la base n'est peut-être pas encore seedée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
