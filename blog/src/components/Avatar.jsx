import React from "react";
import styled from "styled-components";

const StyledAvatar = styled.img`
  float: left;
  margin: 0 10px 0 -25px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

export default function Avatar(props) {
  return <StyledAvatar>{props.children}</StyledAvatar>;
}
