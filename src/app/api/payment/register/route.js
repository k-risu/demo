import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // 필수 파라미터 검증
    const requiredFields = [
      "shopOrderNo",
      "amount",
      "payMethodTypeCode",
      "currency",
      "returnUrl",
      "deviceTypeCode",
      "clientTypeCode",
      "orderInfo",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field}는 필수 항목입니다.` },
          { status: 400 },
        );
      }
    }

    // EasyPay API 호출
    const response = await fetch(
      "https://testpgapi.easypay.co.kr/api/ep9/trades/webpay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from("T0021306:easypay!KICCTEST").toString("base64"),
        },
        body: JSON.stringify({
          mallId: "T0021306", // 발급받은 테스트 MID
          shopOrderNo: body.shopOrderNo,
          amount: body.amount,
          payMethodTypeCode: body.payMethodTypeCode,
          currency: body.currency,
          returnUrl: body.returnUrl,
          deviceTypeCode: body.deviceTypeCode,
          clientTypeCode: body.clientTypeCode,
          orderInfo: body.orderInfo,
          // 선택적 파라미터들
          langFlag: body.langFlag || "KOR",
          payMethodInfo: body.payMethodInfo,
          taxInfo: body.taxInfo,
          shopValueInfo: body.shopValueInfo,
        }),
      },
    );

    const data = await response.json();

    if (data.resCd !== "0000") {
      return NextResponse.json({ error: data.resMsg }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      authPageUrl: data.authPageUrl,
    });
  } catch (error) {
    console.error("Payment registration error:", error);
    return NextResponse.json(
      { error: "결제 등록 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
