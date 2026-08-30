import { cache } from "react";
import { prisma } from "@/lib/prisma";

export type BoxTypeData = {
  id: string;
  name: string;
  volumeM3: number;
  dimensions: string | null;
  equivalence: string | null;
  pricePerM3: number;
  active: boolean;
  sortOrder: number;
};

const FALLBACK_BOXES: BoxTypeData[] = [
  {
    id: "fallback-8",
    name: "Box 8 m³",
    volumeM3: 8,
    dimensions: "2 x 2 x 2 m",
    equivalence: "Idéal pour un studio ou T1",
    pricePerM3: 8,
    active: true,
    sortOrder: 1,
  },
  {
    id: "fallback-10",
    name: "Box 10 m³",
    volumeM3: 10,
    dimensions: "2,5 x 2 x 2 m",
    equivalence: "Idéal pour un T2",
    pricePerM3: 8,
    active: true,
    sortOrder: 2,
  },
  {
    id: "fallback-15",
    name: "Box 15 m³",
    volumeM3: 15,
    dimensions: "3,75 x 2 x 2 m",
    equivalence: "Idéal pour un T3 / maison",
    pricePerM3: 8,
    active: true,
    sortOrder: 3,
  },
];

/**
 * Les 3 tailles de box, lues depuis la base (gérées en back-office). Si la
 * base n'est pas encore seedée, on retombe sur les 3 tailles par défaut du
 * cahier des charges (8, 10, 15 m³ à 8 €/m³/mois).
 */
export const getBoxTypes = cache(async (): Promise<BoxTypeData[]> => {
  try {
    const boxes = await prisma.boxType.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    if (boxes.length > 0) return boxes;
  } catch {
    // base pas encore migrée/seedée — on utilise le fallback ci-dessous
  }
  return FALLBACK_BOXES;
});

/** Retourne la box active dont le volume est le plus proche du volume donné. */
export function closestBox(boxes: BoxTypeData[], targetVolumeM3: number): BoxTypeData {
  return boxes.reduce((closest, box) =>
    Math.abs(box.volumeM3 - targetVolumeM3) < Math.abs(closest.volumeM3 - targetVolumeM3)
      ? box
      : closest
  , boxes[0]);
}
