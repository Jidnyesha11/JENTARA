import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "th.bing.com",
      },
      {
        protocol: "https",
        hostname:
          "byqfrpzoiwgdkrbwgais.supabase.co",
      },
    ],
  },
};

export default nextConfig;