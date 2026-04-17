import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

type ImageRemotePatterns = NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
>;

function storageRemotePatterns(): ImageRemotePatterns {
  const patterns: ImageRemotePatterns = [];
  function addHost(
    protocol: "http" | "https",
    hostname: string,
    port?: string,
  ) {
    const base = { protocol, hostname, ...(port ? { port } : {}) };
    patterns.push({ ...base, pathname: "/storage/**" });
  }
  addHost("https", "api.youssef-ali.com");
  addHost("http", "127.0.0.1", "8000");
  addHost("http", "localhost", "8000");
  const api = process.env.NEXT_PUBLIC_BASE_API_URL;
  if (api) {
    try {
      const u = new URL(api);
      addHost(
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
    remotePatterns: storageRemotePatterns(),
  },
};

export default withNextIntl(nextConfig);
