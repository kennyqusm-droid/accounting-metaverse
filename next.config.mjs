/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Allows Supabase storage images
      },
      {
        protocol: 'https',
        hostname: '*.r2.dev', // Allows Cloudflare R2 images
      }
    ],
  },
};

export default nextConfig;