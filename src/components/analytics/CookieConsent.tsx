"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const COOKIE_CONSENT_KEY = "ssfx-cookie-consent";
export const COOKIE_CONSENT_EVENT = "ssfx-cookie-consent-change";

export type ConsentValue = "accepted" | "rejected";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

function setStoredConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
  } catch {
    // localStorage indisponible (navigation privée stricte...) — on ignore
  }
}

/** Bandeau RGPD : demande le consentement avant d'activer les cookies analytiques. */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="container-page flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-neutral-600">
          Nous utilisons des cookies pour mesurer l'audience du site (Google Analytics). Vous
          pouvez accepter ou refuser ces cookies non essentiels — voir notre{" "}
          <Link href="/cookies" className="font-medium text-primary hover:underline">
            politique de cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setStoredConsent("rejected");
              setVisible(false);
            }}
          >
            Refuser
          </Button>
          <Button
            size="md"
            onClick={() => {
              setStoredConsent("accepted");
              setVisible(false);
            }}
          >
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
