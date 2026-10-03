import type { BoxTypeData } from "@/lib/boxes";

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-800";

export function BoxForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Partial<BoxTypeData>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nom
          </label>
          <input id="name" name="name" required defaultValue={defaultValues?.name} className={inputClass} placeholder="Box 10 m³" />
        </div>
        <div>
          <label htmlFor="volumeM3" className={labelClass}>
            Volume (m³)
          </label>
          <input
            id="volumeM3"
            name="volumeM3"
            type="number"
            step="0.1"
            min="1"
            required
            defaultValue={defaultValues?.volumeM3}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="equivalence" className={labelClass}>
            Texte libre sous le volume (optionnel)
          </label>
          <input
            id="equivalence"
            name="equivalence"
            defaultValue={defaultValues?.equivalence ?? ""}
            className={inputClass}
            placeholder=""
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="monthlyPrice" className={labelClass}>
            Prix par mois (€ TVAC)
          </label>
          <input
            id="monthlyPrice"
            name="monthlyPrice"
            type="number"
            step="1"
            min="0"
            defaultValue={defaultValues?.monthlyPrice ?? 0}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="sortOrder" className={labelClass}>
            Ordre d'affichage
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={defaultValues?.sortOrder ?? 0}
            className={inputClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-neutral-800">
        <input type="checkbox" name="active" defaultChecked={defaultValues?.active ?? true} className="h-4 w-4 rounded border-neutral-300" />
        Actif (visible sur le site)
      </label>

      <button type="submit" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
        {submitLabel}
      </button>
    </form>
  );
}
