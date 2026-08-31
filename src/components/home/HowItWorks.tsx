import { Ruler, PhoneCall, FileSignature, KeyRound } from "lucide-react";

const STEPS = [
  {
    icon: Ruler,
    title: "1. Choisissez la taille de box",
    description: "8, 10 ou 15 m³ — utilisez notre simulateur si vous hésitez.",
  },
  {
    icon: PhoneCall,
    title: "2. Appelez-nous",
    description: "Nous vérifions les disponibilités et répondons à vos questions.",
  },
  {
    icon: FileSignature,
    title: "3. Signez au bâtiment",
    description: "Passez au bâtiment pour signer le contrat et déposer vos affaires.",
  },
  {
    icon: KeyRound,
    title: "4. Accédez 7j/7",
    description: "Utilisez votre box librement, à tout moment, 7 jours sur 7.",
  },
];

export function HowItWorks() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map(({ icon: Icon, title, description }, i) => (
        <div key={title} className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" aria-hidden />
          </div>
          <p className="mt-4 font-heading font-semibold text-neutral-900">{title}</p>
          <p className="mt-1.5 text-sm text-neutral-600">{description}</p>
          {i < STEPS.length - 1 && (
            <div className="absolute right-0 top-7 hidden h-px w-8 translate-x-full bg-neutral-200 lg:block" />
          )}
        </div>
      ))}
    </div>
  );
}
