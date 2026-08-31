import { ShieldCheck, Clock, Sparkles, MapPin, type LucideIcon } from "lucide-react";

const BADGES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ShieldCheck,
    title: "Sécurisé 24h/24",
    description: "Contrôle d'accès, alarme et vidéosurveillance sur l'ensemble du bâtiment.",
  },
  {
    icon: Clock,
    title: "Accès 7j/7",
    description: "Venez déposer ou récupérer vos affaires quand vous le souhaitez, sans rendez-vous.",
  },
  {
    icon: Sparkles,
    title: "Locaux propres & récents",
    description: "Espaces ventilés, éclairés et sans escaliers pour un accès facile.",
  },
  {
    icon: MapPin,
    title: "Bien situé",
    description: "Un bâtiment facilement accessible, avec zone de chargement dédiée.",
  },
];

export function TrustBadges() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {BADGES.map(({ icon: Icon, title, description }) => (
        <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-6">
          <Icon className="h-8 w-8 text-primary" aria-hidden />
          <p className="mt-4 font-heading font-semibold text-neutral-900">{title}</p>
          <p className="mt-1.5 text-sm text-neutral-600">{description}</p>
        </div>
      ))}
    </div>
  );
}
