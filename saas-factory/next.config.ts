import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  experimental: {
    mcpServer: true,
  },
}

export default nextConfig
