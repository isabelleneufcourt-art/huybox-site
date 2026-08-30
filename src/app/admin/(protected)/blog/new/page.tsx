import { BlogForm } from "@/components/admin/blog/BlogForm";
import { createBlogPostAction } from "@/app/admin/(protected)/blog/actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl">Nouvel article</h1>
      <div className="mt-6 max-w-2xl">
        <BlogForm action={createBlogPostAction} submitLabel="Publier l'article" />
      </div>
    </div>
  );
}
