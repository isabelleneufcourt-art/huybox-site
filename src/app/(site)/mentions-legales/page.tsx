import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = { title: "Mentions légales" };

export default async function MentionsLegalesPage() {
  const settings = await getSiteSettings();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Self Storage FX";

  return (
    <Section className="pb-16 pt-12 sm:pt-16">
      <div className="prose-neutral mx-auto max-w-2xl space-y-6 text-neutral-700">
        <h1 className="text-3xl">Mentions légales</h1>
        <p className="text-sm text-neutral-500">
          Contenu à valider par le client avant mise en ligne — informations d'identification de
          l'entreprise à compléter (raison sociale, forme juridique, capital, n° d'entreprise/TVA,
          RCS).
        </p>
        <section>
          <h2 className="text-xl">Éditeur du site</h2>
          <p>
            {siteName}
            <br />
            {settings.addressStreet}, {settings.addressCity}, {settings.addressCountry}
            <br />
            Téléphone : {settings.phoneNumberDisplay}
          </p>
        </section>
        <section>
          <h2 className="text-xl">Hébergement</h2>
          <p>À compléter selon l'hébergeur retenu (voir README &gt; Déploiement).</p>
        </section>
        <section>
          <h2 className="text-xl">Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus (textes, images, logo) présents sur ce site est la propriété
            de {siteName}, sauf mention contraire, et ne peut être reproduit sans autorisation.
          </p>
        </section>
      </div>
    </Section>
  );
}
