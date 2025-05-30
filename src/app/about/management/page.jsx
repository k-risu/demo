import Image from "next/image";
import {
  MgmtContent,
  MgmtLayout,
  MgmtSubTitle,
} from "@/styles/about/management/management.styles";

export default function Management() {
  // const list = [
  // {
  //   title: "01 기술 혁신 추구",
  //   content: "헤어샵",
  // },
  // {
  //   title: "",
  //   content: "",
  // },
  // {

  // }
  // ];
  return (
    <MgmtLayout>
      <div className="flex flex-col gap-5">
        <MgmtSubTitle>
          <div>
            <span>0</span>
            <span className="text-[#EC701E]">1&nbsp;</span>
          </div>
          <span>기술 혁신 추구</span>
        </MgmtSubTitle>
        <MgmtContent>
          헤어샵 미러 디스플레이 등 첨단 기술을
          <br />
          활용한 제품 개발에 주력합니다.
          <br />
          <br />
          연구개발 투자를 확대하여 기술
          <br />
          경쟁력을 강화합니다.
        </MgmtContent>

        <MgmtSubTitle>
          <div>
            <span>0</span>
            <span className="text-[#EC701E]">3&nbsp;</span>
          </div>
          <span>파트너십 강화</span>
        </MgmtSubTitle>
        <MgmtContent>
          가맹점과의 상생 협력을 통해
          <br />
          ‘코코리움’ 브랜드의 가치를 높입니다.
          <br />
          <br />
          협력업체와의 긴밀한 관계 구축으로
          <br />
          안정적인 공급망을 확보합니다.
        </MgmtContent>
      </div>
      <Image
        src="/images/about/management/management_1.png"
        alt="management"
        width={525}
        height={500}
      />
      <div className="flex flex-col gap-5 pl-10">
        <MgmtSubTitle>
          <div>
            <span>0</span>
            <span className="text-[#EC701E]">2&nbsp;</span>
          </div>
          <span>인재 육성</span>
        </MgmtSubTitle>
        <MgmtContent>
          직원들의 역량 개발을 위한 교육
          <br />
          프로그램을 운영합니다.
          <br />
          <br />
          공정한 평가와 보상 체계를 통해
          <br />
          우수 인재를 유치하고 유지합니다.
        </MgmtContent>
        <MgmtSubTitle>
          <div>
            <span>0</span>
            <span className="text-[#EC701E]">4&nbsp;</span>
          </div>
          <span>글로벌 확장</span>
        </MgmtSubTitle>
        <MgmtContent>
          가맹점과의 상생 협력을 통해
          <br />
          ‘코코리움’ 브랜드의 가치를 높입니다.
          <br />
          <br />
          협력업체와의 긴밀한 관계 구축으로
          <br />
          안정적인 공급망을 확보합니다.
        </MgmtContent>
      </div>
    </MgmtLayout>
  );
}
