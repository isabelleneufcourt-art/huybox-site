import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { phoneHref } from "@/lib/settings";

interface PhoneCTAProps {
  phoneNumber: string;
  phoneNumberDisplay: string;
  label?: string;
  size?: "md" | "lg";
  className?: string;
}

/** Bouton "Appeler maintenant" — cliquable (tel:) sur mobile comme sur desktop. */
export function PhoneCTA({
  phoneNumber,
  phoneNumberDisplay,
  label = "Appeler maintenant",
  size = "lg",
  className,
}: PhoneCTAProps) {
  return (
    <Button href={phoneHref(phoneNumber)} variant="call" size={size} className={className}>
      <Phone className="h-5 w-5" aria-hidden />
      <span>
        {label} · {phoneNumberDisplay}
      </span>
    </Button>
  );
}
