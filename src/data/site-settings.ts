// Réglages du site (figés depuis l'ancien back-office). Pour les modifier,
// éditer ce fichier puis pousser sur GitHub.
export type SiteSettingsData = {
  phoneNumber: string;
  phoneNumberDisplay: string;
  contactEmail: string;
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

export const SITE_SETTINGS: SiteSettingsData = {
  "phoneNumber": "+32 475 89 07 88",
  "phoneNumberDisplay": "0475 89 07 88",
  "contactEmail": "info@huybox.be",
  "addressStreet": "Avenue des Fossés 36",
  "addressCity": "4500 Huy",
  "addressCountry": "Belgique",
  "openingHours": "Ouvert 7j/7, de 7h à 22h",
  "googleMapsEmbedUrl": "https://maps.app.goo.gl/Q3T8vSrJhjMjXQge7",
  "heroTitle": "Box de stockage sécurisés, disponibles 7j/7",
  "heroSubtitle": "Accès 7j/7 · Sans engagement · Sécurisé 24h/24",
  "virtualTourVideoUrl": "https://www.facebook.com/reel/575050758957096",
  "virtualTourThumbnail": null,
  "virtualTourEnabled": true,
  "ga4Id": null,
  "gtmId": null
};
