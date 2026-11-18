import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images in /public are already sized + WebP, so serve them as-is (same as the original site)
  images: { unoptimized: true },
};

export default nextConfig;
