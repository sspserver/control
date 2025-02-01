import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/rtb',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
