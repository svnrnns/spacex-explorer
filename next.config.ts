import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  /**
   * Forces blocking metadata for all requests. Uses RegExp * to
   * match all user agents and ensure type safety.
   * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#streaming-metadata
   */
  htmlLimitedBots: /.*/, // Use a RegExp literal
};

export default nextConfig;
