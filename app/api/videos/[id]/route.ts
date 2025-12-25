// app/api/videos/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { videos } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const videoId = parseInt(id);

  if (isNaN(videoId)) {
    return NextResponse.json({ error: "Invalid video ID" }, { status: 400 });
  }

  const body = await request.json();
  const { title, youtube_id, description, featured } = body;

  try {
    await db
      .update(videos)
      .set({
        title,
        youtube_id,
        description,
        featured,
        updated_at: new Date(),
      })
      .where(eq(videos.id, videoId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Video update failed:", error);
    return NextResponse.json(
      { error: "Failed to update video" },
      { status: 500 }
    );
  }
}
