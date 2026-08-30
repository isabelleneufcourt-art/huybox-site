import { FAQ_CATEGORIES } from "@/data/faq-content";
import type { FaqItemData } from "@/lib/faq";

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-800";

export function FaqForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Partial<FaqItemData>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
      <div>
        <label htmlFor="category" className={labelClass}>
          Catégorie
        </label>
        <select id="category" name="category" defaultValue={defaultValues?.category ?? FAQ_CATEGORIES[0]} className={inputClass}>
          {FAQ_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="question" className={labelClass}>
          Question
        </label>
        <input id="question" name="question" required defaultValue={defaultValues?.question} className={inputClass} />
      </div>
      <div>
        <label htmlFor="answer" className={labelClass}>
          Réponse
        </label>
        <textarea id="answer" name="answer" required rows={4} defaultValue={defaultValues?.answer} className={inputClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sortOrder" className={labelClass}>
            Ordre d'affichage
          </label>
          <input id="sortOrder" name="sortOrder" type="number" defaultValue={0} className={inputClass} />
        </div>
        <label className="flex items-center gap-2 self-end pb-2.5 text-sm font-medium text-neutral-800">
          <input type="checkbox" name="published" defaultChecked className="h-4 w-4 rounded border-neutral-300" />
          Publiée sur le site
        </label>
      </div>
      <button type="submit" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
        {submitLabel}
      </button>
    </form>
  );
}
