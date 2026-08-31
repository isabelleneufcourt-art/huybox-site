import { getSiteSettings } from "@/lib/settings";
import { ParametresForm } from "@/components/admin/ParametresForm";

export default async function AdminParametresPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl">Paramètres du site</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Numéro de téléphone, coordonnées, visite virtuelle et textes de la page d&apos;accueil.
      </p>

      <ParametresForm settings={settings} />
    </div>
  );
}
