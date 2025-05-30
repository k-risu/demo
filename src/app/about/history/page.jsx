import Image from "next/image";
import { HistoryLayout } from "@/styles/about/history/history.styles";

export default function History() {
  return (
    <HistoryLayout>
      <div>
        <h2>Since 2023</h2>
        <ul>
          <li>
            <h3>
              06<span>월</span>
            </h3>
            <div className="flex flex-col">
              <span>•&nbsp; 미용 전문 구인구직 플랫폼 헤어베어 출시</span>
            </div>
          </li>
          <li>
            <h3>
              12<span>월</span>
            </h3>
            <div className="flex flex-col">
              <span>•&nbsp;대학교 업무협약 (MOU) 체결</span>
            </div>
          </li>
        </ul>
      </div>
      <Image
        src="/images/about/history/history_bar.png"
        alt="history"
        width={24}
        height={1627}
      />
      <div>
        <h2>2024</h2>
        <ul>
          <li>
            <h3>
              02<span>월</span>
            </h3>
            <div className="flex flex-col">
              <span>•&nbsp; 미용 전문 구인구직 플랫폼 헤어베어 출시</span>
              <span>•&nbsp; 스케일업(성장지원) 육성 프로그램 사업 선정</span>
            </div>
          </li>
          <li>
            <h3>
              05<span>월</span>
            </h3>
            <div className="flex flex-col">
              <span>•&nbsp;블록체인 기업 맞춤형 지원사업</span>
              <span>
                •&nbsp;2024년 대구 뉴테크 융합지원 창작 플랫폼 구축 사업
              </span>
            </div>
          </li>
          <li>
            <h3>
              06<span>월</span>
            </h3>
            <div className="flex flex-col">
              <span>
                •&nbsp;지자체-대학 협력 기반 지역혁신(RIS) 사업 글로벌 투자유치
                역량강화
              </span>
            </div>
          </li>
          <li>
            <h3>
              07<span>월</span>
            </h3>
            <div className="flex flex-col">
              <span>•&nbsp;대학연계 지역 기업 스케일업 지원 사업 선정</span>
              <span>
                •&nbsp;대한민국 위치정보 우수 비즈니스모델 발굴 공모 지원사업
              </span>
            </div>
          </li>
          <li>
            <h3>
              08<span>월</span>
            </h3>
            <div className="flex flex-col">
              <span>
                •&nbsp;2024년 DASH 입주기업 인증 및 기업 경영 컨설팅 프로그램
              </span>
              <span>•&nbsp;중소기업 기술개발(R&D) 지원사업 “디딤돌”</span>
              <span>•&nbsp;NLP 자연어 기반 채팅 시스템 개발</span>
              <span>•&nbsp;GPS 기반 뷰티맵커 개발</span>
              <span>•&nbsp;NFT 블록체인 기반 민팅페이지 개발</span>
            </div>
          </li>
          <li>
            <h3>
              10<span>월</span>
            </h3>
            <div className="flex flex-col">
              <span>•&nbsp;벤처기업인증서 획득</span>
            </div>
          </li>
          <li>
            <h3>
              11<span>월</span>
            </h3>
            <div className="flex flex-col">
              <span>
                •&nbsp;중소벤처기업부 / 대구창조경제혁신센터 TIPS 개발과제
              </span>
            </div>
          </li>
          <li>
            <h3>
              12<span>월</span>
            </h3>
            <div className="flex flex-col">
              <span>•&nbsp;KNU LINC 가족회사 ICC연계 산학협력기업지원사업</span>
              <span>•&nbsp;데이터 기업 역량 강화 스케일업 지원사업</span>
            </div>
          </li>
        </ul>
      </div>
    </HistoryLayout>
  );
}
