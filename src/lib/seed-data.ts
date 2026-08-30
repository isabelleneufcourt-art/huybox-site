import type { PrismaClient } from "@prisma/client";
// Imports relatifs (pas l'alias "@/") : ce module est aussi exécuté via
// `tsx` par prisma/seed.ts, qui ne résout pas les alias tsconfig.
import { FAQ_CONTENT } from "../data/faq-content";
import { BLOG_CONTENT } from "../data/blog-content";

/**
 * Insère le contenu de démonstration (réglages, box, options, FAQ, blog).
 * Idempotent — safe à relancer, ne duplique rien. Utilisé par
 * `prisma/seed.ts` (CLI locale) ET par le bouton "Initialiser le contenu de
 * démonstration" du tableau de bord admin (pour les déploiements où lancer
 * une commande en local n'est pas pratique, ex. juste après un premier
 * déploiement Vercel).
 */
export async function seedDemoData(prisma: PrismaClient) {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+32 2 000 00 00",
      phoneNumberDisplay: process.env.NEXT_PUBLIC_PHONE_NUMBER_DISPLAY ?? "02 000 00 00",
      addressStreet: process.env.NEXT_PUBLIC_ADDRESS_STREET ?? "Rue de l'Entrepôt 12",
      addressCity: process.env.NEXT_PUBLIC_ADDRESS_CITY ?? "1000 Bruxelles",
      addressCountry: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY ?? "Belgique",
      openingHours: "Ouvert 7j/7, de 6h à 23h",
      googleMapsEmbedUrl:
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
        "https://www.google.com/maps?q=Bruxelles&output=embed",
      heroTitle: "Box de stockage sécurisés, disponibles 7j/7",
      heroSubtitle: "Accès 7j/7 · Sans engagement · Sécurisé 24h/24",
      virtualTourVideoUrl:
        process.env.NEXT_PUBLIC_VIRTUAL_TOUR_VIDEO_URL ??
        "https://www.youtube.com/embed/dQw4w9WgXcQ",
      virtualTourEnabled: true,
      ga4Id: process.env.NEXT_PUBLIC_GA4_ID || null,
      gtmId: process.env.NEXT_PUBLIC_GTM_ID || null,
    },
    update: {},
  });

  const boxes = [
    { name: "Box 8 m³", volumeM3: 8, dimensions: "2 x 2 x 2 m", equivalence: "Idéal pour un studio ou T1", sortOrder: 1 },
    { name: "Box 10 m³", volumeM3: 10, dimensions: "2,5 x 2 x 2 m", equivalence: "Idéal pour un T2", sortOrder: 2 },
    { name: "Box 15 m³", volumeM3: 15, dimensions: "3,75 x 2 x 2 m", equivalence: "Idéal pour un T3 / maison", sortOrder: 3 },
  ];
  for (const box of boxes) {
    const existing = await prisma.boxType.findFirst({ where: { name: box.name } });
    if (!existing) {
      await prisma.boxType.create({ data: { ...box, pricePerM3: 8, active: true } });
    }
  }

  const options = [
    { name: "Étagères", description: "Optimisez l'espace de votre box.", priceInfo: "Sur demande au centre", sortOrder: 1 },
    { name: "Matériel de manutention", description: "Diables, sangles et couvertures de protection.", priceInfo: "Prêt gratuit sur place", sortOrder: 2 },
    { name: "Véhicule utilitaire", description: "Location d'un utilitaire pour votre transport.", priceInfo: "Sur devis au centre", sortOrder: 3 },
  ];
  for (const option of options) {
    const existing = await prisma.storageOption.findFirst({ where: { name: option.name } });
    if (!existing) {
      await prisma.storageOption.create({ data: { ...option, active: true } });
    }
  }

  for (const [index, item] of FAQ_CONTENT.entries()) {
    const existing = await prisma.faqItem.findFirst({ where: { question: item.question } });
    if (!existing) {
      await prisma.faqItem.create({ data: { ...item, sortOrder: index, published: true } });
    }
  }

  const now = Date.now();
  for (const post of BLOG_CONTENT) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        published: true,
        publishedAt: new Date(now - post.daysAgo * 24 * 60 * 60 * 1000),
        metaDescription: post.excerpt,
      },
      update: {},
    });
  }
}
