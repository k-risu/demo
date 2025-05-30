"use client";

import styled from "@emotion/styled";

export const NoSelectWrapper = styled.div`
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const BlueSection = styled.div`
  height: 400px;
  margin-top: 292px;
  background-color: #18244d;
`;

export const Title = styled.h2`
  color: #ffffff;
  font-size: 60px;
  font-weight: 900;
`;

export const FirstTitle = styled(Title)`
  margin-bottom: 40px;
  margin-right: 160px;
`;

export const SecondTitle = styled(Title)`
  margin-left: 160px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
  height: 1000px;

  background-image: url("/images/about/about_bg.png");
  background-size: 632px 700px;
  background-repeat: no-repeat;
  background-position: right -60px bottom -10px;
`;

export const ContentSection = styled.div`
  color: #000000;
  font-size: 20px;
  font-weight: 400;
  line-height: 40px;
  margin-left: 260px;

  width: 100%;
  height: 600px;
`;

export const ContentBlock = styled.span`
  display: block;
  margin-top: 40px;

  &:first-of-type {
    margin-top: 70px;
  }
`;

export const ContentCompany = styled.span`
  display: block;
  text-align: center;
  margin-top: 50px;

  font-size: 25px;
  font-weight: 400;
  color: #000000;
`;
