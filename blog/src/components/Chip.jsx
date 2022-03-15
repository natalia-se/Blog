import React from "react";
import styled from "styled-components";

const StyledChip = styled.div`
  display: flex-grow;
  padding: 0 25px;
  align-items: center;
  font-size: 16px;
  margin: 8px;
  border-radius: 25px;
  background-color: #f1f1f1;
  min-height: 50px;
`;

export default function Chip(props) {
  return <StyledChip>{props.children}</StyledChip>;
}
