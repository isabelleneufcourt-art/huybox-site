"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export interface SaveSettingsState {
  status: "idle" | "ok" | "error";
  message?: string;
}

export async function updateSiteSettingsAction(
  _prevState: SaveSettingsState,
  formData: FormData
): Promise<SaveSettingsState> {
  const data = {
    phoneNumber: String(formData.get("phoneNumber") ?? "").trim(),
    phoneNumberDisplay: String(formData.get("phoneNumberDisplay") ?? "").trim(),
    contactEmail: String(formData.get("contactEmail") ?? "").trim(),
    addressStreet: String(formData.get("addressStreet") ?? "").trim(),
    addressCity: String(formData.get("addressCity") ?? "").trim(),
    addressCountry: String(formData.get("addressCountry") ?? "").trim(),
    openingHours: String(formData.get("openingHours") ?? "").trim(),
    googleMapsEmbedUrl: String(formData.get("googleMapsEmbedUrl") ?? "").trim(),
    heroTitle: String(formData.get("heroTitle") ?? "").trim(),
    heroSubtitle: String(formData.get("heroSubtitle") ?? "").trim(),
    virtualTourVideoUrl: String(formData.get("virtualTourVideoUrl") ?? "").trim(),
    virtualTourThumbnail: String(formData.get("virtualTourThumbnail") ?? "").trim() || null,
    virtualTourEnabled: formData.get("virtualTourEnabled") === "on",
    ga4Id: String(formData.get("ga4Id") ?? "").trim() || null,
    gtmId: String(formData.get("gtmId") ?? "").trim() || null,
  };

  try {
    await prisma.siteSettings.upsert({
      where: { id: 1 },
      create: { id: 1, ...data },
      update: data,
    });
  } catch (err) {
    console.error("Échec de l'enregistrement des paramètres :", err);
    const detail = err instanceof Error ? err.message : String(err);
    return { status: "error", message: detail };
  }

  // Ces réglages sont lus sur quasiment toutes les pages publiques.
  revalidatePath("/", "layout");
  return { status: "ok" };
}
