/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  publicRuntimeConfig: {
    BASE_PATH: '',
    HSR_URL: process.env.HSR_URL,
  },
  images: {
    domains: ['enka.network'],
  },
}

module.exports = nextConfig
