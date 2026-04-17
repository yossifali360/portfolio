import { prefetchHomePageData } from "@/lib/server/prefetch-home-page";
import { createServerQueryClient } from "@/lib/server/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import HomePageComponents from "../components/pages/homePageComponents/HomePageComponents";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const queryClient = createServerQueryClient();
  await prefetchHomePageData(queryClient, locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePageComponents />
    </HydrationBoundary>
  );
}
