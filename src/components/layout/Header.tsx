"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAIN_NAV } from "@/lib/nav";
import { PhoneCTA } from "@/components/ui/PhoneCTA";
import { Logo } from "@/components/layout/Logo";

interface HeaderProps {
  phoneNumber: string;
  phoneNumberDisplay: string;
  siteName: string;
}

export function Header({ phoneNumber, phoneNumberDisplay, siteName }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link href="/" aria-label={siteName} className="flex items-center">
          <Logo className="h-8 w-auto sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-neutral-600 transition-colors hover:text-primary",
                pathname === item.href && "text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <PhoneCTA phoneNumber={phoneNumber} phoneNumberDisplay={phoneNumberDisplay} size="md" />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-neutral-700 lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-neutral-200 bg-white lg:hidden" aria-label="Navigation mobile">
          <div className="container-page flex flex-col gap-1 py-3">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-base font-medium text-neutral-700 hover:bg-neutral-50",
                  pathname === item.href && "bg-primary/5 text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 px-1">
              <PhoneCTA
                phoneNumber={phoneNumber}
                phoneNumberDisplay={phoneNumberDisplay}
                className="w-full"
              />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
