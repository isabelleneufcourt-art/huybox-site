import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { Analytics } from "@/components/analytics/Analytics";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { getSiteSettings } from "@/lib/settings";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Self Storage FX";

export const metadata: Metadata = {
  title: {
    default: `${siteName} — Box de stockage sécurisés`,
    template: `%s — ${siteName}`,
  },
  description:
    "Location de box de self-stockage sécurisés, accessibles 7j/7, sans engagement. Vérifiez les disponibilités et réservez par téléphone.",
  openGraph: {
    type: "website",
    siteName,
    locale: "fr_BE",
  },
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Analytics ga4Id={settings.ga4Id} gtmId={settings.gtmId} />

      <Header
        siteName={siteName}
        phoneNumber={settings.phoneNumber}
        phoneNumberDisplay={settings.phoneNumberDisplay}
      />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer
        siteName={siteName}
        phoneNumber={settings.phoneNumber}
        phoneNumberDisplay={settings.phoneNumberDisplay}
        addressStreet={settings.addressStreet}
        addressCity={settings.addressCity}
        addressCountry={settings.addressCountry}
        contactEmail={process.env.SMTP_FROM ?? "contact@self-storage-fx.example"}
      />
      <MobileCallBar
        phoneNumber={settings.phoneNumber}
        phoneNumberDisplay={settings.phoneNumberDisplay}
      />
      <CookieConsent />
    </>
  );
}
