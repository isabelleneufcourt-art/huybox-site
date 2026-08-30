/**
 * Session admin : cookie signé en HMAC-SHA256 via l'API Web Crypto (et non
 * le module Node `crypto`), afin de fonctionner aussi bien dans le
 * middleware (edge runtime) que dans les routes API (runtime Node). Séparé
 * de admin-auth.ts pour que le middleware n'embarque jamais de code
 * spécifique au runtime Node (celui-ci ne doit rester compatible qu'avec
 * le edge runtime).
 */

export const ADMIN_SESSION_COOKIE = "ssfx_admin_session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8h

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET manquant : définis une valeur longue et aléatoire dans .env"
    );
  }
  return secret;
}

async function getHmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function sign(payload: string): Promise<string> {
  const key = await getHmacKey();
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return bufferToHex(signature);
}

export async function createSessionToken(email: string): Promise<string> {
  const payload = JSON.stringify({ email, exp: Date.now() + SESSION_DURATION_MS });
  const encoded = toBase64Url(payload);
  const signature = await sign(encoded);
  return `${encoded}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  const expected = await sign(encoded);
  if (signature.length !== expected.length || signature !== expected) return false;

  try {
    const payload = JSON.parse(fromBase64Url(encoded));
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}
