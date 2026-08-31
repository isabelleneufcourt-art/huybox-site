"use client";

import { useState } from "react";
import { X } from "lucide-react";

const PHOTOS = [
  { src: "/images/batiment/exterieur.jpg", alt: "Extérieur du bâtiment HUYBOX" },
  { src: "/images/batiment/couloir-1.jpg", alt: "Couloir d'accès aux box" },
  { src: "/images/batiment/couloir-2.jpg", alt: "Couloir d'accès aux box" },
  { src: "/images/batiment/couloir-3.jpg", alt: "Couloir d'accès aux box" },
  { src: "/images/batiment/couloir-4.jpg", alt: "Couloir d'accès aux box" },
  { src: "/images/batiment/couloir-5.jpg", alt: "Couloir d'accès aux box" },
];

/** Galerie photo du bâtiment — cliquer une vignette l'agrandit en plein écran. */
export function PhotoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? PHOTOS[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="aspect-square overflow-hidden rounded-xl bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpenIndex(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Fermer"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
