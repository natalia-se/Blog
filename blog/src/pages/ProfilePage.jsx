import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NameContext } from "../App";

import Heading from "../components/Heading";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ProfilePage(props) {
  const params = useParams();
  const id = params.id;

  const { userInfo } = useContext(NameContext);

  const navigate = useNavigate();
  const url = `/api/users/${id}`;

  const [fullName, setFullName] = useState(userInfo.fullName);
  const [email, setEmail] = useState(userInfo.email ? userInfo.email : "");
  const [profilePic, setProfilePic] = useState(userInfo.profilePic);

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = {
      fullName,
      email,
      profilePic,
    };
    const token = localStorage.getItem("Backend1");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(payload),
    }).then((res) => {
      navigate("/");
      props.fetchMyInformation();
    });
  }
  console.log(profilePic);
  return (
    <div>
      <Heading h1>My information</Heading>

      <FormContainer>
        <form onSubmit={handleOnSubmit}>
          <Input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="file"
            placeholder="User photo"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
          <Button type="submit" value="Submit" />
        </form>
      </FormContainer>
    </div>
  );
}
