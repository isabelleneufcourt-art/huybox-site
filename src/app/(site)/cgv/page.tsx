import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Conditions générales de vente" };

export default function CgvPage() {
  return (
    <Section className="pb-16 pt-12 sm:pt-16">
      <div className="mx-auto max-w-2xl space-y-6 text-neutral-700">
        <h1 className="text-3xl">Conditions générales de vente</h1>
        <p className="text-sm text-neutral-500">
          Modèle à faire relire par un juriste avant publication — clauses à adapter au contrat
          signé en centre.
        </p>
        <section>
          <h2 className="text-xl">1. Objet</h2>
          <p>
            Les présentes CGV régissent la location de box de self-stockage. Toute réservation est
            confirmée uniquement après vérification téléphonique des disponibilités et signature
            d'un contrat au centre.
          </p>
        </section>
        <section>
          <h2 className="text-xl">2. Tarifs</h2>
          <p>
            Le tarif de location est de 8 €/m³/mois TVAC, sans engagement de durée minimale, sauf
            offre promotionnelle en vigueur.
          </p>
        </section>
        <section>
          <h2 className="text-xl">3. Assurance</h2>
          <p>
            L'assurance des biens stockés est obligatoire et reste à la charge exclusive du
            client. Aucune assurance n'est proposée par le centre via ce site.
          </p>
        </section>
        <section>
          <h2 className="text-xl">4. Résiliation</h2>
          <p>Les modalités de résiliation et de préavis sont précisées dans le contrat signé au centre.</p>
        </section>
      </div>
    </Section>
  );
}
