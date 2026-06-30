import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CaseStudies from "@/components/CaseStudies";
import BeforeAfter from "@/components/BeforeAfter";
import Capabilities from "@/components/Capabilities";
import PricingCalculator from "@/components/PricingCalculator";
import ChatbotDemo from "@/components/ChatbotDemo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Stats />
      <CaseStudies />
      <BeforeAfter />
      <Capabilities />
      <PricingCalculator />
      <ChatbotDemo />
      <Contact />
      <Footer />
      <StickyCta />
    </main>
  );
}
