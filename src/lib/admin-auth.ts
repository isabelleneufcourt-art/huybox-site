import bcrypt from "bcryptjs";

export { ADMIN_SESSION_COOKIE, createSessionToken, verifySessionToken } from "@/lib/admin-session";

/**
 * Vérifie les identifiants admin (un seul compte, défini par variables
 * d'environnement ADMIN_EMAIL / ADMIN_PASSWORD_HASH). Utilise bcryptjs
 * (module Node) — ce fichier ne doit être importé que depuis du code
 * runtime Node (routes API, server actions), jamais depuis le middleware
 * (voir lib/admin-session.ts pour la partie edge-safe).
 */
export async function checkAdminCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !adminHash) return false;
  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) return false;
  return bcrypt.compare(password, adminHash);
}
