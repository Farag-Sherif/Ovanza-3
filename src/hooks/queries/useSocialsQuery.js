import { useQuery } from "@tanstack/react-query";
import { getSocials } from "../../services/socialsService";

export const SOCIALS_QUERY_KEY = ["socials"];

export function useSocialsQuery(options = {}) {
  return useQuery({
    queryKey: SOCIALS_QUERY_KEY,
    queryFn: getSocials,
    ...options,
  });
}
