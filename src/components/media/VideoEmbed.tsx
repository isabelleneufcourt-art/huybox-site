"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  videoUrl: string;
  thumbnailUrl?: string | null;
  title?: string;
  className?: string;
}

/**
 * Lecteur vidéo léger : affiche une miniature cliquable et ne charge
 * l'iframe (YouTube/Vimeo) qu'au clic, pour ne pas pénaliser les
 * performances (chargement "lazy" demandé au cahier des charges).
 */
export function VideoEmbed({ videoUrl, thumbnailUrl, title = "Visite virtuelle du bâtiment", className }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-card", className)}>
      {playing ? (
        <iframe
          src={`${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative h-full w-full"
          aria-label={`Lire la vidéo : ${title}`}
        >
          {thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumbnailUrl} alt="" className="h-full w-full object-cover opacity-80" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary to-primary-dark" />
          )}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
              <Play className="h-7 w-7 translate-x-0.5 fill-current sm:h-8 sm:w-8" />
            </span>
          </span>
          <span className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-sm font-medium text-white">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
