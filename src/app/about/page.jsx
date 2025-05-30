import Image from "next/image";
import {
  BlueSection,
  ContentBlock,
  ContentCompany,
  ContentSection,
  ContentWrapper,
  FirstTitle,
  NoSelectWrapper,
  SecondTitle,
} from "@/styles/about/about.styles";

export default function About() {
  return (
    <NoSelectWrapper>
      <BlueSection className="flex items-end justify-end">
        <div className="m-auto">
          <FirstTitle>기회를 받은 사람에서</FirstTitle>
          <SecondTitle>기회를 주는 사람으로!</SecondTitle>
        </div>
        <Image
          src="/images/about/about_1.png"
          alt="대표이미지"
          width={640}
          height={718}
          className="block"
        />
      </BlueSection>
      <ContentWrapper>
        <ContentSection>
          <ContentBlock>
            안녕하세요, <br />
            코코에이치 대표 탁진학입니다.
          </ContentBlock>
          <ContentBlock>
            코코에이치는 AI 기반 뷰티 기술과 서비스를 제공하며, 고객의
            아름다움과 삶의 질을 향상시키는 뷰티 토탈 플랫폼 기업입니다. <br />
            저희는 "기회를 받은 사람에서 기회를 주는 사람으로" 라는 가치를
            바탕으로,
            <br />
            함께 성장하고 서로에게 긍정적인 영향을 주는 선순환을 만들어가고자
            합니다.
            <br />
          </ContentBlock>
          <ContentBlock>
            혁신적인 기술과 데이터를 활용하여 미용 산업에 새로운 가능성을 열고,
            <br />
            고객과 사회에 도움이 되는 기업으로 자리매김하겠습니다.
          </ContentBlock>
          <ContentBlock>
            코코에이치는 사람과 기술, 그리고 사회를 연결하며 더 나은 미래를
            만들어가는 데 앞장서겠습니다.
          </ContentBlock>
          <ContentBlock>감사합니다.</ContentBlock>
        </ContentSection>
        <ContentCompany>주식회사 코코에이치</ContentCompany>
        <div className="flex items-center justify-center">
          <ContentCompany className="ml-6">대표</ContentCompany>
          <Image
            src="/images/about/about_signature.svg"
            alt="사인"
            width={156}
            height={75}
            className="block mt-10 ml-6"
          />
        </div>
      </ContentWrapper>
    </NoSelectWrapper>
  );
}
