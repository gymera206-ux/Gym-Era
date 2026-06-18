import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/shop',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
