"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { seedDemoData } from "@/lib/seed-data";

/**
 * Bouton "Initialiser le contenu de démonstration" du tableau de bord.
 * Utile juste après un premier déploiement (ex. Vercel) quand lancer
 * `npm run db:seed` en local n'est pas pratique — les migrations, elles,
 * tournent automatiquement au build (voir package.json > "build").
 */
export async function seedDemoDataAction() {
  try {
    await seedDemoData(prisma);
  } catch (err) {
    console.error("Échec du seed depuis /admin :", err);
    redirect("/admin?seed=error");
  }
  revalidatePath("/admin", "layout");
  redirect("/admin?seed=ok");
}
