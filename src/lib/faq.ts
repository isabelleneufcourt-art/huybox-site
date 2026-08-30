import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { FAQ_CONTENT } from "@/data/faq-content";

export type FaqItemData = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export const getFaqItems = cache(async (): Promise<FaqItemData[]> => {
  try {
    const items = await prisma.faqItem.findMany({
      where: { published: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });
    if (items.length > 0) return items;
  } catch {
    // base pas encore migrée/seedée
  }
  return FAQ_CONTENT.map((item, i) => ({ id: `fallback-${i}`, ...item }));
});
