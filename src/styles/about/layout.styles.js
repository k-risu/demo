"use client";

import styled from "@emotion/styled";

export const AboutItem = styled.li`
  border-bottom: 1px solid transparent;
  font-size: 20px;
  color: #656565;
  font-weight: 500;

  &[data-active="true"] {
    border-bottom: 1px solid #18244d;
    font-weight: 700;
    color: #18244d;
  }
`;
