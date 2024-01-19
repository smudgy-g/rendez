/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'z6poljjmfw3ya5ct.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
