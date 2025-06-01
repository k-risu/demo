import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-600">시스템 오류</h1>
      <p className="mt-4">처리 중 시스템 오류가 발생했습니다.</p>
      <Link
        href="/"
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
