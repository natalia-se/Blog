import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import ImageHome from "../images/home.jpg";
import Heading from "../components/Heading";
import Card from "../components/Card";
import FormContainer from "../components/FormContainer";
import CreateMessage from "../components/CreateMessage";
import Button from "../components/Button";

export default function HomePage({ userInfo }) {
  const [messagesList, setMessagesList] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  function fetchMessages() {
    const token = localStorage.getItem("Backend1");
    const url = "/api/messages/";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  return (
    <div>
      {/* <img src={ImageHome} alt="HomeImage" />*/}
      {userInfo && (
        <>
          <div>
            <Heading h2>My information</Heading>
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

      <Heading h2>Message list</Heading>
      <FormContainer>
        {messagesList &&
          messagesList.map((item, index) => {
            return (
              <div key={index}>
                {item.userName} - {item.text} - {item.createdAt}
              </div>
            );
          })}
      </FormContainer>
    </div>
  );
}
