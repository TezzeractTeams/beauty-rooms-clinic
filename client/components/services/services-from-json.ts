import servicesRaw from "../../data/services.json";
import type { FeaturedServiceCardData } from "./service-category-detail-sample";
import type { ServiceCategory } from "./service-types";

type RawRow = Record<string, string>;

export interface CategoryDetailFromJson {
  heroBody: string;
  /** Extra sample line shown under the intro heading, below the main description */
  introSampleDescription: string;
  services: FeaturedServiceCardData[];
}

const IMG_LASHES = "/images/home-lashes.jpg";
const IMG_HEAD_SPA = "/images/Head%20SPA.JPG";
const IMG_PERMANENT_MAKEUP = "/images/Permanent%20Makup.jpg";
const IMG_PMU_SERVICES_LISTING = "/images/lip-pmu.jpg";

/** Display order on /services and in nav: Lash, Head Spa, PMU */
const CATEGORY_ORDER = [
  { label: "LASH", id: "lash" },
  { label: "HEAD SPA", id: "head-spa" },
  { label: "PMU", id: "pmu" },
] as const;

const CATEGORY_UI: Record<
  string,
  {
    eyebrow: string;
    title: string;
    ctaLabel: string;
    imageSrc: string;
    imageAlt: string;
    imageAltShort: string;
    imageClassName?: string;
    imageOnLeft: boolean;
    listingImageSrc?: string;
    listingImageAlt?: string;
    detailPageHeroTitle?: string;
  }
> = {
  lash: {
    eyebrow: "Lash",
    title: "Lash services",
    ctaLabel: "Book lash appointment",
    imageSrc: IMG_LASHES,
    imageAlt: "Close-up of classic eyelash extensions and soft shaded eyeliner",
    imageAltShort: "Lash service",
    imageOnLeft: false,
  },
  "head-spa": {
    eyebrow: "Head Spa",
    title: "Head spa treatments",
    ctaLabel: "Book head spa session",
    imageSrc: IMG_HEAD_SPA,
    imageAlt: "Calm, welcoming interior for head spa and wellness services",
    imageAltShort: "Head spa service",
    imageOnLeft: true,
  },
  pmu: {
    eyebrow: "PMU",
    title: "Permanent makeup",
    detailPageHeroTitle: "Sophisticated Artistry. Permanent Results",
    ctaLabel: "Book PMU consultation",
    imageSrc: IMG_PERMANENT_MAKEUP,
    imageAlt: "Permanent makeup and brow treatment at Beauty Rooms Clinic",
    imageAltShort: "PMU service",
    imageOnLeft: false,
    listingImageSrc: IMG_PMU_SERVICES_LISTING,
    listingImageAlt: "Lip and permanent makeup treatment at Beauty Rooms Clinic",
  },
};

const CATEGORY_HERO_BODY: Record<string, string> = {
  lash: "Define your gaze with precision lash applications that range from subtle enhancement to dramatic volume.",
  "head-spa":
    "Scalp-focused rituals that melt tension away while supporting healthier hair from the root.",
  pmu:
    "Elevate your daily aesthetic with precision-crafted Permanent Makeup. At BRC, we specialize in hyper-realistic techniques designed to harmonize with your unique facial structure, ensuring you wake up every day looking refined, refreshed, and effortlessly yourself.",
};

/** Second paragraph under the category intro heading (sample / supporting copy) */
const CATEGORY_INTRO_SAMPLE: Record<string, string> = {
  lash: "From classic extensions to lifts, tints, and brow design—each appointment is tailored to your features and lifestyle.",
  "head-spa":
    "Choose hydration, detox, growth-focused, or relaxation sessions—and add mini facials, massage, or styling when you want a little extra.",
  pmu: "At Beauty Rooms Clinic, we don't believe in 'trend brows.' We believe in timeless proportions. Your session is a collaborative design process focused on restoring what time or over-plucking has taken away.",
};

const BOTTOM_CTA_SUBTEXT =
  "Join our community of confident clients in Sarasota & Lakewood Ranch. Schedule your consultation today.";

/** Dynamic word in “Ready for effortless …?” plus button label */
const CATEGORY_BOTTOM_CTA: Record<string, { headingHighlight: string; buttonLabel: string }> = {
  lash: { headingHighlight: "lashes", buttonLabel: "Book your lash consultation" },
  pmu: { headingHighlight: "PMU", buttonLabel: "Book your PMU consultation" },
  "head-spa": { headingHighlight: "head spa", buttonLabel: "Book your head spa consultation" },
};

export interface CategoryBottomCtaCopy {
  /** Shown after “Ready for effortless ” (sentence case / proper caps applied in UI) */
  headingHighlight: string;
  subtext: string;
  buttonLabel: string;
}

