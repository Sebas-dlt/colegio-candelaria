import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import SectionCards from "@/components/SectionCards";
import QuoteBlock from "@/components/QuoteBlock";
import NewsCarousel from "@/components/NewsCarousel";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickAccess />
      <SectionCards />
      <QuoteBlock />
      <NewsCarousel />
    </>
  );
}