"use client";

import styled from "@emotion/styled";

export const NewsLayout = styled.div`
  h1 {
    font-size: 50px;
    line-height: 48px;
    font-weight: 900;
    color: #18244d;
    text-align: center;
    margin-top: 100px;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    padding: 40px;
    margin: 0 auto;
  }
  li {
    color: #fff;
    padding: 30px;
    width: 470px;
    height: 535px;
    background-color: #18244d;

    h2 {
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
`;
export const NewsCompany = styled.span`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
`;
export const NewsAuthor = styled.span`
  font-size: 13px;
  line-height: 24px;
  color: #cccccc;
`;
export const NewsDate = styled.span`
  font-size: 20px;
  line-height: 24px;
  color: #cccccc;
`;
