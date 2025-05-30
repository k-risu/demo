"use client";

import styled from "@emotion/styled";

export const Background = styled.div`
  background-image: url("/images/main/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 766px;
`;

export const ContentWrapper = styled.div`
  padding-top: 96px;
  text-align: center;
  gap: 10px;
`;

export const CompanyName = styled.h2`
  font-size: 40px;
  text-shadow: 4px 4px 4px rgba(0, 4, 4, 0.25);
  font-weight: 700;
  display: block;
  color: white;
`;

export const Title = styled.h1`
  font-size: 70px;
  text-shadow: 4px 4px 4px rgba(0, 4, 4, 0.25);
  font-weight: 900;
  display: block;
  color: white;
`;

export const Logo = styled.div`
  display: inline-block;
  margin-top: 125px;
`;

export const CompanyIntroduction = styled.span`
  font-size: 15px;
  color: #f5f5f5;
  font-weight: 400;
  line-height: 25px;
  text-shadow: 4px 4px 4px rgba(0, 4, 4, 0.25);
`;

export const LogoWrapper = styled.div`
  gap: 100px;
  width: 738px;
  height: 103px;
  background: #f9f9f9;
  border-radius: 14px;
  margin: 0 auto;
  margin-top: 90px;
  padding: 0 20px;
  box-shadow: 10px 10px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;
