// app/videos/page.tsx
export default function VideosPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our YouTube Channel</h1>
        <div className="aspect-video max-w-4xl mx-auto bg-black rounded-xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Nepali Homestays"
            allowFullScreen
            className="border-0"
          ></iframe>
        </div>
        <p className="text-center text-muted-foreground mt-8">
          Subscribe for authentic stories from Nepali families
        </p>
      </div>
    </div>
  );
}
