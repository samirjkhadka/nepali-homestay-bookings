// app/admin/videos/page.tsx
import { db } from "@/lib/db/db";
import { videos } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { desc } from "drizzle-orm";

export default async function ManageVideos() {
  const allVideos = await db
    .select()
    .from(videos)
    .orderBy(desc(videos.created_at));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Manage YouTube Videos ({allVideos.length})
        </h1>
        <Link href="/admin/videos/new">
          <Button>Add New Video</Button>
        </Link>
      </div>

      {allVideos.length === 0 ? (
        <div className="text-center py-20 bg-card border rounded-xl">
          <p className="text-xl text-muted-foreground mb-6">No videos yet</p>
          <Link href="/admin/videos/new">
            <Button>Add First Video</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allVideos.map((video) => (
            <div
              key={video.id}
              className="bg-card border rounded-xl overflow-hidden"
            >
              <div className="relative h-48">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtube_id}`}
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                <div className="flex gap-2 mt-4">
                  <Link href={`/admin/videos/${video.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
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
