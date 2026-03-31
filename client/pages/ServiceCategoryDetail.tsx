import Layout from "@/components/Layout";
import { ArrowRightIcon } from "@/components/home/icons";
import {
  ServiceCategoryIntro,
  ServiceFeaturedCard,
  ServicesSplitHero,
  getServiceCategoryDetailSample,
  serviceCategories,
} from "@/components/services";
import { Link, Navigate, useParams } from "react-router-dom";

export default function ServiceCategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? serviceCategories.find((c) => c.id === slug) : undefined;
  const sample = slug ? getServiceCategoryDetailSample(slug) : undefined;

  if (!category || !sample) {
    return <Navigate to="/services" replace />;
  }

  return (
    <Layout>
      <ServicesSplitHero
        headingId={`service-category-${category.id}-heading`}
        eyebrow={category.eyebrow}
        title={category.title}
        imageSrc={category.imageSrc}
        imageAlt={category.imageAlt}
        cta={
          <Link
            to="/bookings"
            className="inline-flex items-center gap-3 px-10 py-5 bg-charcoal text-cream font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-charcoal/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
          >
            <span>Book appointment</span>
            <ArrowRightIcon />
          </Link>
        }
      />
      <ServiceCategoryIntro title={category.eyebrow} description={sample.heroBody} />
      <ServiceFeaturedCard service={sample.featured} />
    </Layout>
  );
}
