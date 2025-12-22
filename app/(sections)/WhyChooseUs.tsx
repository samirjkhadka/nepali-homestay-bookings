// app/(sections)/WhyChooseUs.tsx
import { Heart, Home, Users, Shield } from "lucide-react";

const reasons = [
  {
    icon: Home,
    title: "Stay with Real Families",
    description:
      "Live like a local — eat home-cooked meals, join family traditions, make lifelong friends",
  },
  {
    icon: Heart,
    title: "Support Local Communities",
    description:
      "100% of your booking goes directly to Nepali families — no corporate middlemen",
  },
  {
    icon: Users,
    title: "Authentic Cultural Experiences",
    description:
      "Learn Newari cooking, join Gurung festivals, explore hidden temples with your hosts",
  },
  {
    icon: Shield,
    title: "Verified & Safe",
    description:
      "Every homestay is personally visited and verified. Your safety and comfort come first",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose Nepali Homestays
          </h2>
          <p className="text-xl text-muted-foreground">
            More than just a place to sleep — a way to truly experience Nepal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <div key={i} className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <reason.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
