import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalState";
import jwtDecode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.css";
import "./User.css";
import { Link, Outlet } from "react-router-dom";
import logo from "../../img/PocketPro_LogoMark.png";
import NavBar from "../NavBar";

const Login = () => {
  let navigate = useNavigate();

  const [state, dispatch] = useGlobalState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(username, password).then(async (resp) => {
      if (resp && resp.access) {
        let data = jwtDecode(resp.access);
        await dispatch({
          currentUserToken: resp.access,
          currentUser: data,
        });
        navigate("/main");
      } else {
        // Login failed
        alert("Login failed. Please check your credentials.");
      }
    }).catch((error) => {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    });
  };

  return (
    <div className="background login-page">
      <NavBar />
      <Outlet />
      <div className="container d-flex justify-content-center">
        <div className="row mt-5">
          <div className="col mt-5">
            <img className="logo" src={logo} alt="Logo" />
            <div className="c-form">
              <form onSubmit={handleLogin}>
                <p className="d-flex justify-content-center p-2 mb-1 s-text">
                  Username
                </p>
                <div className="d-flex justify-content-center">
                  <label htmlFor="username"></label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="rounded border-0"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <p className="d-flex justify-content-center p-2 mb-1 mt-4 s-text">
                  Password
                </p>
                <div className="d-flex justify-content-center">
                  <label htmlFor="pass"></label>
                  <input
                    type="password"
                    id="pass"
                    name="password"
                    className="rounded border-0"
                    minLength="8"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <div className="d-flex justify-content-center flex-column m-4" style={{ width: '250px' }}>
                    <input
                      className="rounded"
                      style={{ marginBottom: '12px', padding: '12px 60px', height: '45px', width: '100%', border: 'none', background: 'rgb(242,167,75)', color: 'white', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold', fontSize: '14px', display: 'block', boxSizing: 'border-box' }}
                      type="submit"
                      value="SIGN IN"
                    />
                    <button
                      className="rounded"
                      style={{ padding: '12px 60px', height: '45px', width: '100%', border: 'none', backgroundColor: '#698C75', color: 'white', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold', fontSize: '14px', display: 'block', boxSizing: 'border-box', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}
                      onClick={() => navigate('/register')}
                    >
                      CREATE ACCOUNT
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

/* 
#314035 Dark Green
#698C75 Light Green
#46594B Mid Green
#F2EFDF Off White
#F2A74B Orange 
*/
