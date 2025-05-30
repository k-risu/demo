"use client";

import styled from "@emotion/styled";

export const ContactBannerBg = styled.div`
  background-image: url("/images/main/main_contactBanner.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 268px;
  margin-top: 375px;
  text-align: center;
  font-size: 40px;
  line-height: 60px;
  font-weight: 900;
  color: #ffffff;
  gap: 6px;

  padding-bottom: 20px;
`;
export const Button = styled.button`
  width: 168px;
  height: 59px;
  border-radius: 7px;
  background-color: #060812;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
