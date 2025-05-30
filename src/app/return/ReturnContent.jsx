"use client";

import { useSearchParams } from "next/navigation";

export default function ReturnContent() {
  const searchParams = useSearchParams();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">결제 처리 중</h1>
        <p>결제 결과를 확인하고 있습니다.</p>
        <pre className="mt-4 text-left bg-gray-100 p-4 rounded">
          {JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}
        </pre>
      </div>
    </div>
  );
}
