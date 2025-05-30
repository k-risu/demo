import Image from "next/image";
import {
  Background,
  CompanyIntroduction,
  CompanyName,
  ContentWrapper,
  Logo,
  LogoWrapper,
  Title,
} from "@/styles/home/mainBanner.styles";

const BANNER_DATA = {
  companyName: "(주)코코에이치",
  title: "“기술로 연결하고, 혁신으로 성장하다”",
  mainLogo: {
    src: "/images/main/main_cocoh_logo.svg",
    width: 246,
    height: 57,
  },
  introduction: [
    "the company introduction material of Hair Bear, a job search platform specializing in hair beauty. Please visit the website for details: www.헤어베어.com",
    "Hair Bear, a job search platform specializing in hair beauty ill be a company that promotes the development of the beauty market and strives to ",
    "improve the professionalism of beauticians and cultivate younger students in connection with the Korea Scholarship Foundation",
  ],
  partnerLogos: [
    {
      id: 1,
      src: "/images/main/main_cocoium_logo.svg",
      width: 155,
      height: 29,
    },
    {
      id: 2,
      src: "/images/main/main_mirror_motion_logo.svg",
      width: 203,
      height: 30,
    },
  ],
  bottomLogos: [
    {
      id: 1,
      src: "/images/main/main_haiBear_logo.svg",
      width: 92,
      height: 80,
    },
    {
      id: 2,
      src: "/images/main/main_Eli_co_SPA_logo.svg",
      width: 170,
      height: 40,
    },
    {
      id: 3,
      src: "/images/main/main_HSet_logo.svg",
      width: 80,
      height: 43,
    },
  ],
};

export default function MainBanner() {
  return (
    <Background>
      <ContentWrapper>
        <CompanyName>{BANNER_DATA.companyName}</CompanyName>
        <Title>{BANNER_DATA.title}</Title>
        <Logo>
          <Image
            src={BANNER_DATA.mainLogo.src}
            alt="main_Logo"
            width={BANNER_DATA.mainLogo.width}
            height={BANNER_DATA.mainLogo.height}
          />
        </Logo>
        <div className="mt-7">
          <CompanyIntroduction>
            {BANNER_DATA.introduction.map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </CompanyIntroduction>
        </div>
        <div className="flex justify-center items-center gap-30 mt-10">
          {BANNER_DATA.partnerLogos.map(logo => (
            <Image
              key={logo.id}
              src={logo.src}
              alt="partner_logo"
              width={logo.width}
              height={logo.height}
            />
          ))}
        </div>
        <LogoWrapper>
          {BANNER_DATA.bottomLogos.map(logo => (
            <Image
              key={logo.id}
              src={logo.src}
              alt="bottom_logo"
              width={logo.width}
              height={logo.height}
            />
          ))}
        </LogoWrapper>
      </ContentWrapper>
    </Background>
  );
}
