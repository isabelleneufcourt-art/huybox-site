import { cache } from "react";
import { prisma } from "@/lib/prisma";

export type SiteSettingsData = {
  phoneNumber: string;
  phoneNumberDisplay: string;
  addressStreet: string;
  addressCity: string;
  addressCountry: string;
  openingHours: string;
  googleMapsEmbedUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  virtualTourVideoUrl: string;
  virtualTourThumbnail: string | null;
  virtualTourEnabled: boolean;
  ga4Id: string | null;
  gtmId: string | null;
};

/**
 * Réglages du site : lus depuis la table SiteSettings (éditable en
 * back-office). Si la base n'est pas encore seedée, on retombe sur les
 * variables d'environnement pour que le site reste fonctionnel dès le
 * premier démarrage.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettingsData> => {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (settings) return settings;
  } catch {
    // base pas encore migrée/seedée — on utilise le fallback ci-dessous
  }

  return {
    phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+32 2 000 00 00",
    phoneNumberDisplay: process.env.NEXT_PUBLIC_PHONE_NUMBER_DISPLAY ?? "02 000 00 00",
    addressStreet: process.env.NEXT_PUBLIC_ADDRESS_STREET ?? "Rue de l'Entrepôt 12",
    addressCity: process.env.NEXT_PUBLIC_ADDRESS_CITY ?? "1000 Bruxelles",
    addressCountry: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY ?? "Belgique",
    openingHours: "Ouvert 7j/7, de 6h à 23h",
    googleMapsEmbedUrl:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
      "https://www.google.com/maps?q=Bruxelles&output=embed",
    heroTitle: "Box de stockage sécurisés, disponibles 7j/7",
    heroSubtitle: "Accès 7j/7 · Sans engagement · Sécurisé 24h/24",
    virtualTourVideoUrl:
      process.env.NEXT_PUBLIC_VIRTUAL_TOUR_VIDEO_URL ??
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
    virtualTourThumbnail: null,
    virtualTourEnabled: true,
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || null,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || null,
  };
});

export function phoneHref(phoneNumber: string) {
  return `tel:${phoneNumber.replace(/[^+\d]/g, "")}`;
}
