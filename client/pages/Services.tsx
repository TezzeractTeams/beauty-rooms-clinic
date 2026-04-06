import Layout from "@/components/Layout";
import { AboutApproachSection } from "@/components/about/AboutApproachSection";
import { ConsultationCtaSection } from "@/components/home/ConsultationCtaSection";
import { ArrowRightIcon } from "@/components/home/icons";
import { ServiceCategorySection, serviceCategories } from "@/components/services";
import { ServicesSplitHero } from "@/components/services/ServicesSplitHero";

export default function Services() {
  return (
    <Layout>
      <ServicesSplitHero
        headingId="services-page-heading"
        eyebrow="The BRC Standard: Where Precision Meets Tranquility
"
        title={<>Beauty &amp; Aesthetic Services in Sarasota</>}
        body="Beauty Rooms Clinic is Sarasota’s premier boutique destination for advanced aesthetic artistry. We don't believe in one-size-fits-all beauty; we specialize in hyper-personalized treatments—from bespoke lash design to medical-grade skin and scalp therapies—engineered to enhance your natural features and restore long-term vitality. Experience a higher standard of clinical care in a sanctuary of calm."
        imageSrc="/images/Permanent%20Makup.jpg"
        imageAlt="Permanent makeup artistry at Beauty Rooms Clinic"
        cta={
          <a
            href="#lash"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span>Explore our services</span>
            <ArrowRightIcon />
          </a>
        }
      />
      <div className="py-20">
      <AboutApproachSection />
      </div>
      

      {serviceCategories.map((category) => (
        <ServiceCategorySection key={category.id} category={category} />
      ))}


      <ConsultationCtaSection />
    </Layout>
  );
}
