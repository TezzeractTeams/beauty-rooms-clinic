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
        eyebrow="Editorial excellence"
        title={<>Beauty &amp; Aesthetic Services in Sarasota</>}
        body="We offer a full range of advanced beauty treatments designed to enhance your natural features and improve overall skin and scalp health."
        imageSrc="/images/our-products.png"
        imageAlt="Close-up of lash extensions and a groomed brow"
        cta={
          <a
            href="#lash"
            className="inline-flex items-center gap-3 px-10 py-5 bg-charcoal text-cream font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-charcoal/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
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
