/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; connect-src 'self' https://testpgapi.easypay.co.kr https://testsp.easypay.co.kr https://testpg.easypay.co.kr https://testapi.easypay.co.kr; frame-src 'self' https://testpg.easypay.co.kr https://testsp.easypay.co.kr",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
