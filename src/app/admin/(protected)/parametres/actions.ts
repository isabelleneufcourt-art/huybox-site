"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updateSiteSettingsAction(formData: FormData) {
  const data = {
    phoneNumber: String(formData.get("phoneNumber") ?? "").trim(),
    phoneNumberDisplay: String(formData.get("phoneNumberDisplay") ?? "").trim(),
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

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });

  // Ces réglages sont lus sur quasiment toutes les pages publiques.
  revalidatePath("/", "layout");
}
