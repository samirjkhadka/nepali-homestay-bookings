// app/(sections)/SearchBarSection.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBarSection() {
  return (
    <section className="bg-primary/5 py-30 -mt-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Discover Authentic Nepali Homestays
          </h2>
          <p className="text-xl text-muted-foreground">
            Stay with local families, eat home-cooked meals, live the real Nepal
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Where do you want to go? (e.g., Bhaktapur, Pokhara)"
              className="flex-1 text-lg py-6"
            />
            <Button asChild size="lg" className="px-12 py-6 text-lg">
              <Link href="/search">Search Homestays</Link>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
