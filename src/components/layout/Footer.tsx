import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { FOOTER_LEGAL_NAV, FOOTER_QUICK_NAV } from "@/lib/nav";
import { phoneHref } from "@/lib/settings";
import { Logo } from "@/components/layout/Logo";

interface FooterProps {
  siteName: string;
  phoneNumber: string;
  phoneNumberDisplay: string;
  addressStreet: string;
  addressCity: string;
  addressCountry: string;
  contactEmail: string;
}

export function Footer({
  siteName,
  phoneNumber,
  phoneNumberDisplay,
  addressStreet,
  addressCity,
  addressCountry,
  contactEmail,
}: FooterProps) {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-7 w-auto" />
          <p className="mt-3 text-sm text-neutral-600">
            Box de stockage sécurisés, accessibles 7j/7. Réservation et vérification des
            disponibilités par téléphone.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full border border-neutral-300 p-2 text-neutral-500 hover:border-primary hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full border border-neutral-300 p-2 text-neutral-500 hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold text-neutral-900">Liens rapides</p>
          <ul className="mt-3 space-y-2">
            {FOOTER_QUICK_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-neutral-600 hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold text-neutral-900">Coordonnées</p>
          <ul className="mt-3 space-y-2.5 text-sm text-neutral-600">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                {addressStreet}
                <br />
                {addressCity}, {addressCountry}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href={phoneHref(phoneNumber)} className="hover:text-primary">
                {phoneNumberDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${contactEmail}`} className="hover:text-primary">
                {contactEmail}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold text-neutral-900">Informations légales</p>
          <ul className="mt-3 space-y-2">
            {FOOTER_LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-neutral-600 hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-200 py-5">
        <p className="container-page text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} {siteName}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
