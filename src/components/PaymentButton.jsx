// 결제 버튼 컴포넌트 2025.05.30
"use client";

import { useCallback } from "react";

export default function PaymentButton() {
  const handlePayment = useCallback(async () => {
    const payload = {
      mallId: "T0021306",
      payMethodTypeCode: "11", // 신용카드
      currency: "00", // 원화
      amount: 1000,
      clientTypeCode: "00", // 통합형
      returnUrl: "https://demo-two-blue.vercel.app/return",
      deviceTypeCode: "pc",
      shopOrderNo: 202505301032,
      orderInfo: {
        goodsName: "테스트상품",
        customerInfo: {
          customerId: "test123",
          customerName: "테스트",
          customerMail: "test@example.com",
          customerContactNo: "01012345678",
        },
      },
    };

    try {
      const response = await fetch(
        "https://testpgapi.easypay.co.kr/api/ep9/trades/webpay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("거래 등록 응답:", result);

      if (result.resCd === "0000" && result.authPageUrl) {
        // 새 창으로 결제 페이지 열기
        const paymentWindow = window.open(
          result.authPageUrl,
          "payment",
          "width=800,height=600",
        );

        if (!paymentWindow) {
          throw new Error("팝업이 차단되었습니다. 팝업 차단을 해제해주세요.");
        }

        // 결제 창이 닫힐 때 이벤트 처리
        const checkWindow = setInterval(() => {
          if (paymentWindow.closed) {
            clearInterval(checkWindow);
            window.location.href = "/return";
          }
        }, 1000);

        // 부모 창에서 결제 완료 메시지 수신
        window.addEventListener("message", event => {
          if (event.data === "payment_complete") {
            if (paymentWindow) {
              paymentWindow.close();
            }
            window.location.href = "/return";
          }
        });
      } else {
        alert("결제 요청 실패: " + (result.resMsg || "알 수 없는 오류"));
      }
    } catch (err) {
      console.error("결제 요청 중 오류:", err);
      alert(`결제 요청 중 오류가 발생했습니다: ${err.message}`);
    }
  }, []);

  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      결제하기
    </button>
  );
}
