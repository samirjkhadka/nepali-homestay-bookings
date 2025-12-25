// app/admin/blogs/page.tsx
import { db } from "@/lib/db/db";
import { blogs } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ManageBlogs() {
  const allBlogs = await db.select().from(blogs).orderBy(blogs.created_at);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Blogs ({allBlogs.length})</h1>
        <Link href="/admin/blogs/new">
          <Button>Add New Blog</Button>
        </Link>
      </div>

      {allBlogs.length === 0 ? (
        <div className="text-center py-20 bg-card border rounded-xl">
          <p className="text-xl text-muted-foreground mb-6">No blogs yet</p>
          <Link href="/admin/blogs/new">
            <Button>Create First Blog Post</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allBlogs.map((blog) => (
            <div key={blog.id} className="bg-card border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {blog.excerpt || blog.content.substring(0, 150) + "..."}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {blog.created_at
                    ? new Date(blog.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
                <div className="flex gap-2">
                  <Link href={`/admin/blogs/${blog.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/blog/${blog.slug}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
