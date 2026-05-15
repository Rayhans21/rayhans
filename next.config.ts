import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_VSUPABASE_URL: process.env.VSUPABASE_URL,
    NEXT_PUBLIC_VSUPABASE_ANON_KEY: process.env.VSUPABASE_ANON_KEY,
    NEXT_PUBLIC_VERIFY_BASE_URL: process.env.NEXT_PUBLIC_VERIFY_BASE_URL,
  },
  async redirects() {
    return [
      {
        source: '/verify/verify',
        destination: '/verify',
        permanent: false,
      },
      {
        source: '/verify/verify/:id',
        destination: '/verify/:id',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
