import { FAQ_CONTENT, type FaqItemData } from "@/data/faq-content";

export type { FaqItemData };

export async function getFaqItems(): Promise<FaqItemData[]> {
  return FAQ_CONTENT;
}
