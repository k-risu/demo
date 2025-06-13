"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { paymentService } from "@/services/paymentService";
import { useState, useEffect, Suspense } from "react";
import { QRCodeCanvas } from "qrcode.react";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuthCheck();
  const [isProcessing, setIsProcessing] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [currentOrderNo, setCurrentOrderNo] = useState("");

  // 결제 완료 후 리다이렉트 처리
  useEffect(() => {
    const orderNo = searchParams.get("shopOrderNo");
    const authorizationId = searchParams.get("authorizationId");

    if (orderNo && authorizationId) {
      router.push(
        `/success?shopOrderNo=${orderNo}&authorizationId=${authorizationId}`
      );
    }
  }, [searchParams, router]);

  const handlePayment = async (plan) => {
    try {
      setIsProcessing(true);

      const orderNo = `ORDER_${Date.now()}`;
      setCurrentOrderNo(orderNo);

      const orderData = {
        shopOrderNo: orderNo,
        amount: plan.amount,
        goodsName: plan.name,
        customerName: "고객명",
        customerMail: "customer@example.com",
        customerContactNo: "010-0000-0000",
      };

      const result = await paymentService.processPayment(orderData);

      if (result.success) {
        setQrValue(result.authPageUrl);
      }
    } catch (error) {
      alert(error.message || "결제 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  const plans = [
    {
      name: "희망 플랜 (1개월)",
      description: "저렴한 가격으로 초기 플랜 선택",
      amount: 1000,
      duration: "1개월",
    },
    {
      name: "희망 플랜 (6개월)",
      description: "저렴한 가격으로 초기 플랜 선택",
      amount: 5000,
      duration: "6개월",
    },
    {
      name: "희망 플랜 (12개월)",
      description: "저렴한 가격으로 초기 플랜 선택",
      amount: 10000,
      duration: "12개월",
    },
  ];

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">결제 플랜</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.duration}
            className="dark:bg-gray-700 dark:shadow-md dark:shadow-black/20 dark:rounded-xl"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                {plan.name}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {plan.amount.toLocaleString()}원
              </p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button
                className="hover:bg-gray-500 w-full"
                onClick={() => handlePayment(plan)}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    처리 중...
                  </>
                ) : (
                  "결제 진행"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {qrValue && (
        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <QRCodeCanvas
              value={qrValue}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            QR 코드를 스캔하여 결제를 진행해주세요
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            결제 완료 후 자동으로 결과 페이지로 이동합니다
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setQrValue("");
              setCurrentOrderNo("");
            }}
          >
            QR 코드 닫기
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Payment() {
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
      <PaymentContent />
    </Suspense>
  );
}
