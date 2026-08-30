import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

// Le back-office est derrière authentification et lit des données mutables
// (leads, box, réglages...) : jamais de rendu statique au build, toujours
// une exécution par requête. S'applique à toutes les pages de ce groupe.
export const dynamic = "force-dynamic";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
