/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['r2.flowith.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r2.flowith.net',
        port: '',
        pathname: '/files/**',
      },
    ],
  },
};

export default nextConfig; 