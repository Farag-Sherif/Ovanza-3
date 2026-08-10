import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../services/blogsService";

export const BLOGS_QUERY_KEY = ["blogs"];

export function useBlogsQuery(options = {}) {
  return useQuery({
    queryKey: BLOGS_QUERY_KEY,
    queryFn: getBlogs,
    ...options,
  });
}
