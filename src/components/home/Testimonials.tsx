import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sophie M.",
    text: "Box impeccable, accès très simple et personnel disponible au téléphone pour toutes mes questions avant de réserver.",
  },
  {
    name: "Karim B.",
    text: "Idéal pendant mon déménagement : j'ai pu stocker mes meubles plusieurs semaines sans contrainte d'horaires.",
  },
  {
    name: "Anne-Laure D.",
    text: "Locaux propres et sécurisés, exactement ce que j'ai vu dans la visite vidéo avant de venir sur place.",
  },
];

/**
 * Témoignages statiques par défaut. Peuvent être remplacés par un widget
 * Google Reviews / Trustpilot embarqué (voir README > Intégrations).
 */
export function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <div key={t.name} className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex gap-0.5 text-secondary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mt-3 text-sm text-neutral-700">"{t.text}"</p>
          <p className="mt-4 text-sm font-semibold text-neutral-900">{t.name}</p>
        </div>
      ))}
    </div>
  );
}
