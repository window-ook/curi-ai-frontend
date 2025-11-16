import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
  },
  // Docker 배포를 위한 standalone 출력 모드
  output: 'standalone',
};

export default nextConfig;
