import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "true" ? {
    output: "export",
    distDir: ".next-export",
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
  ...(process.env.MIGRATION_BUILD ? { distDir: ".next-migration-build" } : {}),
};

export default nextConfig;
