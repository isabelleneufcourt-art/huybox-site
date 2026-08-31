/**
 * Logo officiel HUYBOX (fichier fourni par le client), servi depuis
 * /public/images/huybox-logo.jpg. Un <img> classique plutôt que next/image :
 * le fichier est déjà léger (~25 Ko) et la taille est pilotée entièrement
 * par la classe CSS passée (h-X w-auto) sur chaque emplacement (header,
 * footer, admin) — pas besoin du pipeline d'optimisation pour un logo de
 * cette taille.
 */
export function Logo({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/huybox-logo.jpg" alt="HUYBOX" className={className} />;
}
