// 결제 승인 처리 2025.05.28
"use client";

import { useEffect, useState } from "react";

export default function ReturnResult({ authorizationId, payMethodTypeCode }) {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 거래 상태 조회 함수
  const checkTransactionStatus = async (shopTransactionId, transactionDate) => {
    try {
      const response = await fetch(
        "https://testpgapi.easypay.co.kr/api/ep9/trades/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mallId: "T0021293",
            shopTransactionId,
            transactionDate,
          }),
        },
      );

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("거래 상태 조회 중 오류:", err);
      return null;
    }
  };

  useEffect(() => {
    const handleApproval = async () => {
      // URL 파라미터 검증
      if (!authorizationId || !payMethodTypeCode) {
        setError("필수 인증 정보가 누락되었습니다.");
        setIsLoading(false);
        return;
      }

      try {
        const today = new Date();
        const approvalReqDate = today
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "");
        const shopTransactionId = today
          .toISOString()
          .slice(0, 19)
          .replace(/[-:]/g, "");

        const payload = {
          mallId: "T0021293",
          shopTransactionId,
          authorizationId,
          payMethodTypeCode,
          shopOrderNo: "1", // 결제 등록 시 사용한 주문번호
          approvalReqDate,
        };

        const response = await fetch(
          "https://testpgapi.easypay.co.kr/api/ep9/trades/approval",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );

        const result = await response.json();
        console.log("승인 응답:", result);

        if (result.resCd === "0000") {
          setResult(result);
          // 부모 창에 메시지 전송
          if (window.opener) {
            window.opener.postMessage("payment_complete", "*");
            // 약간의 지연 후 창 닫기
            setTimeout(() => {
              window.close();
            }, 1000);
          }
        } else {
          // 승인 실패 시 거래 상태 조회
          const statusResult = await checkTransactionStatus(
            shopTransactionId,
            approvalReqDate,
          );

          if (statusResult && statusResult.resCd === "0000") {
            setResult(statusResult);
          } else {
            setError(result.resMsg || "승인 처리 중 오류가 발생했습니다.");
          }
        }
      } catch (err) {
        console.error("승인 요청 중 오류:", err);
        setError("승인 요청 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    handleApproval();
  }, [authorizationId, payMethodTypeCode]);

  if (isLoading) {
    return (
      <div style={{ padding: 20 }}>
        <h2>결제 승인 처리 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h2>결제 오류</h2>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>결제 결과</h2>
      {result && (
        <>
          <p>
            <strong>결과 코드:</strong> {result.resCd}
          </p>
          <p>
            <strong>결과 메시지:</strong> {result.resMsg}
          </p>
          <p>
            <strong>PG 거래번호:</strong> {result.pgCno}
          </p>
          <p>
            <strong>결제 금액:</strong> {result.amount?.toLocaleString()}원
          </p>
          <p>
            <strong>거래 일시:</strong> {result.transactionDate}
          </p>
          {result.paymentInfo?.cardInfo && (
            <>
              <h3>카드 정보</h3>
              <p>
                <strong>카드번호:</strong> {result.paymentInfo.cardInfo.cardNo}
              </p>
              <p>
                <strong>발급사:</strong>{" "}
                {result.paymentInfo.cardInfo.issuerName}
              </p>
              <p>
                <strong>할부:</strong>{" "}
                {result.paymentInfo.cardInfo.installmentMonth}개월
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}
