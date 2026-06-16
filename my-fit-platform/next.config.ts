import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const isCloudflarePages =
  process.env.CF_PAGES === "1" || process.env.CLOUDFLARE_PAGES === "1";
const basePath = isGithubPages ? "/katya-fit" : "";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
    proxyClientMaxBodySize: "50mb",
  },
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: isGithubPages,
  },
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? basePath : undefined,
  assetPrefix: isGithubPages ? `${basePath}/` : undefined,
  trailingSlash: isGithubPages,
  images: {
    unoptimized: isGithubPages || isCloudflarePages,
  },
  async redirects() {
    if (isGithubPages) return [];
    return [
      { source: "/home-to-gym", destination: "/dom-v-zal", permanent: true },
      { source: "/coaching", destination: "/online", permanent: true },
      { source: "/about", destination: "/#my-story", permanent: false },
      { source: "/workouts", destination: "/#programs", permanent: false },
      { source: "/results", destination: "/#results", permanent: false },
      { source: "/pricing", destination: "/#pricing", permanent: false },
    ];
  },
};

export default nextConfig;
