import { buildServiceCategories } from "./services-from-json";
import type { ServiceCategory } from "./service-types";

export type { ServiceCategory } from "./service-types";
export {
  getCategoryBottomCta,
  getCategoryDetail,
  getCategoryPageCopy,
} from "./services-from-json";
export type {
  CategoryBottomCtaCopy,
  CategoryDetailFromJson,
  CategoryPageCopy,
} from "./services-from-json";

export const serviceCategories: ServiceCategory[] = buildServiceCategories();
