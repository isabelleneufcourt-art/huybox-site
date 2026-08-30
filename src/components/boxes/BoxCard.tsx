import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatEuro, monthlyPrice } from "@/lib/utils";
import type { BoxTypeData } from "@/lib/boxes";

export function BoxCard({ box, highlight = false }: { box: BoxTypeData; highlight?: boolean }) {
  const price = monthlyPrice(box.volumeM3, box.pricePerM3);

  return (
    <Card
      className={highlight ? "border-2 border-secondary relative overflow-visible" : ""}
    >
      {highlight && (
        <span className="absolute -top-3 left-6 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">
          Le plus demandé
        </span>
      )}
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">{box.name}</p>
      <p className="mt-1 text-4xl font-bold text-neutral-900">{box.volumeM3} m³</p>
      {box.equivalence && <p className="mt-2 text-sm text-neutral-600">{box.equivalence}</p>}

      <ul className="mt-5 space-y-2 text-sm text-neutral-700">
        {box.dimensions && (
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-accent" /> Dimensions indicatives : {box.dimensions}
          </li>
        )}
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0 text-accent" /> Accès 7j/7, sans engagement
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0 text-accent" /> Tarif unique {box.pricePerM3} €/m³/mois TVAC
        </li>
      </ul>

      <div className="mt-6 border-t border-neutral-200 pt-5">
        <p className="text-3xl font-bold text-neutral-900">
          {formatEuro(price)}
          <span className="text-base font-medium text-neutral-500"> /mois TVAC</span>
        </p>
        <Button href="/contact#disponibilites" className="mt-4 w-full" variant={highlight ? "call" : "primary"}>
          Vérifier les disponibilités
        </Button>
      </div>
    </Card>
  );
}
