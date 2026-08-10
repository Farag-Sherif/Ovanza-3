import { useQuery } from "@tanstack/react-query";
import { getCategories, findCategoryById } from "../../services/productsService";

export const CATEGORIES_QUERY_KEY = ["categories"];
export const CATEGORY_DETAIL_KEY = (id) => ["category", id];

export function useCategoriesQuery(options = {}) {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: getCategories,
    ...options,
  });
}

export function useCategoryDetailQuery(id, options = {}) {
  return useQuery({
    queryKey: CATEGORY_DETAIL_KEY(id),
    queryFn: () => findCategoryById(id),
    enabled: Boolean(id),
    ...options,
  });
}
