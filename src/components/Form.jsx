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
              <Label htmlFor="organisationNr">Organisation Number</Label>
            </Col25>
            <Col75>
              <Input
                type="number"
                id="organisationNr"
                name="organisationNr"
                placeholder="Organisation Number.."
                value={props.organisationNr}
                onChange={(e) => props.setOrganisationNr(e.target.value)}
              />
            </Col75>
          </Row>
          <Row>
            <Col25>
              <Label htmlFor="vatNr">Vat Number</Label>
            </Col25>
            <Col75>
              <Input
                type="text"
                name="vatNr"
                placeholder="SEXXXXXXXXXX"
                value={props.vatNr}
                pattern="[SE]+[0-9]{10}"
                onChange={(e) => props.setVatNr(e.target.value)}
              />
            </Col75>
          </Row>
          <Row>
            <Col25>
              <Label htmlFor="reference">Reference</Label>
            </Col25>
            <Col75>
              <Input
                type="text"
                name="reference"
                placeholder="Reference.."
                value={props.reference}
                onChange={(e) => props.setReference(e.target.value)}
              />
            </Col75>
          </Row>
          <Row>
            <Col25>
              <Label htmlFor="paymentTerm">Payment Term</Label>
            </Col25>
            <Col75>
              <Input
                type="number"
                name="paymentTerm"
                placeholder="Payment Term.."
                value={props.paymentTerm}
                onChange={(e) => props.setPaymentTerm(e.target.value)}
                required
              />
            </Col75>
          </Row>
          <Row>
            <Col25>
              <Label htmlFor="website">Website</Label>
            </Col25>
            <Col75>
              <Input
                type="text"
                name="website"
                placeholder="Website.."
                value={props.website}
                onChange={(e) => props.setWebsite(e.target.value)}
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
          <Row>
            <Col25>
              <Label htmlFor="phoneNumber">Phone Number</Label>
            </Col25>
            <Col75>
              <Input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number.."
                value={props.phoneNumber}
                onChange={(e) => props.setPhoneNumber(e.target.value)}
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
