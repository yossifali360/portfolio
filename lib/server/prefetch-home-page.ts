import type { QueryClient } from "@tanstack/react-query";
import { homeDataQueryOptions } from "@/lib/queries";

export async function prefetchHomePageData(
  queryClient: QueryClient,
  locale: string,
): Promise<void> {
  try {
    await queryClient.prefetchQuery(homeDataQueryOptions(locale));
  } catch {
    console.error("Error prefetching home page data");
  }
}
