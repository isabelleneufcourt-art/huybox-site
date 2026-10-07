export type BoxTypeData = {
  id: string;
  name: string;
  volumeM3: number;
  dimensions: string | null;
  equivalence: string | null;
  monthlyPrice: number;
  active: boolean;
  sortOrder: number;
};

const BOXES: BoxTypeData[] = [
  { id: "box-8", name: "Box 8 m³", volumeM3: 8, dimensions: null, equivalence: null, monthlyPrice: 75, active: true, sortOrder: 1 },
  { id: "box-10", name: "Box 10 m³", volumeM3: 10, dimensions: null, equivalence: null, monthlyPrice: 90, active: true, sortOrder: 2 },
  { id: "box-15", name: "Box 15 m³", volumeM3: 15, dimensions: null, equivalence: null, monthlyPrice: 125, active: true, sortOrder: 3 },
];

/** Les 3 tailles de box et leurs prix mensuels TVAC (à modifier ici). */
export async function getBoxTypes(): Promise<BoxTypeData[]> {
  return BOXES.filter((box) => box.active).sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Retourne la box active dont le volume est le plus proche du volume donné. */
export function closestBox(boxes: BoxTypeData[], targetVolumeM3: number): BoxTypeData {
  return boxes.reduce((closest, box) =>
    Math.abs(box.volumeM3 - targetVolumeM3) < Math.abs(closest.volumeM3 - targetVolumeM3)
      ? box
      : closest
  , boxes[0]);
}
