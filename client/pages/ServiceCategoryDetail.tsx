import Layout from "@/components/Layout";
import { fetchBookingCatalog, type BookingService } from "@/components/booking/utils/bookingCatalogApi";
import { ArrowRightIcon } from "@/components/home/icons";
import {
  LashKnowFaqSection,
  ServiceCategoryBottomCta,
  ServiceCategoryIntro,
  ServiceFeaturedCard,
  ServicesSplitHero,
  getCategoryPageCopy,
  serviceCategories,
} from "@/components/services";
import { bookingPathForCategory } from "@/components/services/categoryBookingLinks";
import type { FeaturedServiceCardData } from "@/components/services/service-category-detail-sample";
import { resolveBookingCategoryForSiteSlug } from "@/components/services/resolveBookingCategoryForSiteSlug";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

function bookingServiceToCardData(
  s: BookingService,
  imageSrc: string,
  imageAltSuffix: string,
): FeaturedServiceCardData {
  return {
    name: s.name,
    duration: s.durationMinutes > 0 ? `${s.durationMinutes} MINUTES` : undefined,
    imageSrc,
    imageAlt: `${s.name} — ${imageAltSuffix}`,
    priceDiscountedUsd: s.discountedPriceUsd,
    priceActualUsd: s.actualPriceUsd,
  };
}

export default function ServiceCategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? serviceCategories.find((c) => c.id === slug) : undefined;
  const pageCopy = slug ? getCategoryPageCopy(slug) : undefined;

  const { data: catalog, isLoading, isError, error } = useQuery({
    queryKey: ["booking-catalog"],
    queryFn: fetchBookingCatalog,
  });

  if (!category || !pageCopy) {
    return <Navigate to="/services" replace />;
  }
  const bookingTo = bookingPathForCategory(category.id);

  const resolvedBookingCategory = catalog ? resolveBookingCategoryForSiteSlug(catalog, slug) : null;
  const catalogServices =
    resolvedBookingCategory && catalog
      ? catalog.services.filter((s) => s.category === resolvedBookingCategory.id)
      : [];

  // PMU: match split hero art on /services/pmu (listing image is only for the /services hub tile).
  const cardImageSrc =
    category.id === "pmu" ? category.imageSrc : (category.listingImageSrc ?? category.imageSrc);
  const cardImageAltSuffix =
    category.id === "pmu" ? category.imageAlt : (category.listingImageAlt ?? category.imageAlt);

  const listBlock = (() => {
    if (isLoading) {
      return (
        <div className="w-full bg-[#FAF9F6] py-16 text-center font-barlow text-sm font-light text-charcoal/60">
          Loading services…
        </div>
      );
    }
    if (isError) {
      return (
        <div className="mx-auto max-w-[1400px] px-6 py-16 text-center font-barlow text-sm font-light text-charcoal/80 md:px-12 lg:px-[90px]">
          {(error as Error | undefined)?.message ?? "Could not load services right now."}{" "}
          <Link to={bookingTo} className="text-charcoal underline underline-offset-4 hover:text-primary">
            Open the booking page
          </Link>
          .
        </div>
      );
    }
    if (!resolvedBookingCategory || catalogServices.length === 0) {
      return (
        <div className="mx-auto max-w-[1400px] px-6 py-16 text-center font-barlow text-sm font-light text-charcoal/80 md:px-12 lg:px-[90px]">
          These services are not available from the live menu yet.{" "}
          <Link to={bookingTo} className="text-charcoal underline underline-offset-4 hover:text-primary">
            Book online
          </Link>{" "}
          to see all current options.
        </div>
      );
    }
    return catalogServices.map((service, index) => (
      <Fragment key={service.slug}>
        {index > 0 ? <div className="w-full h-px bg-[rgba(103,92,83,0.18)]" aria-hidden /> : null}
        <ServiceFeaturedCard
          headingId={`featured-${category.id}-${index}`}
          service={bookingServiceToCardData(service, cardImageSrc, cardImageAltSuffix)}
          bookingTo={bookingTo}
        />
      </Fragment>
    ));
  })();

  return (
    <Layout>
      <ServicesSplitHero
        headingId={`service-category-${category.id}-heading`}
        eyebrow={category.eyebrow}
        title={category.detailPageHeroTitle ?? category.title}
        body={pageCopy.heroBody}
        imageSrc={category.imageSrc}
        imageAlt={category.imageAlt}
        cta={
          <Link
            to={bookingTo}
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span>Book appointment</span>
            <ArrowRightIcon />
          </Link>
        }
      />
      {category.id === "lash" ? <LashKnowFaqSection /> : null}
      <ServiceCategoryIntro title={category.eyebrow} description={pageCopy.introSampleDescription} />
      {listBlock}
      <ServiceCategoryBottomCta categoryId={category.id} />
    </Layout>
  );
}
