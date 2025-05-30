import ReturnResult from "./ReturnResult";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ReturnPage({ searchParams }) {
  const params = await Promise.resolve(searchParams);
  const authorizationId = params?.authorizationId;
  const payMethodTypeCode = params?.payMethodTypeCode;

  if (!authorizationId || !payMethodTypeCode) {
    return (
      <div style={{ padding: 20 }}>
        <h2>결제 오류</h2>
        <p style={{ color: "red" }}>필수 인증 정보가 누락되었습니다.</p>
      </div>
    );
  }

  try {
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
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.resCd !== "0000") {
      return (
        <div style={{ padding: 20 }}>
          <h2>결제 오류</h2>
          <p style={{ color: "red" }}>{data.resMsg}</p>
        </div>
      );
    }

    return (
      <ReturnResult
        authorizationId={authorizationId}
        payMethodTypeCode={payMethodTypeCode}
        paymentResult={data}
      />
    );
  } catch (error) {
    console.error("Payment result error:", error);
    return (
      <div style={{ padding: 20 }}>
        <h2>결제 오류</h2>
        <p style={{ color: "red" }}>결제 결과 조회 중 오류가 발생했습니다.</p>
      </div>
    );
  }
}
