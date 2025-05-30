"use client";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedImageWrapper = styled.div`
  opacity: 0;
  &.visible {
    animation: ${slideUp} 1s ease-out forwards;
  }
`;

export const SkillsSubTitle = styled.h3`
  font-size: 30px;
  line-height: 48px;
  font-weight: 500;
  color: #000000;
  margin-right: 105px;
`;

export const SkillsDescription = styled.span`
  display: block;
  font-size: 25px;
  line-height: 48px;
  font-weight: 400;
  color: #111111;
  margin-top: 10px;
`;

export const SkillsText = styled.span`
  font-size: 20px;
  line-height: 48px;
  font-weight: 500;
  color: #18244d;
`;

export const EmphasisText = styled.span`
  font-size: 40px;
  line-height: 48px;
  font-weight: 900;
  color: #111111;
  margin-top: 50px;
  display: inline-block;
`;
