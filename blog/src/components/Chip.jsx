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
  min-width: 100px;
  margin: 15px 15px;
  // padding: 15px 20px 15px 20px;
  box-shadow: 0 0 5px #888;
  text-shadow: 2px 2px 2px #ccc;
`;

export default function Chip(props) {
  return <StyledChip>{props.children}</StyledChip>;
}

// border: "1px solid",
// margin: "15px 0px",
// padding: "15px 20px 15px 55px",
// width: "500px",
// font: "bold 12px verdana",
// // -moz-box-shadow: 0 0 5px #888;
// // -webkit-box-shadow: 0 0 5px#888;
// boxShadow: "0 0 5px #888",
// textShadow: "2px 2px 2px #ccc",
// // -webkit-border-radius: 15px;
// // -moz-border-radius: 15px;
// borderRadius: "25px",
