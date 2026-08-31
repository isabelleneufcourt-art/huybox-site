import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { VideoEmbed } from "@/components/media/VideoEmbed";
import { PhotoGallery } from "@/components/media/PhotoGallery";
import { MapEmbed } from "@/components/media/MapEmbed";
import { ReservationBlock } from "@/components/booking/ReservationBlock";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Notre bâtiment",
  description:
    "Découvrez notre bâtiment de self-stockage : adresse, horaires, visite virtuelle vidéo, galerie photo et localisation.",
};

export default async function NotreBatimentPage() {
  const settings = await getSiteSettings();
  const mapsSearchQuery = encodeURIComponent(`${settings.addressStreet}, ${settings.addressCity}`);

  return (
    <>
      <Section tone="neutral" className="pb-10 pt-12 sm:pt-16">
        <SectionHeading eyebrow="Notre bâtiment" title="Un bâtiment neuf, propre et sécurisé" />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-neutral-700">
            <p>
              Notre bâtiment de self-stockage a été conçu pour vous offrir un espace propre,
              ventilé et facilement accessible, sans escaliers, pour déposer et récupérer vos
              affaires en toute simplicité.
            </p>
            <p>
              <strong className="text-neutral-900">Adresse :</strong> {settings.addressStreet},{" "}
              {settings.addressCity}, {settings.addressCountry}
            </p>
            <p>
              <strong className="text-neutral-900">Horaires d'accès :</strong> {settings.openingHours}
            </p>
            <p>
              Locaux récents, entretenus régulièrement et pensés pour la tranquillité de nos
              clients : circulation aisée, chariots disponibles et zone de chargement dédiée à
              l'entrée du bâtiment.
            </p>
          </div>
          <MapEmbed embedUrl={settings.googleMapsEmbedUrl} className="aspect-video lg:aspect-auto lg:h-full" />
        </div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${mapsSearchQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Itinéraire vers le bâtiment <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </Section>

      {settings.virtualTourEnabled && settings.virtualTourVideoUrl && (
        <Section id="visite-virtuelle">
          <SectionHeading
            eyebrow="Visite virtuelle"
            title="Découvrez notre bâtiment en vidéo"
            description="De l'entrée aux box, pour vous rendre compte de la propreté, de la sécurité et de l'accessibilité, avant même de vous déplacer."
          />
          <VideoEmbed videoUrl={settings.virtualTourVideoUrl} thumbnailUrl={settings.virtualTourThumbnail} />
        </Section>
      )}

      <Section tone="neutral">
        <SectionHeading eyebrow="Galerie" title="Le bâtiment en images" />
        <PhotoGallery />
      </Section>

      <Section>
        <ReservationBlock phoneNumber={settings.phoneNumber} phoneNumberDisplay={settings.phoneNumberDisplay} />
      </Section>
    </>
  );
}
