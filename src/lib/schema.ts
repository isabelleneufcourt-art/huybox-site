import type { SiteSettingsData } from "@/lib/settings";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "HUYBOX";

/** Schema.org SelfStorage + LocalBusiness — utilisé sur l'accueil et "Notre centre". */
export function localBusinessJsonLd(settings: SiteSettingsData) {
  return {
    "@context": "https://schema.org",
    "@type": "SelfStorage",
    "@id": `${siteUrl}/#centre`,
    name: siteName,
    url: siteUrl,
    telephone: settings.phoneNumber,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.addressStreet,
      addressLocality: settings.addressCity,
      addressCountry: settings.addressCountry,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "23:00",
    },
  };
}

/** Schema.org FAQPage — utilisé sur la page /faq. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Schema.org Article — utilisé sur une page article de blog. */
export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: Date;
  coverImage?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ?? undefined,
    datePublished: post.publishedAt.toISOString(),
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
  };
}
