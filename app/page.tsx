// app/page.tsx
import CommunityImpact from "./(sections)/CommunityImpact";
import FeaturedHomestays from "./(sections)/FeaturedHomestays";

import FinalCTA from "./(sections)/FinalCTA";
import HeroCarouselData from "./(sections)/HeroCarouselData";
import SearchBarSection from "./(sections)/SearchBarSection";

import WhyChooseUs from "./(sections)/WhyChooseUs";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroCarouselData />
      <SearchBarSection />
      <FeaturedHomestays />
      <WhyChooseUs />
      <CommunityImpact />
      <FinalCTA />
    </main>
  );
}
