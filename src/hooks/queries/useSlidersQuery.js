import { useQuery } from "@tanstack/react-query";
import { getSliders } from "../../services/slidersService";

export const SLIDERS_QUERY_KEY = ["sliders"];

export function useSlidersQuery(options = {}) {
  return useQuery({
    queryKey: SLIDERS_QUERY_KEY,
    queryFn: getSliders,
    ...options,
  });
}
