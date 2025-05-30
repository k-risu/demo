import Image from "next/image";
import { SubTitle, Title } from "@/styles/Commom.styles";
import { Description, TitleSpan } from "../../styles/home/aboutUs.styles";

const VALUES = [
  {
    id: 1,
    icon: "/images/main/main_AboutUs_1.png",
    title: "혁신과 도전",
    description: [
      "끊임없는 도전 정신으로",
      "새로운 가치를 창출하고",
      "글로벌 시장에서 경쟁력을 확보합니다.",
    ],
  },
  {
    id: 2,
    icon: "/images/main/main_AboutUs_2.png",
    title: "고개중심",
    description: [
      "고객의 니즈를 최우선으로 고려하여",
      "제품과 서비스를 개발합니다.",
    ],
  },
  {
    id: 3,
    icon: "/images/main/main_AboutUs_3.png",
    title: "사회적 책임 CSR",
    description: [
      "지역사회와의 상생을 위해",
      "사회공헌 활동을 실천하고",
      "환경보호와 지속 가능한 발전을",
      "위해 노력합니다.",
    ],
  },
];

export default function AboutUs() {
  return (
    <div className="mt-142">
      <Title>
        About <TitleSpan>Us</TitleSpan>
      </Title>
      <ul className="flex justify-center items-center gap-6 mt-21">
        {VALUES.map((value, index) => (
          <li key={value.id} className="flex ">
            <div>
              <Image
                src={value.icon}
                alt={`${value.title} icon`}
                width={346}
                height={308}
              />
              <SubTitle>{value.title}</SubTitle>
              <Description>
                {value.description.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </Description>
            </div>
            {index !== VALUES.length - 1 && (
              <Image
                src="/images/main/main_bar.png"
                alt="arrow"
                width={3}
                height={637}
                className="ml-13"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
