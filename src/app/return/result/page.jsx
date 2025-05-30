"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentResult, setPaymentResult] = useState(null);

  useEffect(() => {
    if (searchParams) {
      const result = Object.fromEntries(searchParams.entries());
      setPaymentResult(result);
    }
  }, [searchParams]);

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
