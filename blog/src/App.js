import React, { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

const NameContext = createContext({});

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchMyInformation();
  }, []);

  function fetchMyInformation() {
    const token = localStorage.getItem("Backend1");

    if (token) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const url = "api/users/me";
      fetch(url, {
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data);
        });
    }
  }
  return (
    <NameContext.Provider value={{ userInfo, setUserInfo }}>
      <div>
        <Routes>
          <Route
            path="/"
            element={<HomePage fetchMyInformation={fetchMyInformation} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile/:id"
            element={<ProfilePage fetchMyInformation={fetchMyInformation} />}
          />
        </Routes>
      </div>
    </NameContext.Provider>
  );
}

export { NameContext };
export default App;
