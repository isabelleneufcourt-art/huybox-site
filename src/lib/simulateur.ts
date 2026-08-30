export type LogementType = "studio" | "t1" | "t2" | "t3" | "maison" | "autre";

export const LOGEMENT_OPTIONS: { value: LogementType; label: string; surfaceHint: number }[] = [
  { value: "studio", label: "Studio", surfaceHint: 25 },
  { value: "t1", label: "T1 / 1 chambre", surfaceHint: 35 },
  { value: "t2", label: "T2 / 2 chambres", surfaceHint: 50 },
  { value: "t3", label: "T3 / 3 chambres et +", surfaceHint: 75 },
  { value: "maison", label: "Maison", surfaceHint: 110 },
  { value: "autre", label: "Autre", surfaceHint: 40 },
];

export interface SimulateurInput {
  logementType: LogementType;
  surfaceM2: number;
  nombrePieces: number;
  cave: boolean;
  garage: boolean;
  grenier: boolean;
  jardin: boolean;
}

/**
 * Estimation du volume de stockage nécessaire.
 *
 * Formule (indicative, cahier des charges) :
 *   volume ≈ (surface du logement / 3) + 2 m³ par annexe (cave / garage / grenier)
 *
 * Le jardin n'ajoute pas de volume de base (les gros objets de jardin sont
 * rares à stocker), mais on relève sa présence pour affiner un futur devis
 * humain fait par téléphone.
 */
export function estimateVolumeM3(input: SimulateurInput): number {
  const annexCount = [input.cave, input.garage, input.grenier].filter(Boolean).length;
  const raw = input.surfaceM2 / 3 + annexCount * 2;
  return Math.max(2, Math.round(raw * 10) / 10);
}
