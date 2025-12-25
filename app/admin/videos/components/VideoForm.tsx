// app/admin/videos/components/VideoForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

type VideoFormProps = {
  initialData?: {
    id?: number;
    title: string;
    youtube_id: string;
    description?: string;
    featured?: boolean;
  };
};

export default function VideoForm({ initialData }: VideoFormProps) {
  const isEdit = !!initialData?.id;

  const [title, setTitle] = useState(initialData?.title || "");
  const [youtubeUrl, setYoutubeUrl] = useState(
    initialData?.youtube_id ? `https://www.youtube.com/watch?v=${initialData.youtube_id}` : ""
  );
  const [description, setDescription] = useState(initialData?.description || "");
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [loading, setLoading] = useState(false);

  // Extract YouTube ID from URL
  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : "";
  };

  const youtubeId = extractYouTubeId(youtubeUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !youtubeId) {
      alert("Title and valid YouTube URL are required");
      return;
    }

    setLoading(true);

    const formData = {
      title,
      youtube_id: youtubeId,
      description,
      featured,
    };

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/videos/${initialData?.id}` : "/api/videos";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(isEdit ? "Video updated!" : "Video added!");
        window.location.href = "/admin/videos";
      } else {
        const error = await res.json();
        alert("Failed to save: " + (error.error || "Unknown"));
      }
    } catch (error) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-12">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="youtubeUrl">YouTube URL</Label>
        <Input
          id="youtubeUrl"
          placeholder="https://www.youtube.com/watch?v=..."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          required
        />
        <p className="text-sm text-muted-foreground">
          Paste the full YouTube URL — the ID will be extracted automatically.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <Switch checked={featured} onCheckedChange={setFeatured} />
        <Label>Featured on Homepage</Label>
      </div>

      {/* Preview */}
      {youtubeId && (
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="relative aspect-video rounded-xl overflow-hidden border">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}

      <div className="flex gap-6 pt-8 border-t">
        <Button type="submit" size="lg" disabled={loading || !youtubeId}>
          {loading ? "Saving..." : isEdit ? "Update Video" : "Add Video"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/videos">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}