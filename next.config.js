/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['cashfree-pg'],
  },
}

module.exports = nextConfig
