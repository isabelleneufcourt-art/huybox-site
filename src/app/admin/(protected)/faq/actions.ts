"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseFaqForm(formData: FormData) {
  return {
    category: String(formData.get("category") ?? "").trim(),
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder")) || 0,
    published: formData.get("published") === "on",
  };
}

export async function createFaqAction(formData: FormData) {
  await prisma.faqItem.create({ data: parseFaqForm(formData) });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
  redirect("/admin/faq");
}

export async function updateFaqAction(id: string, formData: FormData) {
  await prisma.faqItem.update({ where: { id }, data: parseFaqForm(formData) });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
  redirect("/admin/faq");
}

export async function deleteFaqAction(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}
