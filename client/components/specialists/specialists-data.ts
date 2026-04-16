import raw from "@/data/specialist.json";

export type SpecialistFilterId = "all" | "lash" | "head-spa" | "pmu" | "esthetician";

export type SpecialistSpecialty = Exclude<SpecialistFilterId, "all">;

export interface Specialist {
  id: string;
  name: string;
  title: string;
  rating: number;
  /** Slugs used for filter matching (see `SPECIALIST_FILTERS`) */
  specialties: SpecialistSpecialty[];
  /** Short labels shown as pills on the card */
  tags: string[];
  description: string;
  certification: string;
  imageSrc: string;
  imageAlt: string;
  /** Optional override for the primary CTA text */
  ctaLabel?: string;
  /** Optional flag for non-bookable specialists */
  bookingDisabled?: boolean;
  /** Optional Boulevard deep-link params used by "Book with <name>" button */
  bookingUrlParams?: Record<string, string>;
  /** Optional profile / external site link (globe icon) */
  websiteUrl?: string;
}

type SpecialistJson = { specialists: Specialist[] };

const data = raw as SpecialistJson;

export const specialists: Specialist[] = data.specialists;

export const SPECIALIST_FILTERS: { id: SpecialistFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "lash", label: "Lash" },
  { id: "head-spa", label: "Head spa" },
  { id: "pmu", label: "PMU" },
  { id: "esthetician", label: "Esthetician" },
];

export function filterSpecialists(
  list: Specialist[],
  filterId: SpecialistFilterId,
): Specialist[] {
  if (filterId === "all") return list;
  return list.filter((s) => s.specialties.includes(filterId));
}
