import Layout from "@/components/Layout";
import { ConsultationCtaSection } from "@/components/home/ConsultationCtaSection";
import {
  AboutApproachSection,
  AboutExperienceSection,
  AboutExpertsSection,
  AboutHeroSection,
  AboutOfferSection,
  AboutWhoSection,
  AboutWhyChooseSection,
} from "@/components/about";

export default function About() {
  return (
    <Layout>
      <AboutHeroSection />
      <AboutWhoSection />
     
      <AboutOfferSection />
      <AboutExpertsSection />
      <AboutExperienceSection />
      <AboutWhyChooseSection />
      <ConsultationCtaSection
        headingId="about-final-cta-heading"
        titleLines={["Ready to enhance your", "natural beauty?"]}
        subtext={null}
        ctaLabel="Book Your Appointment"
        ctaTo="/bookings"
      />
    </Layout>
  );
}
