"use client";

import { Roboto_Condensed } from "next/font/google";
import styled from "@emotion/styled";

const robotoCondensed = Roboto_Condensed({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const MgmtLayout = styled.div`
  display: flex;
  gap: 48px;
  justify-content: center;
  align-items: center;
  margin-top: 120px;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  background-image: url("/images/about/about_bg.png");
  background-size: 632px 700px;
  background-repeat: no-repeat;
  background-position: right -60px bottom -10px;

  padding-bottom: 300px;
`;

export const MgmtSubTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: 800;
  line-height: 100%;
  color: #18244d;
  div {
    span {
      font-family: ${robotoCondensed.style.fontFamily};
      font-size: 50px;
      font-weight: 800;
      line-height: 100%;
    }
  }
`;

export const MgmtContent = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 35px;
  color: #111111;
  margin-bottom: 100px;
`;
