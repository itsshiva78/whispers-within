/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking — your site cannot be embedded in iframes
          { key: 'X-Frame-Options', value: 'DENY' },
          // Stop MIME-type sniffing attacks
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Control referrer information leakage
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Force HTTPS for 1 year (Vercel already enforces, but belt & suspenders)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          // Legacy XSS filter for older browsers
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Restrict powerful browser features
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          // Strict Content-Security-Policy header
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https:;" },
        ],
      },
    ];
  },
}

module.exports = nextConfig
