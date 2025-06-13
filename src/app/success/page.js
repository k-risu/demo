"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    try {
      const shopOrderNo = searchParams.get("shopOrderNo");
      const goodName = searchParams.get("goodName");
      const amount = searchParams.get("amount");

      if (!shopOrderNo || !goodName || !amount) {
        throw new Error("필수 파라미터가 누락되었습니다.");
      }

      // 3초 후 메인 페이지로 리다이렉트
      setTimeout(() => {
        setRedirecting(true);
        router.push("/");
      }, 3000);
    } catch (err) {
      console.error("처리 중 오류 발생:", err);
    } finally {
      setLoading(false);
    }
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">
            결제 결과를 처리중입니다...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[400px] dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-green-500">결제 완료</CardTitle>
          <CardDescription>결제가 성공적으로 완료되었습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">주문번호</p>
            <p className="font-medium">{searchParams.get("shopOrderNo")}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">상품명</p>
            <p className="font-medium">
              {decodeURIComponent(searchParams.get("goodName"))}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">결제금액</p>
            <p className="font-medium">
              {Number(searchParams.get("amount")).toLocaleString()}원
            </p>
          </div>
          {redirecting && (
            <p className="text-sm text-muted-foreground mt-4">
              잠시 후 메인 페이지로 이동합니다...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">로딩중...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
