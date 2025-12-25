// app/admin/blogs/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import BlogForm from "../components/BlogForm";
import { db } from "@/lib/db/db";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogId = parseInt(id);

  const [blog] = await db.select().from(blogs).where(eq(blogs.id, blogId));

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Edit Blog: {blog.title}</h1>
      <BlogForm
        initialData={{
          ...blog,
          excerpt: blog.excerpt ?? "",
          featured_image: blog.featured_image ?? "",
          published: blog.published ?? true,
        }}
      />
    </div>
  );
}
