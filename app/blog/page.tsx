// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db/db";
import { blogs } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function BlogListPage() {
  const publishedBlogs = await db
    .select()
    .from(blogs)
    .where(eq(blogs.published, true))
    .orderBy(desc(blogs.created_at));

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12">
          Travel Stories from Nepal
        </h1>

        {publishedBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No published blogs yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="bg-card border rounded-xl overflow-hidden hover:shadow-xl transition"
              >
                {blog.featured_image ? (
                  <div className="relative h-48">
                    <Image
                      src={blog.featured_image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-linear-to-br from-primary/20 to-primary/10" />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {blog.excerpt || blog.content.substring(0, 150) + "..."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {blog.created_at
                      ? new Date(blog.created_at).toLocaleDateString()
                      : "Recently"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
