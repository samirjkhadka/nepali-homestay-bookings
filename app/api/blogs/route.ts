// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { blogs } from "@/lib/db/schema";

export async function POST(request: Request) {
  const body = await request.json();

  const { title, slug, excerpt, content, featured_image, published } = body;

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "Title, slug, and content are required" },
      { status: 400 }
    );
  }

  try {
    const [newBlog] = await db
      .insert(blogs)
      .values({
        title,
        slug,
        excerpt,
        content,
        featured_image: featured_image || null,
        published: published ?? true,
      })
      .returning();

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Blog creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
