import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function PolitiqueConfidentialitePage() {
  return (
    <Section className="pb-16 pt-12 sm:pt-16">
      <div className="mx-auto max-w-2xl space-y-6 text-neutral-700">
        <h1 className="text-3xl">Politique de confidentialité</h1>
        <p>
          Ce site respecte le Règlement général sur la protection des données (RGPD). Les données
          transmises via le formulaire de contact (nom, prénom, email, téléphone, message) sont
          utilisées uniquement pour traiter votre demande et ne sont ni vendues, ni cédées à des
          tiers.
        </p>
        <section>
          <h2 className="text-xl">Données collectées</h2>
          <p>
            Formulaire de contact (nom, prénom, email, téléphone, message), données de navigation
            anonymisées via Google Analytics 4 (si les cookies analytiques sont acceptés).
          </p>
        </section>
        <section>
          <h2 className="text-xl">Durée de conservation</h2>
          <p>Les messages de contact sont conservés le temps nécessaire au traitement de votre demande, puis archivés ou supprimés.</p>
        </section>
        <section>
          <h2 className="text-xl">Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de
            suppression et d'opposition sur vos données personnelles. Pour exercer ces droits,
            contactez-nous via le formulaire de la page{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact
            </a>
            .
          </p>
        </section>
      </div>
    </Section>
  );
}
