import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { BLOG_CONTENT } from "@/data/blog-content";

export type BlogPostData = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string | null;
  publishedAt: Date;
  metaTitle: string | null;
  metaDescription: string | null;
};

function fallbackPosts(): BlogPostData[] {
  const now = Date.now();
  return BLOG_CONTENT.map((post, i) => ({
    id: `fallback-${i}`,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    coverImage: null,
    publishedAt: new Date(now - post.daysAgo * 24 * 60 * 60 * 1000),
    metaTitle: null,
    metaDescription: post.excerpt,
  }));
}

export const getBlogPosts = cache(async (): Promise<BlogPostData[]> => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    if (posts.length > 0) return posts;
  } catch {
    // base pas encore migrée/seedée
  }
  return fallbackPosts();
});

export async function getBlogPostBySlug(slug: string): Promise<BlogPostData | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
