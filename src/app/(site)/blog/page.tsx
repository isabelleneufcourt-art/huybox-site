import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog & conseils",
  description: "Conseils pratiques sur le déménagement, l'organisation et le stockage de vos biens.",
};

const dateFormatter = new Intl.DateTimeFormat("fr-BE", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <Section tone="neutral" className="pb-16 pt-12 sm:pt-16">
      <SectionHeading eyebrow="Blog" title="Conseils déménagement & stockage" center />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-card"
          >
            <span className="mb-3 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {post.category}
            </span>
            <h2 className="text-lg font-heading font-semibold text-neutral-900">{post.title}</h2>
            <p className="mt-2 flex-1 text-sm text-neutral-600">{post.excerpt}</p>
            <p className="mt-4 text-xs text-neutral-400">{dateFormatter.format(post.publishedAt)}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
