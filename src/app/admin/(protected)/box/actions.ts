"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseBoxForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    volumeM3: Number(formData.get("volumeM3")),
    dimensions: String(formData.get("dimensions") ?? "").trim() || null,
    equivalence: String(formData.get("equivalence") ?? "").trim() || null,
    pricePerM3: Number(formData.get("pricePerM3")) || 8,
    sortOrder: Number(formData.get("sortOrder")) || 0,
    active: formData.get("active") === "on",
  };
}

export async function createBoxAction(formData: FormData) {
  const data = parseBoxForm(formData);
  await prisma.boxType.create({ data });
  revalidatePath("/admin/box");
  revalidatePath("/");
  revalidatePath("/box-tarifs");
  revalidatePath("/simulateur");
  redirect("/admin/box");
}

export async function updateBoxAction(id: string, formData: FormData) {
  const data = parseBoxForm(formData);
  await prisma.boxType.update({ where: { id }, data });
  revalidatePath("/admin/box");
  revalidatePath("/");
  revalidatePath("/box-tarifs");
  revalidatePath("/simulateur");
  redirect("/admin/box");
}

export async function deleteBoxAction(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.boxType.delete({ where: { id } });
  revalidatePath("/admin/box");
  revalidatePath("/");
  revalidatePath("/box-tarifs");
}
