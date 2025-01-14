/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.gstatic.com', 'utfs.io', 'img.clerk.com'],
  },
  env: {
    NEXT_PUBLIC_COOK_SERVICE_GRPC_ENDPOINT:
      process.env.NEXT_PUBLIC_COOK_SERVICE_GRPC_ENDPOINT,
  },
}

export default nextConfig
