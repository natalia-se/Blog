import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

export default function Input(props) {
  return <StyledInput {...props}>{props.children}</StyledInput>;
}
