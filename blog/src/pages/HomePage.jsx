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
  const PF = "http://localhost:5000/images/";
  const [messagesList, setMessagesList] = useState(null);
  const navigate = useNavigate();
  const { userInfo } = useContext(NameContext);

  useEffect(() => {
    fetchMessages();
    fetchMyInformation();
  }, []);

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
  // const mes = Object.entries(messagesList);
  console.log("messagesList", messagesList);
  return (
    <div>
      {/* <img src={ImageHome} alt="HomeImage" />*/}
      <Heading h1>Blog</Heading>
      {userInfo && (
        <>
          <div>
            <Button type="submit" value="Logout" onClick={onSubmitLogout} />
            <Heading h2>My information</Heading>
            <div key={userInfo._id}>
              <Link to={`/profile/${userInfo._id}`}>
                <Button type="submit" value="Open profile" />
              </Link>
            </div>
            <Card>
              <p>{userInfo.username}</p>
              <p>{userInfo.fullName}</p>
              <p>{userInfo.email}</p>
            </Card>
          </div>

          <Heading h2>Create message</Heading>
          <CreateMessage fetchMessages={fetchMessages} />
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

      {/* <Heading h2>Message list</Heading> */}
      <FormContainer>
        {messagesList &&
          messagesList.map((item, index) => {
            return (
              <div key={index}>
                <div style={{ display: "flex" }}>
                  <Link to={`/users/${item.userId._id}`}>
                    <Chip>
                      {item.userId.profilePic && (
                        <img
                          alt="Avatar"
                          src={PF + item.userId.profilePic}
                          style={{
                            float: "left",
                            margin: "0 10px 0 -25px",
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                      {!item.userId.profilePic && (
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
                      )}

                      <div>{item.userId.username}</div>
                    </Chip>
                  </Link>
                  <div
                    style={{
                      margin: "15px 0px",
                      padding: "15px 20px 15px 55px",
                      width: "400px",
                      display: "flex-grow",
                      font: "bold 12px verdana",
                      boxShadow: "0 0 5px #888",
                      textShadow: "2px 2px 2px #ccc",
                      borderRadius: "25px",
                    }}
                  >
                    {item.text}
                  </div>
                </div>
                <div>{item.createdAt}</div>
              </div>
            );
          })}
      </FormContainer>
    </div>
  );
}
