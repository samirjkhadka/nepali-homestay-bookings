// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg"
          alt="Nepali family welcoming guests"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Connecting Hearts, One Homestay at a Time
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            We believe travel should be more than sightseeing — it should be
            about real connections with local families and communities.
          </p>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Nepali Homestay Bookings was born from a simple idea: travelers
              want authentic experiences, and Nepali families want to share
              their culture while earning fair income.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We directly connect guests with family-run homestays across Nepal
              — from Newari homes in Bhaktapur to Gurung villages in the
              Annapurna region.
            </p>
            <p className="text-lg text-muted-foreground">
              Every booking supports local families, preserves traditions, and
              keeps tourism dollars in Nepali communities — not in corporate
              pockets.
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
              alt="Nepali family sharing meal with guests"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-primary/5 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Impact So Far</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-5xl font-bold text-primary mb-2">150+</p>
              <p className="text-xl text-muted-foreground">Family Hosts</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary mb-2">8,000+</p>
              <p className="text-xl text-muted-foreground">Happy Guests</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary mb-2">100%</p>
              <p className="text-xl text-muted-foreground">
                Revenue to Local Families
              </p>
            </div>
          </div>
        </div>

        {/* Team / Himalayan Fox */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Built with ❤️ by Himalayan Fox Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We&apos;re a Nepal-based team passionate about using technology to
            empower local communities and preserve cultural heritage.
          </p>
          <Link href="/contact">
            <Button size="lg">Get in Touch</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
