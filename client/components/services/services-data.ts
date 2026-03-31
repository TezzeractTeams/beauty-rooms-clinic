import { buildServiceCategories } from "./services-from-json";
import type { ServiceCategory } from "./service-types";

export type { ServiceCategory } from "./service-types";
export { getCategoryBottomCta, getCategoryDetail } from "./services-from-json";
export type { CategoryBottomCtaCopy, CategoryDetailFromJson } from "./services-from-json";

export const serviceCategories: ServiceCategory[] = buildServiceCategories();
