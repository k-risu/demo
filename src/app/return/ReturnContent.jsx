"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ReturnContent() {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    try {
      // 결제 결과 처리
      const result = searchParams.get("result");
      const message = searchParams.get("message");

      if (result === "success") {
        alert("결제가 성공적으로 완료되었습니다.");
      } else {
        alert(
          `결제 처리 중 오류가 발생했습니다: ${message || "알 수 없는 오류"}`,
        );
      }

      // 부모 창에 결제 완료 메시지 전송
      if (window.opener) {
        window.opener.postMessage("payment_complete", "*");
      }
    } catch (error) {
      console.error("결제 처리 중 오류:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [searchParams]);

  // URL이 유효하지 않을 때의 처리
  if (!searchParams) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">잘못된 접근</h1>
          <p>올바른 결제 경로로 접근해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          {isProcessing ? "결제 처리 중..." : "결제 처리 완료"}
        </h1>
        <p>{isProcessing ? "잠시만 기다려주세요." : "창을 닫아주세요."}</p>
      </div>
    </div>
  );
}
