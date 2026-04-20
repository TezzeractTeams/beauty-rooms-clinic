import Layout from "@/components/Layout";
import { ArrowRightIcon } from "@/components/home/icons";
import {
  LashKnowFaqSection,
  ServiceCategoryBottomCta,
  ServiceCategoryIntro,
  ServiceFeaturedCard,
  ServicesSplitHero,
  getCategoryDetail,
  serviceCategories,
} from "@/components/services";
import { Fragment } from "react";
import { Navigate, useParams } from "react-router-dom";
import { openMainMenuBoulevardBooking } from "@/lib/boulevardBooking";

export default function ServiceCategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? serviceCategories.find((c) => c.id === slug) : undefined;
  const detail = slug ? getCategoryDetail(slug) : undefined;

  if (!category || !detail) {
    return <Navigate to="/services" replace />;
  }

  return (
    <Layout>
      <ServicesSplitHero
        headingId={`service-category-${category.id}-heading`}
        eyebrow={category.eyebrow}
        title={category.detailPageHeroTitle ?? category.title}
        body={detail.heroBody}
        imageSrc={category.imageSrc}
        imageAlt={category.imageAlt}
        cta={
          <button
            type="button"
            onClick={() => openMainMenuBoulevardBooking()}
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span>Book appointment</span>
            <ArrowRightIcon />
          </button>
        }
      />
      {category.id === "lash" ? <LashKnowFaqSection /> : null}
      <ServiceCategoryIntro
        title={category.eyebrow}
        description={detail.introSampleDescription}
      />
      {detail.services.map((service, index) => (
        <Fragment key={`${category.id}-${index}-${service.name}`}>
          {index > 0 ? (
            <div
              className="w-full h-px bg-[rgba(103,92,83,0.18)]"
              aria-hidden
            />
          ) : null}
          <ServiceFeaturedCard
            headingId={`featured-${category.id}-${index}`}
            service={service}
          />
        </Fragment>
      ))}
      <ServiceCategoryBottomCta categoryId={category.id} />
    </Layout>
  );
}
