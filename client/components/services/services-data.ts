export interface ServiceCategory {
  id: string;
  eyebrow: string;
  title: string;
  treatments: string[];
  benefits: { title: string; description: string }[];
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  /** When true, image appears on the left on md+ */
  imageOnLeft: boolean;
}

const PEXELS = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

const BUILDER_INTERIOR =
  "https://api.builder.io/api/v1/image/assets/TEMP/311c7b6313d6b19839dbb5fd6c0d417d258f9130?width=1600";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "lash",
    eyebrow: "Lash Services",
    title: "Lash Extensions in Sarasota",
    treatments: [
      "Classic Lash Extensions",
      "Hybrid Lash Extensions",
      "Volume Lash Extensions",
      "Lash Fills",
    ],
    benefits: [
      { title: "Fuller, longer lashes instantly", description: "" },
      { title: "No mascara needed", description: "" },
      { title: "Customized to your eye shape", description: "" },
    ],
    ctaLabel: "Book Lash Appointment",
    imageSrc: PEXELS("10850706"),
    imageAlt: "Close-up beauty treatment emphasizing eyes and lashes",
    imageClassName: "grayscale",
    imageOnLeft: true,
  },
  {
    id: "pmu",
    eyebrow: "PMU (Permanent Makeup)",
    title: "Permanent Makeup in Sarasota",
    treatments: ["Microblading", "Powder Brows", "Lip Blush"],
    benefits: [
      { title: "Long-lasting results", description: "" },
      { title: "Natural enhancement", description: "" },
      { title: "Saves time daily", description: "" },
    ],
    ctaLabel: "Book PMU Consultation",
    imageSrc: PEXELS("30896215"),
    imageAlt: "Permanent makeup and brow treatment at Beauty Rooms Clinic",
    imageOnLeft: false,
  },
  {
    id: "head-spa",
    eyebrow: "Head Spa",
    title: "Head Spa Treatments in Sarasota",
    treatments: [
      "Scalp detox treatments",
      "Relaxation head spa therapy",
      "Hair & scalp rejuvenation",
    ],
    benefits: [
      { title: "Improves scalp health", description: "" },
      { title: "Promotes hair growth", description: "" },
      { title: "Deep relaxation", description: "" },
    ],
    ctaLabel: "Book Head Spa Session",
    imageSrc: BUILDER_INTERIOR,
    imageAlt: "Calm, welcoming interior for head spa and wellness services",
    imageOnLeft: true,
  },
  {
    id: "esthetician",
    eyebrow: "Esthetician Services",
    title: "Facials & Skin Treatments in Sarasota",
    treatments: [
      "Acne Treatments",
      "Hydration Facials",
      "Anti-Aging Treatments",
      "Skin Rejuvenation",
    ],
    benefits: [
      { title: "Clearer skin", description: "" },
      { title: "Improved texture", description: "" },
      { title: "Radiant glow", description: "" },
    ],
    ctaLabel: "Book Facial Appointment",
    imageSrc: "/images/our-products.png",
    imageAlt: "Facial and skin treatment in progress at Beauty Rooms Clinic",
    imageOnLeft: false,
  },
];
