"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReturnPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // 브라우저에서만 실행
    if (typeof window === "undefined") return;

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const result = Object.fromEntries(searchParams.entries());
      console.log("Payment Result:", result);

      setPaymentResult(result);
      setIsLoading(false);
    } catch (err) {
      console.error("Error processing URL:", err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  // 서버 사이드 렌더링 시 기본 로딩 상태 반환
  if (typeof window === "undefined") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">로딩 중...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            오류가 발생했습니다
          </h1>
          <p className="mt-2">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">로딩 중...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">결제 처리 결과</h1>
        {paymentResult && (
          <div className="space-y-4">
            <div
              className={`p-4 rounded ${
                paymentResult.resCd === "0000" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <h2 className="font-bold">
                {paymentResult.resCd === "0000" ? "결제 성공" : "결제 실패"}
              </h2>
              <p>{paymentResult.resMsg}</p>
            </div>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {JSON.stringify(paymentResult, null, 2)}
            </pre>
            <button
              onClick={() => router.push("/")}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              홈으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
