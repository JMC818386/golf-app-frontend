import React, { useState } from "react"
import AuthService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from "../../context/GlobalState";
import jwtDecode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.css";
import "./User.css";
import { Link } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const [ state, dispatch ] = useGlobalState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService
      .login(username, password)
      .then(async (resp) => {
        let data = jwtDecode(resp.access)
        await dispatch({
          currentUserToken: resp.access,
          currentUser: data
        })
        navigate('/profile')
      });
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col mt-5">
          <div className="c-form mt-5">
            <form onSubmit={handleLogin}>
              <p className="d-flex justify-content-center p-2 mb-1 mt-5 s-text">Username</p>
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
              <p className="d-flex justify-content-center p-2 mb-1 mt-4 s-text">Password</p>
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
                <div className="d-flex justify-content-center flex-column m-4">
                  <input
                    className="sqr-btn1 py-2 px-3 mb-3 rounded"
                    type="submit"
                    value="SIGN IN"
                  />
                  <Link to="/main">
                    <button className="p-2 sqr-btn2 rounded">CREATE ACCOUNT</button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Login