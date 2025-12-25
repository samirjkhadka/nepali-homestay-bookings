// app/api/blogs/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const blogId = parseInt(id);

  if (isNaN(blogId)) {
    return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
  }

  const body = await request.json();
  const { title, slug, excerpt, content, featured_image, published } = body;

  try {
    await db
      .update(blogs)
      .set({
        title,
        slug,
        excerpt,
        content,
        featured_image: featured_image || null,
        published,
        updated_at: new Date(),
      })
      .where(eq(blogs.id, blogId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog update failed:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}
