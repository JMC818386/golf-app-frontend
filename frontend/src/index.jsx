import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import Round from "./components/round/Round";
import RoundHistory from "./components/round/RoundHistory";
import RoundSetup from "./components/round/RoundSetup";
import Main from "./components/Main";
import PlayerPortal from "./components/PlayerPortal";
import { GlobalProvider } from "./context/GlobalState";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="round/:roundId/:courseId" element={<Round />} />
          <Route path="round-history" element={<RoundHistory />} />
          <Route path="round-setup" element={<RoundSetup />} />
          <Route path="main" element={<Main />} />
          <Route path="player-portal" element={<PlayerPortal />} />
          {/* </Route> */}
        </Routes>
      </Router>
    </GlobalProvider>
  </React.StrictMode>
);
