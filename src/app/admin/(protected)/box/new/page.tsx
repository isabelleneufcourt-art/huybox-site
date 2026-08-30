import { BoxForm } from "@/components/admin/box/BoxForm";
import { createBoxAction } from "@/app/admin/(protected)/box/actions";

export default function NewBoxPage() {
  return (
    <div>
      <h1 className="text-2xl">Nouveau box</h1>
      <div className="mt-6 max-w-xl">
        <BoxForm action={createBoxAction} submitLabel="Créer le box" />
      </div>
    </div>
  );
}
