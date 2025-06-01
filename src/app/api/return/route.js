import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 동적 라우트 설정
export const revalidate = 0; // 캐시 비활성화

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    return NextResponse.redirect(
      `/return/result?${new URLSearchParams(data).toString()}`,
    );
  } catch (error) {
    console.error("Error processing return:", error);
    return NextResponse.redirect("/return/error");
  }
}

export async function GET() {
  return NextResponse.next();
}
