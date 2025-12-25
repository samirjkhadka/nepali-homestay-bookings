// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/db/db";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [blog] = await db.select().from(blogs).where(eq(blogs.slug, slug));

  if (!blog || !blog.published) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-6">{blog.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>By {blog.author}</span>
            <span>•</span>
            <time>
             {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : "Recently"}
            </time>
          </div>
        </header>

        {blog.featured_image && (
          <div className="relative h-96 md:h-150 rounded-2xl overflow-hidden mb-12">
            <Image
              src={blog.featured_image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {blog.excerpt && (
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-line">{blog.content}</div>
        </div>
      </div>
    </article>
  );
}
