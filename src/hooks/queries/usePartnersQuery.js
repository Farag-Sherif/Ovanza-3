import { useQuery } from "@tanstack/react-query";
import { getPartners } from "../../services/partnersService";

export const PARTNERS_QUERY_KEY = ["partners"];

export function usePartnersQuery(options = {}) {
  return useQuery({
    queryKey: PARTNERS_QUERY_KEY,
    queryFn: getPartners,
    ...options,
  });
}
