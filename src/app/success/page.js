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
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const processPayment = async () => {
      try {
        const shopOrderNo = searchParams.get("shopOrderNo");
        const authorizationId = searchParams.get("authorizationId");

        if (!shopOrderNo || !authorizationId) {
          setError("주문번호 또는 인증번호가 없습니다.");
          setLoading(false);
          return;
        }

        // 결제 승인 요청
        const approvalResponse = await fetch("/api/payment/approve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mallId: "T0021312",
            shopTransactionId: shopOrderNo,
            authorizationId: authorizationId,
            shopOrderNo: shopOrderNo,
            approvalReqDate: new Date()
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, ""),
          }),
        });

        const approvalResult = await approvalResponse.json();
        console.log("결제 승인 결과:", approvalResult);

        if (approvalResult.resCd === "0000") {
          // 승인 성공 시 주문 정보 조회
          const orderResponse = await fetch(
            `/api/return?shopOrderNo=${shopOrderNo}`
          );
          const orderData = await orderResponse.json();

          if (!orderResponse.ok) {
            throw new Error(
              orderData.error || "주문 정보를 가져오는데 실패했습니다."
            );
          }

          setOrder(orderData.order);

          // 3초 후 메인 페이지로 리다이렉트
          setTimeout(() => {
            setRedirecting(true);
            router.push("/");
          }, 3000);
        } else {
          throw new Error(approvalResult.resMsg || "결제 승인에 실패했습니다.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    processPayment();
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

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Card className="w-[400px] dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-red-500">결제 오류</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Card className="w-[400px] dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-500">알림</CardTitle>
            <CardDescription>주문 정보를 찾을 수 없습니다.</CardDescription>
          </CardHeader>
        </Card>
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
            <p className="font-medium">{order.orderNumber}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">상품명</p>
            <p className="font-medium">{order.productName}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">결제금액</p>
            <p className="font-medium">
              {order.totalAmount.toLocaleString()}원
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
