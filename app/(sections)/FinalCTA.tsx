// app/(sections)/FinalCTA.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Ready to Experience the Real Nepal?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
          Join thousands of travelers who have discovered the warmth of Nepali
          hospitality
        </p>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="bg-secondary text-lg px-12 py-6 text-white"
        >
          <Link href="/search">Find Your Homestay</Link>
        </Button>
      </div>
    </section>
  );
}
