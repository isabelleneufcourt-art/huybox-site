import { Warehouse } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PhoneCTA } from "@/components/ui/PhoneCTA";

interface HeroProps {
  title: string;
  subtitle: string;
  phoneNumber: string;
  phoneNumberDisplay: string;
  city: string;
  hasVirtualTour: boolean;
}

export function Hero({ title, subtitle, phoneNumber, phoneNumberDisplay, city, hasVirtualTour }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-dark to-primary text-white">
      <div className="container-page relative z-10 py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
            <Warehouse className="h-4 w-4" /> Bâtiment de self-stockage à {city}
          </p>
          <h1 className="text-4xl leading-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg text-white/90">{subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/box-tarifs" variant="secondary" size="lg">
              Voir les box &amp; tarifs
            </Button>
            <Button
              href={hasVirtualTour ? "/notre-batiment#visite-virtuelle" : "/notre-batiment"}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              {hasVirtualTour ? "Faire la visite virtuelle" : "Découvrir le bâtiment"}
            </Button>
          </div>

          <div className="mt-8">
            <p className="mb-2 text-sm text-white/80">Disponibilités &amp; réservation par téléphone :</p>
            <PhoneCTA phoneNumber={phoneNumber} phoneNumberDisplay={phoneNumberDisplay} />
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
      />
    </section>
  );
}
