// app/page.tsx
import CommunityImpact from "./(sections)/CommunityImpact";
import FeaturedHomestays from "./(sections)/FeaturedHomestays";

import FinalCTA from "./(sections)/FinalCTA";
import HeroCarousel from "./(sections)/HeroCarousel";
import SearchBarSection from "./(sections)/SearchBarSection";

import WhyChooseUs from "./(sections)/WhyChooseUs";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <SearchBarSection />
      <FeaturedHomestays />
      <WhyChooseUs />
      <CommunityImpact />
      <FinalCTA />
    </main>
  );
}
