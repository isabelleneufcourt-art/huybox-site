import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BoxForm } from "@/components/admin/box/BoxForm";
import { updateBoxAction } from "@/app/admin/(protected)/box/actions";

export default async function EditBoxPage({ params }: { params: { id: string } }) {
  const box = await prisma.boxType.findUnique({ where: { id: params.id } });
  if (!box) notFound();

  const boundAction = updateBoxAction.bind(null, box.id);

  return (
    <div>
      <h1 className="text-2xl">Modifier {box.name}</h1>
      <div className="mt-6 max-w-xl">
        <BoxForm action={boundAction} defaultValues={box} submitLabel="Enregistrer" />
      </div>
    </div>
  );
}
