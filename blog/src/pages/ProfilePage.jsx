import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NameContext } from "../App";

import Heading from "../components/Heading";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ProfilePage(props) {
  const PF = "http://localhost:5000/images/";
  const params = useParams();
  const id = params.id;

  const { userInfo } = useContext(NameContext);

  const navigate = useNavigate();
  const url = `/api/users/${id}`;

  const [fullName, setFullName] = useState(
    userInfo.fullName ? userInfo.fullName : ""
  );
  const [email, setEmail] = useState(userInfo.email ? userInfo.email : "");
  const [profilePic, setProfilePic] = useState(null);

  async function handleOnSubmit(e) {
    e.preventDefault();

    const payload = {
      fullName,
      email,
    };

    const token = localStorage.getItem("Backend1");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (profilePic) {
      const urlLoad = "/api/upload";
      const data = new FormData();
      const picName = Date.now() + profilePic.name;
      data.append("file", profilePic, picName);
      payload.profilePic = picName;

      await fetch(urlLoad, {
        method: "POST",
        body: data,
      }).then((res) => {
        console.log(res);
      });
    }

    await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(payload),
    }).then((res) => {
      navigate("/");
      props.fetchMyInformation();
    });
  }

  return (
    <div>
      <Heading h1>My information</Heading>
      {/* {profilePic && <img src={URL.createObjectURL(profilePic)} alt="Avatar" />} */}

      <FormContainer>
        {profilePic && (
          <img
            src={URL.createObjectURL(profilePic)}
            alt="Avatar"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              height: "200px",
              width: "200px",
              borderRadius: "50%",
            }}
          />
        )}
        {userInfo.profilePic && !profilePic && (
          <img
            alt="Avatar"
            src={PF + userInfo.profilePic}
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              height: "200px",
              width: "200px",
              borderRadius: "50%",
            }}
          />
        )}
        {!userInfo.profilePic && !profilePic && (
          <img
            alt="Avatar"
            src={require(`../images/avatar.png`)}
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              height: "200px",
              width: "200px",
              borderRadius: "50%",
            }}
          />
        )}
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
            // value={profilePic}
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
          <Button type="submit" value="Submit" />
        </form>
      </FormContainer>
    </div>
  );
}
