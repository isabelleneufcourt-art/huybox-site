import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FaqForm } from "@/components/admin/faq/FaqForm";
import { updateFaqAction } from "@/app/admin/(protected)/faq/actions";

export default async function EditFaqPage({ params }: { params: { id: string } }) {
  const item = await prisma.faqItem.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  const boundAction = updateFaqAction.bind(null, item.id);

  return (
    <div>
      <h1 className="text-2xl">Modifier la question</h1>
      <div className="mt-6 max-w-xl">
        <FaqForm action={boundAction} defaultValues={item} submitLabel="Enregistrer" />
      </div>
    </div>
  );
}
