// app/api/videos/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { videos } from "@/lib/db/schema";

export async function POST(request: Request) {
  const body = await request.json();

  const { title, youtube_id, description, featured } = body;

  if (!title || !youtube_id) {
    return NextResponse.json({ error: "Title and YouTube ID are required" }, { status: 400 });
  }

  try {
    const [newVideo] = await db
      .insert(videos)
      .values({
        title,
        youtube_id,
        description,
        featured: featured || false,
      })
      .returning();

    return NextResponse.json({ success: true, video: newVideo });
  } catch (error) {
    console.error("Video creation failed:", error);
    return NextResponse.json({ error: "Failed to add video" }, { status: 500 });
  }
}