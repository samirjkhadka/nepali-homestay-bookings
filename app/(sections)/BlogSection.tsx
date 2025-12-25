// app/(sections)/BlogSection.tsx
import Link from "next/link";
import { db } from "@/lib/db/db";
import { blogs } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";

export default async function BlogSection() {
  const recentBlogs = await db
    .select()
    .from(blogs)
    .limit(3)
    .orderBy(blogs.created_at);

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Travel Stories from Nepal</h2>
          <p className="text-xl text-muted-foreground">
            Real experiences from our guests and hosts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="bg-card border rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-48 bg-linear-to-br from-primary/20 to-primary/10" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-muted-foreground line-clamp-3">
                  {blog.excerpt || blog.content.substring(0, 150) + "..."}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button size="lg">Read All Stories</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
