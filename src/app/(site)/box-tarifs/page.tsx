import type { Metadata } from "next";
import { ShieldOff } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BoxCard } from "@/components/boxes/BoxCard";
import { ReservationBlock } from "@/components/booking/ReservationBlock";
import { getSiteSettings } from "@/lib/settings";
import { getBoxTypes } from "@/lib/boxes";
import { getStorageOptions } from "@/lib/options";

export const metadata: Metadata = {
  title: "Box & tarifs",
  description:
    "3 tailles de box (8, 10, 15 m³) au tarif unique de 8 €/m³/mois TVAC. Vérifiez les disponibilités par téléphone, pas de réservation en ligne.",
};

export default async function BoxTarifsPage() {
  const [settings, boxes, options] = await Promise.all([
    getSiteSettings(),
    getBoxTypes(),
    getStorageOptions(),
  ]);

  return (
    <>
      <Section tone="neutral" className="pb-10 pt-12 sm:pt-16">
        <SectionHeading
          eyebrow="Box & tarifs"
          title="Un tarif unique, simple et transparent"
          description={`${boxes[0]?.pricePerM3 ?? 8} €/m³/mois TVAC, quelle que soit la taille de box choisie. Pas de frais de dossier, pas d'engagement de durée.`}
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {boxes.map((box, i) => (
            <BoxCard key={box.id} box={box} highlight={i === 1} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Options" title="Pour faciliter votre stockage" />
        <div className="grid gap-6 sm:grid-cols-3">
          {options.map((option) => (
            <div key={option.id} className="rounded-2xl border border-neutral-200 p-6">
              <p className="font-heading font-semibold text-neutral-900">{option.name}</p>
              <p className="mt-1.5 text-sm text-neutral-600">{option.description}</p>
              <p className="mt-3 text-sm font-semibold text-primary">{option.priceInfo}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <ShieldOff className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" aria-hidden />
          <p className="text-sm text-neutral-600">
            <strong className="text-neutral-800">Pas d'assurance via le site.</strong> L'assurance
            des biens stockés est obligatoire ; chaque client doit assurer ses propres biens
            auprès de son assureur. Voir la page{" "}
            <a href="/securite" className="font-medium text-primary hover:underline">
              Sécurité &amp; garanties
            </a>
            .
          </p>
        </div>
      </Section>

      <Section tone="neutral">
        <ReservationBlock phoneNumber={settings.phoneNumber} phoneNumberDisplay={settings.phoneNumberDisplay} />
      </Section>
    </>
  );
}
