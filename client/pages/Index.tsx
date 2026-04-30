import Layout from "@/components/Layout";
import {
  ApproachSection,
  ConsultationCtaSection,
  HeroSection,
  ServicesSection,
  WelcomeSection,
  WhySection,
} from "@/components/home";

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <WelcomeSection />
      <WhySection />
      <ServicesSection />
      
      <ConsultationCtaSection ctaTo="/booking" />
    </Layout>
  );
}
