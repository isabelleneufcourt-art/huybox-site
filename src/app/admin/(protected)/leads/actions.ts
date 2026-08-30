"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { LeadStatus } from "@prisma/client";

export async function updateLeadStatusAction(id: string, formData: FormData) {
  const status = String(formData.get("status")) as LeadStatus;
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}

export async function addLeadNoteAction(id: string, formData: FormData) {
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;
  await prisma.leadNote.create({ data: { leadId: id, body } });
  revalidatePath(`/admin/leads/${id}`);
}
