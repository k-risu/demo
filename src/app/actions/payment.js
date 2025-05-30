"use server";

export async function getPaymentResult(authorizationId, payMethodTypeCode) {
  try {
    const apiUrl = new URL(
      "https://testpgapi.easypay.co.kr/api/ep9/trades/result",
    );

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from("T0021306:easypay!KICCTEST").toString("base64"),
      },
      body: JSON.stringify({
        mallId: "T0021306",
        authorizationId,
        payMethodTypeCode,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("API 호출 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Payment result error:", error);
    throw new Error("결제 결과 조회 중 오류가 발생했습니다.");
  }
}
