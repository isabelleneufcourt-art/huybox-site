import type { Metadata } from "next";
import { KeyRound, BellRing, Video, Wind, ShieldAlert } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Sécurité & garanties",
  description:
    "Contrôle d'accès, alarme, vidéosurveillance, locaux ventilés et sans escaliers. Informations sur l'assurance des biens stockés.",
};

const DEVICES = [
  {
    icon: KeyRound,
    title: "Contrôle d'accès",
    description: "Code personnel, badge ou interphone pour entrer dans le centre et accéder à votre couloir de box.",
  },
  {
    icon: BellRing,
    title: "Alarme & détection",
    description: "Détection d'intrusion et détection incendie actives 24h/24 sur l'ensemble du site.",
  },
  {
    icon: Video,
    title: "Vidéosurveillance",
    description: "Caméras aux points d'accès et dans les couloirs communs pour dissuader et surveiller.",
  },
  {
    icon: Wind,
    title: "Locaux ventilés & propres",
    description: "Espaces éclairés, ventilés, entretenus régulièrement et accessibles sans escaliers.",
  },
];

export default function SecuritePage() {
  return (
    <>
      <Section tone="neutral" className="pb-10 pt-12 sm:pt-16">
        <SectionHeading
          eyebrow="Sécurité & garanties"
          title="Vos affaires en toute sécurité"
          description="Notre centre est équipé de dispositifs de sécurité pensés pour protéger vos biens en permanence."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {DEVICES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <Icon className="h-8 w-8 text-primary" aria-hidden />
              <p className="mt-4 font-heading font-semibold text-neutral-900">{title}</p>
              <p className="mt-1.5 text-sm text-neutral-600">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center">
          <ShieldAlert className="h-10 w-10 text-secondary" aria-hidden />
          <h2 className="text-2xl">Assurance des biens stockés</h2>
          <p className="text-neutral-600">
            L'assurance des biens stockés est <strong>obligatoire</strong>. Chaque client doit
            assurer ses propres biens auprès de son assureur (assurance habitation, extension
            "biens en dépôt", ou assurance dédiée). Nous ne proposons pas d'offre d'assurance via
            ce site — contactez-nous par téléphone pour toute question sur ce point avant votre
            réservation.
          </p>
        </div>
      </Section>
    </>
  );
}
