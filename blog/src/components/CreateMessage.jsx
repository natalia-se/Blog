import React, { useState } from "react";
import Button from "./Button";

export default function CreateMessage() {
  const [text, setText] = useState("");

  function handleOnSubmit(e) {
    e.preventDefault();
    const url = "api/messages/";
    const payload = {
      text,
    };
    const token = localStorage.getItem("Backend1");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    // .then((data) => props.onSuccess());
  }
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div>
          <textarea
            maxLength="140"
            style={{
              width: "60vw",
              height: "150px",
              border: "none",
              marginLeft: "20vw",
              marginRight: "20vw",
              padding: "8px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              transition: "0.3s",
              borderRadius: "5px",
              background: "white",
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <Button type="submit" value="Create message" />
      </form>
    </div>
  );
}
