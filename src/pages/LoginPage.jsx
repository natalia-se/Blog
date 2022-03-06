import React from "react";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";

export default function LoginPage() {
  return (
    <div>
      <FormContainer>
        <form>
          {/* onSubmit={handleOnSubmit} */}
          <Input
            type="text"
            placeholder="User name"
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" value="Login" />
        </form>
      </FormContainer>
    </div>
  );
}
