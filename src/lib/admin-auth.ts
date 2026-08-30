import { timingSafeEqual } from "crypto";

export { ADMIN_SESSION_COOKIE, createSessionToken, verifySessionToken } from "@/lib/admin-session";

/**
 * Vérifie les identifiants admin (un seul compte, défini par variables
 * d'environnement ADMIN_EMAIL / ADMIN_PASSWORD). Mot de passe stocké en
 * clair côté variable d'environnement (privée, jamais commitée) plutôt
 * qu'en hash bcrypt : évite toute corruption lors d'un copier-coller
 * (échappement des "$" dans un .env local, réimport par un tableau de bord
 * d'hébergeur...). Comparaison en temps constant pour limiter les attaques
 * par mesure de timing. Ce fichier ne doit être importé que depuis du code
 * runtime Node (routes API, server actions), jamais depuis le middleware
 * (voir lib/admin-session.ts pour la partie edge-safe).
 */
export async function checkAdminCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;
  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(adminPassword);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
