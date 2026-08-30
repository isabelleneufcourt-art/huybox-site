import { Phone } from "lucide-react";
import { phoneHref } from "@/lib/settings";

/**
 * Barre d'appel fixe en bas d'écran, visible uniquement sur mobile, pour
 * garder le numéro de téléphone accessible en permanence lors du scroll.
 */
export function MobileCallBar({
  phoneNumber,
  phoneNumberDisplay,
}: {
  phoneNumber: string;
  phoneNumberDisplay: string;
}) {
  return (
    <a
      href={phoneHref(phoneNumber)}
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 bg-secondary px-4 py-3 text-sm font-semibold text-white shadow-lg lg:hidden"
    >
      <Phone className="h-4 w-4" aria-hidden />
      Appeler maintenant · {phoneNumberDisplay}
    </a>
  );
}
