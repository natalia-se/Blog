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
            rows="10"
            cols="80"
            maxLength="140"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <Button type="submit" value="Create" />
      </form>
    </div>
  );
}
