import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const returnUrl = `${protocol}://${host}/return`;

    return NextResponse.json({ returnUrl });
  } catch (error) {
    console.error("Return URL generation error:", error);
    return NextResponse.json(
      { error: "Return URL 생성 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
