import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Heading from "../components/Heading";
import Chip from "../components/Chip";

export default function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [dataError, setDataError] = useState(null);

  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();

    const payload = { username, password };

    const url = "/api/auth/login";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(
        (res) => res.json()
        // setResStatus(res.status);
      )
      .then((data) => {
        // console.log("data", data.token);
        const token = data.token;
        if (token) {
          localStorage.setItem("Backend1", token);
          navigate("/");
        }

        if (!token) setDataError(data);
      });
  }

  return (
    <div>
      <Heading h1>Login</Heading>
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
          <Button type="submit" value="Login" />
        </form>
      </FormContainer>
      {dataError && <Chip>{dataError}</Chip>}
    </div>
  );
}
