import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogForm } from "@/components/admin/blog/BlogForm";
import { updateBlogPostAction } from "@/app/admin/(protected)/blog/actions";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  const boundAction = updateBlogPostAction.bind(null, post.id);

  return (
    <div>
      <h1 className="text-2xl">Modifier l'article</h1>
      <div className="mt-6 max-w-2xl">
        <BlogForm action={boundAction} defaultValues={post} submitLabel="Enregistrer" />
      </div>
    </div>
  );
}
