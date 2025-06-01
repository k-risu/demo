"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [result, setResult] = useState({
    resCd: "",
    resMsg: "",
    authorizationId: "",
  });

  useEffect(() => {
    const resCd = document.getElementById("resCd")?.textContent || "";
    const resMsg = document.getElementById("resMsg")?.textContent || "";
    const authorizationId =
      document.getElementById("authorizationId")?.textContent || "";

    setResult({ resCd, resMsg, authorizationId });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">결제 결과</h1>
      <p>결제 코드: {result.resCd}</p>
      <p>메시지: {result.resMsg}</p>
      <p>승인 ID: {result.authorizationId}</p>
    </div>
  );
}
