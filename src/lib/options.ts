import { cache } from "react";
import { prisma } from "@/lib/prisma";

export type StorageOptionData = {
  id: string;
  name: string;
  description: string;
  priceInfo: string;
};

const FALLBACK_OPTIONS: StorageOptionData[] = [
  { id: "shelving", name: "Étagères", description: "Optimisez l'espace de votre box.", priceInfo: "Sur demande au bâtiment" },
  { id: "handling", name: "Matériel de manutention", description: "Diables, sangles et couvertures de protection.", priceInfo: "Prêt gratuit sur place" },
  { id: "van", name: "Véhicule utilitaire", description: "Location d'un utilitaire pour votre transport.", priceInfo: "Sur devis au 0X XX XX XX XX" },
];

/** Options additionnelles (hors assurance — non proposée via le site). */
export const getStorageOptions = cache(async (): Promise<StorageOptionData[]> => {
  try {
    const options = await prisma.storageOption.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    if (options.length > 0) return options;
  } catch {
    // base pas encore migrée/seedée
  }
  return FALLBACK_OPTIONS;
});
