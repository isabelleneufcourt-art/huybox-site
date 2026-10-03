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
