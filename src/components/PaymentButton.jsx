// 결제 버튼 컴포넌트 2025.05.30
"use client";

import { useCallback } from "react";
import axios from "axios";

// API 클라이언트 설정
const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default function PaymentButton() {
  const handlePayment = useCallback(async () => {
    try {
      const { data: registerData } = await apiClient.post(
        "/api/easypay/register",
      );
      console.log("Response:", registerData);

      if (registerData.resCd === "0000" && registerData.authPageUrl) {
        // URL이 유효한지 확인
        try {
          new URL(registerData.authPageUrl);
          window.location.href = registerData.authPageUrl;
        } catch {
          console.error("Invalid URL:", registerData.authPageUrl);
          alert("유효하지 않은 결제창 URL입니다.");
        }
      } else {
        console.error("결제창 호출 실패:", registerData.resMsg);
        alert(
          "결제창 호출 실패: " +
            (registerData.resMsg || "알 수 없는 오류가 발생했습니다"),
        );
      }
    } catch (err) {
      console.error("네트워크 또는 기타 오류:", err);
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
