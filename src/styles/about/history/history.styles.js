"use client";

import styled from "@emotion/styled";

export const HistoryLayout = styled.div`
  display: flex;
  justify-content: center;

  color: #18244d;
  gap: 120px;
  margin-top: 120px;

  > div {
    width: 660px;
  }
  > div:first-of-type {
    padding-left: 200px;
  }

  h2 {
    font-size: 40px;
    font-weight: 900;
    text-shadow: 4px 4px 4px rgba(0, 4, 4, 0.25);
    margin-top: 40px;
  }
  ul {
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    gap: 40px;
    li {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 30px;
      h3 {
        display: block;
        width: 75px;
        font-size: 35px;
        font-weight: 700;
        text-align: end;
        text-shadow: 4px 4px 4px rgba(0, 4, 4, 0.25);
        span {
          font-size: 25px;
          font-weight: 700;
        }
      }
      span {
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
  > div:last-of-type {
    margin-top: 330px;
  }

  background-image: url("/images/about/about_bg.png");
  background-size: 632px 700px;
  background-repeat: no-repeat;
  background-position: right -60px bottom -10px;

  padding-bottom: 300px;
`;
