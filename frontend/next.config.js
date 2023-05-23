/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    nextScriptWorkers: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
