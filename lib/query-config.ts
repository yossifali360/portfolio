/** Shared TanStack Query tuning — keep server + client aligned. */
export const STALE_TIME_MS = 60_000;

export const queryDefaults = {
  staleTime: STALE_TIME_MS,
  refetchOnWindowFocus: false,
} as const;
