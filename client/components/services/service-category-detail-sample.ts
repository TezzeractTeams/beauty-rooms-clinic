export interface FeaturedServiceCardData {
  name: string;
  description: string;
  /** e.g. "90 MINUTES" */
  duration: string;
  imageSrc: string;
  imageAlt: string;
}

export interface ServiceCategoryDetailSample {
  /** Hero paragraph below the category title */
  heroBody: string;
  featured: FeaturedServiceCardData;
}

/** Placeholder copy per category; replace or source from CMS later. */
export const serviceCategoryDetailSamples: Record<string, ServiceCategoryDetailSample> = {
  lash: {
    heroBody:
      "Define your gaze with precision lash applications that range from subtle enhancement to dramatic volume.",
    featured: {
      name: "Eyelash extensions",
      description:
        "Individual extensions are applied to your natural lashes for length, curl, and fullness tailored to your eye shape and lifestyle. Classic, hybrid, and volume options available.",
      duration: "120 MINUTES",
      imageSrc: "https://images.pexels.com/photos/10850706/pexels-photo-10850706.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Close-up of lash extension treatment",
    },
  },
  pmu: {
    heroBody:
      "Wake up with refined brows and soft lip color—permanent makeup designed to look natural and age gracefully.",
    featured: {
      name: "Powder brows",
      description:
        "A soft, powdered finish that heals to a natural tint. Ideal for fuller-looking brows with minimal daily maintenance.",
      duration: "150 MINUTES",
      imageSrc: "https://images.pexels.com/photos/30896215/pexels-photo-30896215.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageAlt: "Brow and permanent makeup consultation",
    },
  },
  "head-spa": {
    heroBody:
      "Scalp-focused rituals that melt tension away while supporting healthier hair from the root.",
    featured: {
      name: "Signature head spa",
      description:
        "A restorative session combining scalp analysis, deep cleansing, massage, and conditioning to refresh both mind and hair.",
      duration: "60 MINUTES",
      imageSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/311c7b6313d6b19839dbb5fd6c0d417d258f9130?width=1600",
      imageAlt: "Calm spa interior for head spa treatment",
    },
  },
  esthetician: {
    heroBody:
      "Clinical-grade facials and targeted treatments to clarify, hydrate, and renew your skin.",
    featured: {
      name: "Hydration facial",
      description:
        "A restorative facial focused on barrier support and lasting moisture—perfect for dry or depleted skin.",
      duration: "50 MINUTES",
      imageSrc: "/images/our-products.png",
      imageAlt: "Facial and skin treatment",
    },
  },
};

export function getServiceCategoryDetailSample(categoryId: string): ServiceCategoryDetailSample | undefined {
  return serviceCategoryDetailSamples[categoryId];
}
