import HeroBanner from "@/components/sections/HeroBanner";
import CategorySection from "@/components/sections/CategorySection";
import PricingSection from "@/components/sections/PricingSection";
import MaterialSection from "@/components/sections/MaterialSection";
import ProjectsSlider from "@/components/sections/ProjectsSlider";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <CategorySection />
      <PricingSection />
      <MaterialSection />
      <ProjectsSlider />
      <Testimonials />
      <ContactForm />
    </>
  );
}
