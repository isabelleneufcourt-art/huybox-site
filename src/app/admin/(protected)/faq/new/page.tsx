import { FaqForm } from "@/components/admin/faq/FaqForm";
import { createFaqAction } from "@/app/admin/(protected)/faq/actions";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="text-2xl">Nouvelle question</h1>
      <div className="mt-6 max-w-xl">
        <FaqForm action={createFaqAction} submitLabel="Créer la question" />
      </div>
    </div>
  );
}
