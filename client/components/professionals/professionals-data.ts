import raw from "@/data/professionals.json";

export type ProfessionalFilterId = "all" | "lash" | "head-spa" | "pmu" | "esthetician";

export type ProfessionalSpecialty = Exclude<ProfessionalFilterId, "all">;

export interface Professional {
  id: string;
  name: string;
  title: string;
  rating: number;
  /** Slugs used for filter matching (see `PROFESSIONAL_FILTERS`) */
  specialties: ProfessionalSpecialty[];
  /** Short labels shown as pills on the card */
  tags: string[];
  description: string;
  certification: string;
  imageSrc: string;
  imageAlt: string;
  /** Optional override for the primary CTA text */
  ctaLabel?: string;
  /** Optional flag for non-bookable professionals */
  bookingDisabled?: boolean;
  /** Optional Boulevard deep-link params (legacy; prefer `bookingCategory` for `/booking`). */
  bookingUrlParams?: Record<string, string>;
  /** Optional booking flow category id (URL `?category=…` on `/booking`). */
  bookingCategory?: string;
  /** Optional profile / external site link (globe icon) */
  websiteUrl?: string;
}

type ProfessionalsJson = { professionals: Professional[] };

const data = raw as ProfessionalsJson;

export const professionals: Professional[] = data.professionals;

export const PROFESSIONAL_FILTERS: { id: ProfessionalFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "lash", label: "Lash" },
  { id: "head-spa", label: "Head spa" },
  { id: "pmu", label: "PMU" },
  { id: "esthetician", label: "Esthetician" },
];

export function filterProfessionals(
  list: Professional[],
  filterId: ProfessionalFilterId,
): Professional[] {
  if (filterId === "all") return list;
  return list.filter((s) => s.specialties.includes(filterId));
}
