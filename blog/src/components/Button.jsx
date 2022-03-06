import React from "react";
import styled from "styled-components";

const InputButton = styled.input`
  background-color: rgb(204, 38, 38);
  // #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  font-size: large;
  &:hover {
    background-color: brown;
  }
`;

export default function Button(props) {
  return <InputButton {...props}>{props.children}</InputButton>;
}
