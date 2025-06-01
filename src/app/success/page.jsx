import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-600">결제 성공</h1>
      <p className="mt-4">결제가 성공적으로 완료되었습니다.</p>
      <Link
        href="/"
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
