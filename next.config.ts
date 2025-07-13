import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
    ignoreDuringBuilds: true,
  },
   images: {
    domains: ['cdn.dummyjson.com'],
  },
};

export default nextConfig;
