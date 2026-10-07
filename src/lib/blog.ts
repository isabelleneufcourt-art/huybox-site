import { BLOG_CONTENT, type BlogPostData as BlogPostSource } from "@/data/blog-content";

export type BlogPostData = Omit<BlogPostSource, "publishedAt"> & { publishedAt: Date };

function toPost(post: BlogPostSource): BlogPostData {
  return { ...post, publishedAt: new Date(post.publishedAt) };
}

export async function getBlogPosts(): Promise<BlogPostData[]> {
  return BLOG_CONTENT.map(toPost).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostData | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
