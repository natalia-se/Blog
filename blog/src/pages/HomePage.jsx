import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NameContext } from "../App";

import Heading from "../components/Heading";
import Card from "../components/Card";
import FormContainer from "../components/FormContainer";
import CreateMessage from "../components/CreateMessage";
import Button from "../components/Button";
import Chip from "../components/Chip";

export default function HomePage({ fetchMyInformation }) {
  const [messagesList, setMessagesList] = useState(null);
  const navigate = useNavigate();
  const { userInfo } = useContext(NameContext);

  useEffect(() => {
    fetchMessages();
    fetchMyInformation();
  }, [fetchMyInformation]);

  function fetchMessages() {
    const url = "/api/messages/";
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(url, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessagesList(data);
      });
  }

  function onSubmitLogin() {
    navigate("/login");
  }

  function onSubmitCreate() {
    navigate("/register");
  }

  function onSubmitLogout() {
    localStorage.removeItem("Backend1");
    fetchMyInformation();
    window.location.reload(false);
  }
  return (
    <div>
      {/* <img src={ImageHome} alt="HomeImage" />*/}
      {userInfo && (
        <>
          <div>
            <Heading h2>My information</Heading>
            <Button type="submit" value="Logout" onClick={onSubmitLogout} />
            <Card>
              <p>{userInfo.username}</p>
              <p>{userInfo.email}</p>
            </Card>
          </div>
          <div key={userInfo._id}>
            <Link to={`/profile/${userInfo._id}`}>
              <Button type="submit" value="Open profile" />
            </Link>
          </div>

          <Heading h2>Create message</Heading>
          <CreateMessage />
        </>
      )}
      {!userInfo && (
        <div>
          <Button type="submit" value="Login" onClick={onSubmitLogin} />
          <Button
            type="submit"
            value="Create new account"
            onClick={onSubmitCreate}
          />
        </div>
      )}

      <Heading h2>Message list</Heading>
      <FormContainer>
        {messagesList &&
          messagesList.map((item, index) => {
            return (
              <>
                <Chip key={index}>
                  <img
                    alt="Avatar"
                    src={require(`../images/avatar.png`)}
                    style={{
                      float: "left",
                      margin: "0 10px 0 -25px",
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    {item.userName} - {item.text}
                  </div>
                </Chip>
                <div>{item.createdAt}</div>
              </>
            );
          })}
      </FormContainer>
    </div>
  );
}
