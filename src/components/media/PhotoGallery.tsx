import { ImageIcon } from "lucide-react";

const PLACEHOLDER_PHOTOS = [
  "Extérieur du centre",
  "Entrée sécurisée",
  "Couloir d'accès aux box",
  "Box 8 m³",
  "Box 15 m³",
  "Zone de chargement",
];

/**
 * Galerie photo — en attente des vraies photos du centre (à uploader depuis
 * /admin > Médias). Affiche des vignettes placeholder nommées pour que le
 * client visualise l'emplacement final de chaque photo.
 */
export function PhotoGallery() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {PLACEHOLDER_PHOTOS.map((label) => (
        <div
          key={label}
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl bg-neutral-100 p-4 text-center"
        >
          <ImageIcon className="h-8 w-8 text-neutral-400" aria-hidden />
          <span className="text-xs font-medium text-neutral-500">{label}</span>
        </div>
      ))}
    </div>
  );
}
