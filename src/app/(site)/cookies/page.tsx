import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Gestion des cookies" };

export default function CookiesPage() {
  return (
    <Section className="pb-16 pt-12 sm:pt-16">
      <div className="mx-auto max-w-2xl space-y-6 text-neutral-700">
        <h1 className="text-3xl">Gestion des cookies</h1>
        <p>
          Lors de votre première visite, un bandeau vous permet d'accepter ou de refuser les
          cookies non essentiels. Votre choix est mémorisé sur cet appareil et peut être modifié à
          tout moment en effaçant les données de navigation de votre navigateur pour ce site.
        </p>
        <section>
          <h2 className="text-xl">Cookies essentiels</h2>
          <p>Nécessaires au fonctionnement du site (préférences de navigation). Toujours actifs.</p>
        </section>
        <section>
          <h2 className="text-xl">Cookies de mesure d'audience</h2>
          <p>
            Google Analytics 4, activé uniquement après acceptation, pour mesurer la
            fréquentation du site et améliorer son contenu.
          </p>
        </section>
      </div>
    </Section>
  );
}
