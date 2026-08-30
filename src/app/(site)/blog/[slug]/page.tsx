import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";
import { articleJsonLd } from "@/lib/schema";

const dateFormatter = new Intl.DateTimeFormat("fr-BE", { day: "numeric", month: "long", year: "numeric" });

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = articleJsonLd(post);

  return (
    <Section className="pb-16 pt-12 sm:pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-2xl">
        <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Retour au blog
        </Link>
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {post.category}
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-neutral-500">{dateFormatter.format(post.publishedAt)}</p>
        <p className="mt-5 text-lg text-neutral-600">{post.excerpt}</p>

        <div
          className="mt-6 text-neutral-700"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        <div className="mt-10 flex flex-wrap gap-3 border-t border-neutral-200 pt-6 text-sm">
          <Link href="/box-tarifs" className="font-medium text-primary hover:underline">
            Voir les box &amp; tarifs
          </Link>
          <Link href="/simulateur" className="font-medium text-primary hover:underline">
            Estimer mon volume
          </Link>
          <Link href="/contact" className="font-medium text-primary hover:underline">
            Nous contacter
          </Link>
        </div>
      </div>
    </Section>
  );
}