function formatBottomCtaHighlight(raw: string): string {
  if (raw.toUpperCase() === "PMU") return "PMU";
  return raw
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function getCategoryBottomCta(categoryId: string): CategoryBottomCtaCopy | undefined {
  const row = CATEGORY_BOTTOM_CTA[categoryId];
  if (!row) return undefined;
  return {
    headingHighlight: formatBottomCtaHighlight(row.headingHighlight),
    subtext: BOTTOM_CTA_SUBTEXT,
    buttonLabel: row.buttonLabel,
  };
}

const CATEGORY_BENEFITS: Record<string, { title: string; description: string }[]> = {
  lash: [
    {
      title: "Instant, Weightless Volume",
      description:
        "Achieve a full, natural look that opens your eyes and boosts confidence from the second you leave.",
    },
    {
      title: "Mascara-Free, Flawless Days",
      description: "Wake up every morning with perfectly defined lashes.",
    },
    {
      title: "Artfully Bespoke Styling",
      description:
        "Every set is precisely custom-mapped and styled to perfectly harmonize with your unique eye shape and natural lashes.",
    },
  ],
  "head-spa": [
    {
      title: "Deep Scalp Renewal",
      description:
        "Rich cleansing and targeted care restore balance so your scalp feels light, fresh, and ready to support healthier-looking hair.",
    },
    {
      title: "Circulation That Feeds Growth",
      description:
        "Massage and advanced techniques boost blood flow and nutrient delivery to the follicles—supporting stronger, fuller hair over time.",
    },
    {
      title: "Unwind From Root to Tip",
      description:
        "Slow, intentional rituals calm the nervous system and release tension while you enjoy quiet, restorative care.",
    },
  ],
  pmu: [
    {
      title: "Effortless Morning Polish",
      description:
        "Wake up with softly defined brows, lips, and liner that look refined the moment you open your eyes—no daily drawing required.",
    },
    {
      title: "Naturally Yours, Refined",
      description:
        "Every shape and shade is mapped and color-matched to your features for results that enhance without looking overdone.",
    },
    {
      title: "Beauty That Goes the Distance",
      description:
        "Premium pigments and precise application deliver lasting confidence with fewer products and less time in front of the mirror.",
    },
  ],
};

interface NormalizedServiceRow {
  slug: string;
  name: string;
  description: string;
  durationRaw: string;
  imageUrl: string;
  bookingLink: string;
}

export function parseDuration(raw: string): string {
  const s = String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s/g, "");
  if (!s) return "—";
  const n = parseInt(s.replace(/min/gi, ""), 10);
  if (!Number.isFinite(n) || n < 0) {
    const up = String(raw ?? "").trim().toUpperCase();
    return up || "—";
  }
  return `${n} MINUTES`;
}

function categoryLabelToSlug(label: string): string | undefined {
  const u = label.trim().toUpperCase();
  if (u === "LASH") return "lash";
  if (u === "HEAD SPA") return "head-spa";
  if (u === "PMU") return "pmu";
  return undefined;
}

function readField(row: RawRow, ...keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (v != null && String(v).trim() !== "") return String(v).trim();
  }
  return "";
}

function normalizeRows(): NormalizedServiceRow[] {
  const list = servicesRaw as unknown as RawRow[];
  const out: NormalizedServiceRow[] = [];
  for (const row of list) {
    if (!row || typeof row !== "object") continue;
    const categoryLabel = readField(row, "SERVICE GATEGORY ", "SERVICE GATEGORY");
    const slug = categoryLabelToSlug(categoryLabel);
    if (!slug) continue;
    const name = readField(row, "SERVICE ", "SERVICE");
    if (!name) continue;
    out.push({
      slug,
      name,
      description: readField(row, "SERVICE DESCRIPTION"),
      durationRaw: readField(row, "DURATION"),
      imageUrl: readField(row, "Image URL"),
      bookingLink: readField(row, "Booking Link"),
    });
  }
  return out;
}

function groupBySlug(rows: NormalizedServiceRow[]): Map<string, NormalizedServiceRow[]> {
  const m = new Map<string, NormalizedServiceRow[]>();
  for (const r of rows) {
    const arr = m.get(r.slug) ?? [];
    arr.push(r);
    m.set(r.slug, arr);
  }
  return m;
}

export function buildServiceCategories(): ServiceCategory[] {
  const rows = normalizeRows();
  const bySlug = groupBySlug(rows);
  return CATEGORY_ORDER.map(({ id }) => {
    const ui = CATEGORY_UI[id];
    const list = bySlug.get(id) ?? [];
    return {
      id,
      eyebrow: ui.eyebrow,
      title: ui.title,
      detailPageHeroTitle: ui.detailPageHeroTitle,
      treatments: list.map((r) => r.name),
      benefits: CATEGORY_BENEFITS[id] ?? [],
      ctaLabel: ui.ctaLabel,
      imageSrc: ui.imageSrc,
      imageAlt: ui.imageAlt,
      listingImageSrc: ui.listingImageSrc,
      listingImageAlt: ui.listingImageAlt,
      imageClassName: ui.imageClassName,
      imageOnLeft: ui.imageOnLeft,
    };
  });
}

export function getCategoryDetail(categoryId: string): CategoryDetailFromJson | undefined {
  const ui = CATEGORY_UI[categoryId];
  const heroBody = CATEGORY_HERO_BODY[categoryId];
  if (!ui || !heroBody) return undefined;
  const rows = normalizeRows().filter((r) => r.slug === categoryId);
  if (rows.length === 0) return undefined;
  return {
    heroBody,
    introSampleDescription: CATEGORY_INTRO_SAMPLE[categoryId] ?? "",
    services: rows.map((r) => ({
      name: r.name,
      description: r.description || "Details available at your consultation.",
      duration: parseDuration(r.durationRaw),
      imageSrc: r.imageUrl ? r.imageUrl : ui.imageSrc,
      imageAlt: `${r.name} — ${ui.imageAltShort}`,
    })),
  };
}
