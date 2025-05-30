import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request) {
  // VERCEL_URL 환경변수 사용
  const origin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : request.headers.get("origin") || "*";

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST() {
  return NextResponse.next();
}

export async function OPTIONS(request) {
  const origin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : request.headers.get("origin") || "*";

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
