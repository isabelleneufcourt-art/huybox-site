import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { getFaqItems } from "@/lib/faq";
import { faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Toutes les réponses à vos questions sur le self-stockage : tarifs, contrats, accès, sécurité, assurance et déménagement.",
};

export default async function FaqPage() {
  const items = await getFaqItems();
  const jsonLd = faqJsonLd(items);

  return (
    <Section tone="neutral" className="pb-16 pt-12 sm:pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionHeading eyebrow="FAQ" title="Questions fréquentes" center />
      <FaqSearch items={items} />
    </Section>
  );
}
