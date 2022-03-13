import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import FormContainer from "./FormContainer";

const Row = styled.div`
  &: after {
    content: "";
    display: table;
    clear: both;
  }
`;

const Col25 = styled.div`
  float: left;
  margin-top: 6px;
  width: 25%;
`;

const Col75 = styled.div`
  float: left;
  margin-top: 6px;
  width: 75%;
`;

const Label = styled.label`
  padding: 12px 12px 12px 0;
  display: inline-block;
`;

export default function Form(props) {
  return (
    <div>
      <FormContainer>
        <form onSubmit={props.handleOnSubmit}>
          <Row>
            <Col25>
              <Label htmlFor="name">Name</Label>
            </Col25>
            <Col75>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Name .."
                value={props.name}
                onChange={(e) => props.setName(e.target.value)}
              />
            </Col75>
          </Row>
          <Row>
            <Col25>
              <Label htmlFor="email">Email</Label>
            </Col25>
            <Col75>
              <Input
                type="email"
                name="email"
                placeholder="Email.."
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </Col75>
          </Row>

          <br />
          <Row>
            <Button type="submit" value={props.buttonName} />
          </Row>
        </form>
      </FormContainer>
    </div>
  );
}
