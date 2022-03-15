import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Heading from "../components/Heading";
import Button from "../components/Button";
import Card from "../components/Card";
import Chip from "../components/Chip";
import FormContainer from "../components/FormContainer";

export default function ProfilePage() {
  const params = useParams();
  const id = params.id;
  console.log(id);

  const navigate = useNavigate();

  const [userInformation, setUserInformation] = useState(null);
  const [messagesList, setMessagesList] = useState(null);

  function fetchUserMessages() {
    const url = `/api/messages/?userId=${id}`;
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

  function fetchUserInformation() {
    const url = `/api/users/${id}`;
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(url, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInformation(data);
      });
  }

  function onSubmitHome() {
    navigate("/");
  }

  useEffect(() => {
    fetchUserMessages();
    fetchUserInformation();
  }, []);

  return (
    <div>
      {userInformation && (
        <>
          <div>
            <Button type="submit" value="Home" onClick={onSubmitHome} />
            <Heading h2>User information</Heading>
            <Card>
              <div style={{ display: "flex", padding: "4px" }}>
                <img
                  alt="Avatar"
                  src={require(`../images/avatar.png`)}
                  style={{
                    width: "50%",
                  }}
                />
                <div style={{ padding: "16px" }}>
                  <h3>{userInformation.username}</h3>
                  <p>{userInformation.fullName}</p>
                  <p>{userInformation.email}</p>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {messagesList &&
        messagesList.map((item, index) => {
          return (
            <FormContainer key={index}>
              <Chip>
                <div>{item.text}</div>
              </Chip>
              <div>{item.createdAt}</div>
            </FormContainer>
          );
        })}
    </div>
  );
}
