import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../../services/blogsService";

export const BLOG_DETAIL_KEY = (id) => ["blog", id];

export function useBlogDetailsQuery(id, options = {}) {
  return useQuery({
    queryKey: BLOG_DETAIL_KEY(id),
    queryFn: () => getBlogById(id),
    enabled: Boolean(id),
    ...options,
  });
}
