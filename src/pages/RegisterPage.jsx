import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";
import Heading from "../components/Heading";
import FormContainer from "../components/FormContainer";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    //   const payload = {
    //     userName,
    //     password
    //   };
    //   fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => navigate("/login"));
    navigate("/login");
  }

  return (
    <div>
      <Heading h1>Create user</Heading>
      <FormContainer>
        <form onSubmit={handleOnSubmit}>
          <Input
            type="text"
            placeholder="User name"
            value={userName}
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
    </div>
  );
}
