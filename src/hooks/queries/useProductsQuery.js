import { useQuery } from "@tanstack/react-query";
import { getItems, getItemsBySubCategory } from "../../services/productsService";

export const PRODUCTS_QUERY_KEY = ["products"];
export const PRODUCTS_BY_SUB_CATEGORY_KEY = (subCategoryId) => ["products", "subCategory", subCategoryId];

export function useProductsQuery(options = {}) {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: getItems,
    ...options,
  });
}

export function useProductsBySubCategoryQuery(subCategoryId, options = {}) {
  return useQuery({
    queryKey: PRODUCTS_BY_SUB_CATEGORY_KEY(subCategoryId),
    queryFn: () => getItemsBySubCategory(subCategoryId),
    enabled: Boolean(subCategoryId),
    ...options,
  });
}
