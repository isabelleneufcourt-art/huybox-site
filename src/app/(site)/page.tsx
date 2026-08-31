import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { VideoEmbed } from "@/components/media/VideoEmbed";
import { BoxCard } from "@/components/boxes/BoxCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getSiteSettings } from "@/lib/settings";
import { getBoxTypes } from "@/lib/boxes";
import { localBusinessJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Box de stockage sécurisés",
  description:
    "Louez un box de self-stockage sécurisé, accessible 7j/7. 3 tailles disponibles (8, 10, 15 m³), tarif unique 8 €/m³/mois. Vérifiez les disponibilités par téléphone.",
};

export default async function HomePage() {
  const [settings, boxes] = await Promise.all([getSiteSettings(), getBoxTypes()]);
  const jsonLd = localBusinessJsonLd(settings);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
        phoneNumber={settings.phoneNumber}
        phoneNumberDisplay={settings.phoneNumberDisplay}
        city={settings.addressCity}
        hasVirtualTour={settings.virtualTourEnabled && Boolean(settings.virtualTourVideoUrl)}
      />

      <Section tone="neutral">
        <TrustBadges />
      </Section>

      {settings.virtualTourEnabled && settings.virtualTourVideoUrl && (
        <Section id="visite-virtuelle">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <VideoEmbed
              videoUrl={settings.virtualTourVideoUrl}
              thumbnailUrl={settings.virtualTourThumbnail}
            />
            <div>
              <SectionHeading
                eyebrow="Visite virtuelle"
                title="Découvrez notre centre en vidéo"
                description="De l'entrée aux box, faites-vous une idée précise de la propreté, de la sécurité et de l'accessibilité de nos locaux — sans vous déplacer."
              />
              <Link
                href="/notre-centre"
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
              >
                Découvrir le centre en vidéo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Section>
      )}

      <Section tone="neutral">
        <SectionHeading
          eyebrow="Nos box"
          title="3 tailles, un tarif unique"
          description="8 €/m³/mois TVAC, quelle que soit la taille du box. Pas de frais cachés."
          center
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {boxes.map((box, i) => (
            <BoxCard key={box.id} box={box} highlight={i === 1} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/box-tarifs" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
            Voir les détails &amp; tarifs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Simple et rapide" title="Comment ça marche" center />
        <HowItWorks />
      </Section>

      <Section tone="neutral">
        <SectionHeading eyebrow="Avis clients" title="Ce que nos clients en disent" center />
        <Testimonials />
      </Section>
    </>
  );
}
