import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./index.css";
import "./styles/tokens.css";
import "./styles/appShell.css";
import "./styles/components.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import { router } from "./app/router.jsx";
import Login from "./components/user/Login.jsx";
import Register from "./components/user/Register.jsx";
import Profile from "./components/user/Profile.jsx";
import GoogleCallback from "./components/user/GoogleCallback.jsx";
import Round from "./components/round/Round.jsx";
import RoundHistory from "./components/round/RoundHistory.jsx";
import RoundSetup from "./components/round/RoundSetup.jsx";
import Main from "./components/Main.jsx";
import { GlobalProvider } from "./context/GlobalState.jsx";

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
          <Route path="auth/google/callback" element={<GoogleCallback />} />
          <Route path="round/:roundId/:courseId" element={<Round />} />
          <Route path="round-history" element={<RoundHistory />} />
          <Route path="round-setup" element={<RoundSetup />} />
          <Route path="main" element={<Main />} />
          {/* Clover routes */}
          <Route path="/home/*" element={<RouterProvider router={router} />} />
          <Route path="/stats/*" element={<RouterProvider router={router} />} />
          <Route path="/schedule/*" element={<RouterProvider router={router} />} />
          <Route path="/messages/*" element={<RouterProvider router={router} />} />
          <Route path="/events/*" element={<RouterProvider router={router} />} />
        </Routes>
      </Router>
    </GlobalProvider>
  </React.StrictMode>
);
