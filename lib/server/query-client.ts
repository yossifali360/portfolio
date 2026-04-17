import { QueryClient } from "@tanstack/react-query";
import { queryDefaults } from "@/lib/query-config";

export function createServerQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        ...queryDefaults,
        retry: false,
      },
    },
  });
}
