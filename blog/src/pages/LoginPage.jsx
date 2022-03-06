import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Heading from "../components/Heading";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();

    //   const payload = { userName, password };

    //   const url = ;

    //   fetch(url, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       const token = data.token;
    //       localStorage.setItem("task", token);
    //       props.refreshCustomers();
    //       props.refreshMyInfo();
    //       navigate("/home");
    //     });
    navigate("/");
  }

  return (
    <div>
      <Heading h1>Login</Heading>
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
          <Button type="submit" value="Login" />
        </form>
      </FormContainer>
    </div>
  );
}
