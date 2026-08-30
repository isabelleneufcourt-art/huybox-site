import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const eurFormatter = new Intl.NumberFormat("fr-BE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** Formate un prix mensuel, ex: 80 -> "80 €". */
export function formatEuro(amount: number) {
  return eurFormatter.format(amount);
}

/** Prix mensuel = volume (m³) × prix au m³ (arrondi à l'euro le plus proche). */
export function monthlyPrice(volumeM3: number, pricePerM3: number) {
  return Math.round(volumeM3 * pricePerM3);
}
