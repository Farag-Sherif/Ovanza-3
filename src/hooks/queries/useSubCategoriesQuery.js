import { useQuery } from "@tanstack/react-query";
import { getSubCategories, findSubCategoryByCategoryId } from "../../services/productsService";

export const SUB_CATEGORIES_QUERY_KEY = ["subCategories"];
export const SUB_CATEGORIES_BY_CAT_KEY = (categoryId) => ["subCategories", "byCategory", categoryId];

export function useSubCategoriesQuery(options = {}) {
  return useQuery({
    queryKey: SUB_CATEGORIES_QUERY_KEY,
    queryFn: getSubCategories,
    ...options,
  });
}

export function useSubCategoriesByCategoryQuery(categoryId, options = {}) {
  return useQuery({
    queryKey: SUB_CATEGORIES_BY_CAT_KEY(categoryId),
    queryFn: () => findSubCategoryByCategoryId(categoryId),
    enabled: Boolean(categoryId),
    ...options,
  });
}
