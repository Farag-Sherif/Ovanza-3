import { useQuery } from "@tanstack/react-query";
import { getItemById } from "../../services/productsService";

export const PRODUCT_DETAIL_KEY = (id) => ["product", id];

export function useProductDetailsQuery(id, options = {}) {
  return useQuery({
    queryKey: PRODUCT_DETAIL_KEY(id),
    queryFn: () => getItemById(id),
    enabled: Boolean(id),
    ...options,
  });
}
