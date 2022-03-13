import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";
import Heading from "../components/Heading";
import FormContainer from "../components/FormContainer";

export default function RegisterPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  let resStatus = 200;

  function handleOnSubmit(e) {
    e.preventDefault();
    const url = "/api/auth/register";
    const payload = {
      username,
      password,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        resStatus = res.status;
        console.log("in", resStatus);
      })
      .then((data) => {
        console.log(data);
      });

    if (resStatus !== 400 && resStatus !== 401) {
      navigate("/login");
    }
    console.log(resStatus);
  }

  return (
    <div>
      <Heading h1>Create user</Heading>
      <FormContainer>
        <form onSubmit={handleOnSubmit}>
          <Input
            type="text"
            placeholder="User name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" value="Create User"></Button>
        </form>
      </FormContainer>
      {(resStatus === 400 || resStatus === 401) && <div>Duplicate name</div>}
    </div>
  );
}
