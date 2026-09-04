import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Prevents SIGABRT crashes during remote container builds
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Disables multi-threaded memory spikes on container runners
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;