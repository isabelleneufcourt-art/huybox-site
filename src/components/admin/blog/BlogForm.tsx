import type { BlogPost } from "@prisma/client";
import { BLOG_CATEGORIES } from "@/data/blog-content";

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-800";

export function BlogForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Partial<BlogPost>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
      <div>
        <label htmlFor="title" className={labelClass}>
          Titre
        </label>
        <input id="title" name="title" required defaultValue={defaultValues?.title} className={inputClass} />
      </div>
      <div>
        <label htmlFor="slug" className={labelClass}>
          Slug (URL) — laisser vide pour le générer depuis le titre
        </label>
        <input id="slug" name="slug" defaultValue={defaultValues?.slug} className={inputClass} placeholder="mon-article" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>
            Catégorie
          </label>
          <select id="category" name="category" defaultValue={defaultValues?.category ?? BLOG_CATEGORIES[0]} className={inputClass}>
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="coverImage" className={labelClass}>
            Image de couverture (URL, optionnel)
          </label>
          <input id="coverImage" name="coverImage" defaultValue={defaultValues?.coverImage ?? ""} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="excerpt" className={labelClass}>
          Chapô (résumé court)
        </label>
        <textarea id="excerpt" name="excerpt" required rows={2} defaultValue={defaultValues?.excerpt} className={inputClass} />
      </div>
      <div>
        <label htmlFor="content" className={labelClass}>
          Contenu (Markdown simple : ## titres, **gras**, listes -, liens [texte](url))
        </label>
        <textarea id="content" name="content" required rows={12} defaultValue={defaultValues?.content} className={cn_mono(inputClass)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="metaTitle" className={labelClass}>
            Meta title SEO (optionnel)
          </label>
          <input id="metaTitle" name="metaTitle" defaultValue={defaultValues?.metaTitle ?? ""} className={inputClass} />
        </div>
        <div>
          <label htmlFor="metaDescription" className={labelClass}>
            Meta description SEO (optionnel)
          </label>
          <input id="metaDescription" name="metaDescription" defaultValue={defaultValues?.metaDescription ?? ""} className={inputClass} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm font-medium text-neutral-800">
        <input type="checkbox" name="published" defaultChecked={defaultValues?.published ?? true} className="h-4 w-4 rounded border-neutral-300" />
        Publié sur le site
      </label>
      <button type="submit" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
        {submitLabel}
      </button>
    </form>
  );
}

function cn_mono(base: string) {
  return `${base} font-mono text-sm`;
}
