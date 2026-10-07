import { SITE_SETTINGS, type SiteSettingsData } from "@/data/site-settings";

export type { SiteSettingsData };

/** Réglages du site, définis dans src/data/site-settings.ts. */
export async function getSiteSettings(): Promise<SiteSettingsData> {
  return SITE_SETTINGS;
}

export function phoneHref(phoneNumber: string) {
  return `tel:${phoneNumber.replace(/[^+\d]/g, "")}`;
}
