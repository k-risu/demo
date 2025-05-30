import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { authorizationId, payMethodTypeCode } = body;

    if (!authorizationId || !payMethodTypeCode) {
      return NextResponse.json(
        { error: "필수 인증 정보가 누락되었습니다." },
        { status: 400 },
      );
    }

    const headersList = headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const returnUrl = `${protocol}://${host}/return`;

    const response = await fetch(
      "https://testpgapi.easypay.co.kr/api/ep9/trades/result",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization:
            "Basic " +
            Buffer.from("T0021306:easypay!KICCTEST").toString("base64"),
        },
        body: JSON.stringify({
          mallId: "T0021306",
          authorizationId,
          payMethodTypeCode,
          returnUrl,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.resCd !== "0000") {
      return NextResponse.json({ error: data.resMsg }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Payment result error:", error);
    return NextResponse.json(
      { error: "결제 결과 조회 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
