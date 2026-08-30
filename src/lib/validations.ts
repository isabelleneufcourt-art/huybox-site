import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, "Le prénom est requis").max(100),
  lastName: z.string().trim().min(1, "Le nom est requis").max(100),
  email: z.string().trim().email("Adresse email invalide").max(200),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Merci de détailler votre demande (10 caractères minimum)").max(2000),
  source: z.string().max(50).optional(),
  // Honeypot anti-spam : doit rester vide, un bot le remplira.
  website: z.string().max(0, "Requête invalide").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
