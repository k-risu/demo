// /app/return/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // POST 데이터 파싱
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log("Return Data:", data);

    // 결제 성공 여부 확인
    if (data.resCd === "0000") {
      // 성공 페이지로 리다이렉트
      return NextResponse.redirect(new URL("/success", request.url));
    } else {
      // 실패 페이지로 리다이렉트
      return NextResponse.redirect(new URL("/fail", request.url));
    }
  } catch (error) {
    console.error("Return Error:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}
