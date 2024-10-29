import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "media.cnn.com",
        port: '',
        pathname: '/api/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
