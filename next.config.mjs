/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        pathname: '**',
      },
    ],
  },
  typescript: {
    // Ignore type errors in production build for faster deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors in production build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
