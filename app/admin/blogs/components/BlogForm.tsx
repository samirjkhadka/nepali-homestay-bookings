// app/admin/blogs/components/BlogForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";

type BlogFormProps = {
  initialData?: {
    id?: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featured_image?: string;
    published?: boolean;
  };
};

export default function BlogForm({ initialData }: BlogFormProps) {
  const isEdit = !!initialData?.id;

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featured_image || ""
  );
  const [published, setPublished] = useState(initialData?.published ?? true);
  const [loading, setLoading] = useState(false);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEdit) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title,
      slug,
      excerpt,
      content,
      featured_image: featuredImage,
      published,
    };

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/blogs/${initialData?.id}` : "/api/blogs";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(isEdit ? "Blog updated!" : "Blog created!");
        window.location.href = "/admin/blogs";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt (optional)</Label>
        <Textarea
          id="excerpt"
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Featured Images</Label>
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
          onSuccess={(result: any) => setFeaturedImage(result.info.secure_url)}
          options={{
            maxFiles: 10,
            maxFileSize: 700000, // 700kb
            clientAllowedFormats: [
              "jpeg",
              "png",
              "jpg",
              "webp",
              "gif",
              "svg",
              "pdf",
            ],
            sources: ["local", "url", "camera"],
            thumbnailTransformation: [
              {
                width: 800,
                height: 600,
                crop: "limit",
              },
              {
                quality: "auto:best",
              },
              {
                format: "auto",
              },
              {
                flags: "progressive",
              },
            ],
          }}
        >
          <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2 cursor-pointer">
            Upload Featured Image
          </div>
        </CldUploadButton>

        {featuredImage && (
          <div className="mt-4 relative h-64 w-full rounded-xl overflow-hidden">
            <Image
              src={featuredImage}
              alt="Featured"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => setFeaturedImage("")}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Switch checked={published} onCheckedChange={setPublished} />
        <Label>Published</Label>
      </div>

      <div className="flex gap-6 pt-8 border-t">
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Blog" : "Create Blog"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/blogs">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
