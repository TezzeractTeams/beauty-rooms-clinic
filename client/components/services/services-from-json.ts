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

const BUILDER_INTERIOR =
  "https://api.builder.io/api/v1/image/assets/TEMP/311c7b6313d6b19839dbb5fd6c0d417d258f9130?width=1600";

const IMG_LASHES = "/images/lashes.webp";
const IMG_PERMANENT_MAKEUP = "/images/Permanent%20Makeup.webp";

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
  }
> = {
  lash: {
    eyebrow: "Lash",
    title: "Lash services",
    ctaLabel: "Book lash appointment",
    imageSrc: IMG_LASHES,
    imageAlt: "Close-up beauty treatment emphasizing eyes and lashes",
    imageAltShort: "Lash service",
    imageOnLeft: false,
  },
  "head-spa": {
    eyebrow: "Head Spa",
    title: "Head spa treatments",
    ctaLabel: "Book head spa session",
    imageSrc: BUILDER_INTERIOR,
    imageAlt: "Calm, welcoming interior for head spa and wellness services",
    imageAltShort: "Head spa service",
    imageOnLeft: true,
  },
  pmu: {
    eyebrow: "PMU",
    title: "Permanent makeup",
    ctaLabel: "Book PMU consultation",
    imageSrc: IMG_PERMANENT_MAKEUP,
    imageAlt: "Permanent makeup and brow treatment at Beauty Rooms Clinic",
    imageAltShort: "PMU service",
    imageOnLeft: false,
  },
};

const CATEGORY_HERO_BODY: Record<string, string> = {
  lash: "Define your gaze with precision lash applications that range from subtle enhancement to dramatic volume.",
  "head-spa":
    "Scalp-focused rituals that melt tension away while supporting healthier hair from the root.",
  pmu: "Wake up with refined brows and soft lip color—permanent makeup designed to look natural and age gracefully.",
};

/** Second paragraph under the category intro heading (sample / supporting copy) */
const CATEGORY_INTRO_SAMPLE: Record<string, string> = {
  lash: "From classic extensions to lifts, tints, and brow design—each appointment is tailored to your features and lifestyle.",
  "head-spa":
    "Choose hydration, detox, growth-focused, or relaxation sessions—and add mini facials, massage, or styling when you want a little extra.",
  pmu: "Brows, lips, liner, and paramedical options are mapped and color-matched for results that look like you—only more polished.",
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
    { title: "Fuller, longer lashes instantly", description: "" },
    { title: "No mascara needed", description: "" },
    { title: "Customized to your eye shape", description: "" },
  ],
  "head-spa": [
    { title: "Improves scalp health", description: "" },
    { title: "Promotes hair growth", description: "" },
    { title: "Deep relaxation", description: "" },
  ],
  pmu: [
    { title: "Long-lasting results", description: "" },
    { title: "Natural enhancement", description: "" },
    { title: "Saves time daily", description: "" },
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
      treatments: list.map((r) => r.name),
      benefits: CATEGORY_BENEFITS[id] ?? [],
      ctaLabel: ui.ctaLabel,
      imageSrc: ui.imageSrc,
      imageAlt: ui.imageAlt,
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
