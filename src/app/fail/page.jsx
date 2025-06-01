export default function FailPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-600">결제 실패</h1>
      <p className="mt-4">결제 처리 중 문제가 발생했습니다.</p>
      <a href="/" className="mt-4 inline-block text-blue-500 hover:underline">
        홈으로 돌아가기
      </a>
    </div>
  );
}
