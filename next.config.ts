import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

type ImageRemotePatterns = NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
>;

function addImageAndStoragePatterns(
  patterns: ImageRemotePatterns,
  protocol: "http" | "https",
  hostname: string,
  port?: string,
) {
  const base = { protocol, hostname, ...(port ? { port } : {}) };
  patterns.push({ ...base, pathname: "/storage/**" });
  patterns.push({ ...base, pathname: "/images/**" });
}

function imageRemotePatterns(): ImageRemotePatterns {
  const patterns: ImageRemotePatterns = [];

  addImageAndStoragePatterns(patterns, "https", "api.youssef-ali.com");
  addImageAndStoragePatterns(patterns, "http", "127.0.0.1", "8000");
  addImageAndStoragePatterns(patterns, "http", "localhost", "8000");

  const api = process.env.NEXT_PUBLIC_BASE_API_URL;
  if (api) {
    try {
      const u = new URL(api);
      addImageAndStoragePatterns(
        patterns,
        (u.protocol.replace(":", "") as "http" | "https") || "https",
        u.hostname,
        u.port || undefined,
      );
    } catch {}
  }
  return patterns;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageRemotePatterns(),
  },
};

export default withNextIntl(nextConfig);
