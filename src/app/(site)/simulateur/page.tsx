import type { Metadata } from "next";
import { VolumeSimulatorHuybox } from "@/components/simulateur/VolumeSimulatorHuybox";

export const metadata: Metadata = {
  title: "Simulateur de volume",
  description:
    "Calculez en quelques clics le volume et la taille de box dont vous avez besoin, objet par objet, avec aperçu du remplissage.",
};

export default function SimulateurPage() {
  return <VolumeSimulatorHuybox />;
}
