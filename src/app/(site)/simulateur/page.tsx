import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SimulateurForm } from "@/components/simulateur/SimulateurForm";
import { getSiteSettings } from "@/lib/settings";
import { getBoxTypes } from "@/lib/boxes";

export const metadata: Metadata = {
  title: "Simulateur de volume",
  description:
    "Estimez en quelques clics le volume de stockage dont vous avez besoin et découvrez la taille de box recommandée avec son tarif mensuel.",
};

export default async function SimulateurPage() {
  const [settings, boxes] = await Promise.all([getSiteSettings(), getBoxTypes()]);

  return (
    <Section tone="neutral" className="pb-16 pt-12 sm:pt-16">
      <SectionHeading
        eyebrow="Simulateur"
        title="Quel volume de stockage vous faut-il ?"
        description="Répondez à quelques questions sur votre logement pour obtenir une estimation immédiate."
      />
      <SimulateurForm boxes={boxes} phoneNumber={settings.phoneNumber} phoneNumberDisplay={settings.phoneNumberDisplay} />
    </Section>
  );
}
