"use client";

import Link from "next/link";
import styled from "@emotion/styled";

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  min-height: calc(100vh - 290px);
  height: 100%;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #18244d;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 20px;
  color: #666;
  margin-bottom: 40px;
`;

const HomeButton = styled(Link)`
  padding: 12px 24px;
  background-color: #18244d;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a3a6a;
  }
`;

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <Title>404</Title>
      <Description>페이지를 찾을 수 없습니다.</Description>
      <HomeButton href="/">홈으로 돌아가기</HomeButton>
    </NotFoundWrapper>
  );
}
