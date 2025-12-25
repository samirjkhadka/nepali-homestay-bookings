// app/admin/videos/[id]/edit/page.tsx
import { notFound } from "next/navigation";

import { db } from "@/lib/db/db";
import { videos } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import VideoForm from "../../components/VideoForm";

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const videoId = parseInt(id);

  const [video] = await db.select().from(videos).where(eq(videos.id, videoId));

  if (!video) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Edit Video: {video.title}</h1>
      <VideoForm
        initialData={{
          ...video,
          title: video.title ?? "",
          description: video.description ?? "",
          featured: video.featured ?? true,
        }}
      />
    </div>
  );
}
