import type { Metadata } from "next";
import { Mail, Clock, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/media/MapEmbed";
import { ReservationBlock } from "@/components/booking/ReservationBlock";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez notre bâtiment de self-stockage : formulaire de contact, coordonnées, horaires et téléphone pour vérifier les disponibilités.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const contactEmail = process.env.SMTP_FROM ?? "contact@self-storage-fx.example";

  return (
    <>
      <Section tone="neutral" className="pb-10 pt-12 sm:pt-16">
        <SectionHeading eyebrow="Contact" title="Une question ? Écrivez-nous" />
        <div className="grid gap-10 lg:grid-cols-2">
          <ContactForm />

          <div className="space-y-6">
            <ul className="space-y-3 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {settings.addressStreet}, {settings.addressCity}, {settings.addressCountry}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-primary" /> {settings.openingHours}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${contactEmail}`} className="hover:text-primary">
                  {contactEmail}
                </a>
              </li>
            </ul>
            <MapEmbed embedUrl={settings.googleMapsEmbedUrl} className="aspect-video" />
            <a href="/notre-batiment#visite-virtuelle" className="inline-block text-sm font-semibold text-primary hover:underline">
              Voir la visite virtuelle du bâtiment →
            </a>
          </div>
        </div>
      </Section>

      <Section>
        <ReservationBlock phoneNumber={settings.phoneNumber} phoneNumberDisplay={settings.phoneNumberDisplay} />
      </Section>
    </>
  );
}
