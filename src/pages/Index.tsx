import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import JobsSection from "@/components/JobsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <JobsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
