import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/settingsService";

export const SETTINGS_QUERY_KEY = ["settings"];

export function useSettingsQuery(options = {}) {
  return useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: getSettings,
    ...options,
  });
}
