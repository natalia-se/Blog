import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  margin-left: 20vw;
  margin-right: 20vw;
  padding: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  background: white;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default function Card(props) {
  return <StyledCard>{props.children}</StyledCard>;
}
