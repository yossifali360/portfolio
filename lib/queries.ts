import { queryOptions } from "@tanstack/react-query";
import { fetchHomeData } from "@/lib/api";

export const queryKeys = {
  home: (locale: string) => ["home", locale] as const,
};

export const homeDataQueryOptions = (locale: string) =>
  queryOptions({
    queryKey: queryKeys.home(locale),
    queryFn: () => fetchHomeData(undefined, locale),
  });
