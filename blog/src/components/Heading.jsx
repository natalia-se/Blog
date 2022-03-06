import React from "react";
import styled from "styled-components";

const StyledH2 = styled.h2`
  text-align: center;
`;

const StyledH1 = styled(StyledH2)`
  font-size: 32px;
  font-family: fantasy;
`;

export default function Heading(props) {
  return (
    <>
      {props.h2 ? (
        <StyledH2 {...props}>{props.children}</StyledH2>
      ) : (
        <StyledH1 {...props}>{props.children}</StyledH1>
      )}
    </>
  );
}
