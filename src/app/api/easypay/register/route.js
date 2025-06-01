import https from "https";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 동적 라우트 설정
export const revalidate = 0; // 캐시 비활성화

export async function POST() {
  try {
    // 현재 시간을 이용한 주문번호 생성 (YYYYMMDDHHMMSS + 랜덤숫자)
    const now = new Date();
    const orderNo = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}${Math.floor(Math.random() * 1000)}`;

    const requestData = {
      mallId: "T0021306", // 테스트 상점 ID
      payMethodTypeCode: "11", // 신용카드
      currency: "00", // 원화
      amount: 1000, // 결제 금액
      clientTypeCode: "00", // 통합형
      returnUrl: "https://demo-two-blue.vercel.app/api/return", // returnUrl을 API 라우트로 변경

      deviceTypeCode: "pc",
      shopOrderNo: orderNo,
      langFlag: "KOR", // 언어 설정 추가
      orderInfo: {
        goodsName: "테스트 상품",
        customerInfo: {
          customerName: "테스트",
          customerEmail: "test@test.com",
          customerMobile: "01012341234", // 고객 연락처 추가
        },
      },
      taxInfo: {
        // 과세 정보 추가
        taxAmount: 909,
        vatAmount: 91,
        freeAmount: 0,
      },
    };

    console.log("Request payload:", requestData);

    const agent = new https.Agent({
      rejectUnauthorized: false, // SSL 인증서 검증 비활성화
    });

    const response = await fetch(
      "https://testpgapi.easypay.co.kr/api/ep9/trades/webpay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${Buffer.from("DEMO0001").toString("base64")}`,
        },
        body: JSON.stringify(requestData),
        agent: agent,
        cache: "no-store", // fetch 요청에 대한 캐시 비활성화
      },
    );

    if (!response.ok) {
      console.error("API Error:", {
        status: response.status,
        statusText: response.statusText,
      });
      const text = await response.text();
      console.error("Error response body:", text);
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log("API Response:", data);

    // authPageUrl이 없는 경우 에러 처리
    if (!data.authPageUrl) {
      console.error("No authPageUrl in response:", data);
      throw new Error("결제창 URL을 받지 못했습니다");
    }

    // URL 유효성 검사
    try {
      new URL(data.authPageUrl);
    } catch {
      throw new Error("유효하지 않은 결제창 URL입니다");
    }

    return NextResponse.json(
      {
        resCd: data.resCd || "0000",
        resMsg: data.resMsg || "성공",
        authPageUrl: data.authPageUrl,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate", // 응답 캐시 비활성화
        },
      },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        resCd: "9999",
        resMsg: `서버 오류가 발생했습니다: ${error.message}`,
        authPageUrl: null,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  }
}
