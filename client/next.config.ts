import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'], // 👈 allow backend images
  },
};

export default nextConfig;
