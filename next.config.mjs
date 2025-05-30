/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // 모든 API 라우트에 대해 적용
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : "*",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
      {
        // return 페이지에 대해 적용
        source: "/return", // :path* 와일드카드 제거
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : "*",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV,
  },
};

export default nextConfig;
