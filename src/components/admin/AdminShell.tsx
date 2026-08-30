"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Inbox,
  HelpCircle,
  Newspaper,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/login/actions";
import { Logo } from "@/components/layout/Logo";

const ADMIN_NAV = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/box", label: "Box & tarifs", icon: Package },
  { href: "/admin/leads", label: "Contacts (leads)", icon: Inbox },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-neutral-200 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-neutral-200 px-6">
          <Logo className="h-7 w-auto" />
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {ADMIN_NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100",
                  active && "bg-primary/10 text-primary"
                )}
              >
                <item.icon className="h-4.5 w-4.5" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-neutral-200 p-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
          >
            <ExternalLink className="h-4.5 w-4.5" /> Voir le site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
            >
              <LogOut className="h-4.5 w-4.5" /> Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:hidden">
          <Logo className="h-6 w-auto" />
          <form action={logoutAction}>
            <button type="submit" className="text-sm font-medium text-neutral-600">
              Déconnexion
            </button>
          </form>
        </header>
        <main className="p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
