"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Title } from "@/styles/Commom.styles";
import {
  AnimatedImageWrapper,
  EmphasisText,
  SkillsDescription,
  SkillsSubTitle,
  SkillsText,
} from "@/styles/home/skillsSection.styles";

export default function SkillsSection() {
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div className="mt-140 text-center">
      <Title>핵심 기술</Title>
      <SkillsSubTitle className="flex items-center gap-2 justify-center mt-5">
        뷰티 데이터 기반 AI 생성형 헤어모델&nbsp;
        <Image
          src="/images/main/main_HSet_logo.svg"
          alt="skills"
          width={71}
          height={40}
          className="pb-4"
        />
      </SkillsSubTitle>
      <SkillsDescription>
        기존의 stable diffusion은 변환할 부분을 지정하는 binary masking만 입력을
        넣어주면 되지만 본 연구에서는 앞서 추출한
        <br /> 얼굴형 feature를 추가로 입력으로 넣어주면서 얼굴형에 따라
        자연스럽게 변환이 되는 파이프라인으로 모델을 훈련
      </SkillsDescription>
      <div className="flex flex-col items-center justify-center">
        <AnimatedImageWrapper ref={imageRef}>
          <Image
            src="/images/main/main_skillsSection_4.png"
            alt="skills"
            width={752}
            height={300}
            className="mt-40 ml-5"
          />
        </AnimatedImageWrapper>
        <Image
          src="/images/main/main_bar3.png"
          alt="skills"
          width={6}
          height={248}
          className="mt-14"
        />
      </div>
      <div className="flex justify-center items-center gap-16 mt-20">
        <div>
          <SkillsText>변환 전</SkillsText>
          <Image
            src="/images/main/main_skillsSection_5.png"
            alt="skills"
            width={351}
            height={252}
          />
        </div>
        <div>
          <SkillsText>변환 후</SkillsText>
          <Image
            src="/images/main/main_skillsSection_6.png"
            alt="skills"
            width={351}
            height={252}
          />
        </div>
      </div>
      <EmphasisText>H.Set으로 만들어진 생성형 AI, 지금 만나보세요</EmphasisText>
    </div>
  );
}
