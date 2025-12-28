// app/(sections)/YouTubeVideosSection.tsx
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db/db";
import { videos } from "@/lib/db/schema";
import { Link } from "lucide-react";

export default async function YouTubeVideosSection() {
  const featuredVideos = await db
    .select()
    .from(videos)
    .limit(12)
    .orderBy(videos.created_at);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Watch Nepal Come Alive</h2>
          <p className="text-xl text-muted-foreground">
            Videos from our homestay families and guests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-card border rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtube_id}`}
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                {video.description && (
                  <p className="text-muted-foreground mt-2 text-sm">
                    {video.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/videos">
            <Button size="lg">Watch More Videos</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
