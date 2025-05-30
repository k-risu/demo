"use client";

import { Suspense } from "react";
import ReturnContent from "./ReturnContent";

export default function ReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">로딩 중...</h1>
            <p>잠시만 기다려주세요.</p>
          </div>
        </div>
      }
    >
      <ReturnContent />
    </Suspense>
  );
}
