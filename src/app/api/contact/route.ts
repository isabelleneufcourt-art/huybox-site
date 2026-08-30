import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Formulaire invalide.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot rempli => on répond succès sans rien enregistrer (silencieux pour les bots).
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { firstName, lastName, email, phone, message, source } = parsed.data;

  const lead = await prisma.lead.create({
    data: {
      firstName,
      lastName,
      email,
      phone: phone || null,
      message,
      source: source || "site",
    },
  });

  // Emailing d'accusé de réception : voir README > "Emailing (optionnel)"
  // pour brancher Brevo/Mailchimp/SMTP sur cet endpoint.

  return NextResponse.json({ ok: true, id: lead.id });
}
