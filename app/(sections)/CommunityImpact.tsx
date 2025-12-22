// app/(sections)/CommunityImpact.tsx
import Image from "next/image";

export default function CommunityImpact() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg"
              alt="Nepali family and guests sharing meal"
              width={600}
              height={600}
              className="rounded-2xl shadow-2xl"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold mb-6">
              Your Stay Makes a Real Difference
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Every booking directly supports Nepali families and helps preserve
              cultural traditions in rural communities.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-5xl font-bold text-primary">150+</p>
                <p className="text-lg text-muted-foreground">Family Hosts</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-primary">100%</p>
                <p className="text-lg text-muted-foreground">
                  Revenue to Hosts
                </p>
              </div>
            </div>

            <blockquote className="border-l-4 border-primary pl-6 italic text-lg">
              &quot;Thanks to guests booking through Nepali Homestays, I can
              keep my family traditions alive and send my children to
              school.&quot;
              <footer className="mt-4 text-muted-foreground">
                — Kamala Shakya, Bhaktapur Host
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
