import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./User.css";
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  let navigate = useNavigate();
  
  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordConf: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    AuthService.register(user).then(() => navigate("/profile"));
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <div className="c-form">
            <form onSubmit={handleRegister}>
              <p className="d-flex justify-content-center mt-4 mb-1 s-text">
                Username
              </p>
              <div className="d-flex justify-content-center">
                <label htmlFor="username"></label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="rounded border-0 mb-3"
                  onChange={(e) => handleChange("username", e.target.value)}
                  required
                />
              </div>
              <p className="d-flex justify-content-center mt-2 mb-1 s-text">
                Email
              </p>
              <div className="d-flex justify-content-center">
                <label htmlFor="email"></label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="rounded border-0 mb-3"
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>
              <p className="d-flex justify-content-center mt-2 pb-1 mb-1 s-text">
                Password
              </p>
              <div className="d-flex justify-content-center">
                <label htmlFor="pass"></label>
                <input
                  type="password"
                  id="pass"
                  name="password"
                  className="rounded border-0 mb-3"
                  minLength="8"
                  required
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </div>
              <p className="d-flex justify-content-center mt-2 mb-1 s-text">
                Confirm Password
              </p>
              <div className="d-flex justify-content-center">
                <label htmlFor="passConf"></label>
                <input
                  type="password"
                  id="passConf"
                  name="password"
                  className="rounded border-0 mb-3"
                  minLength="8"
                  required
                  onChange={(e) => handleChange("passwordConf", e.target.value)}
                />
              </div>
              <p className="d-flex justify-content-center mt-2 mb-1 s-text">
                First Name
              </p>
              <div className="d-flex justify-content-center">
                <label htmlFor="firstName"></label>
                <input
                  type="text"
                  id="firstName"
                  name="fname"
                  className="rounded border-0 mb-3"
                  required
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>
              <p className="d-flex justify-content-center mt-2 mb-1 s-text">
                Last Name
              </p>
              <div className="d-flex justify-content-center">
                <label htmlFor="lastName"></label>
                <input
                  type="text"
                  id="lastName"
                  name="lname"
                  className="rounded border-0"
                  required
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-center flex-column m-4">
                  <input
                    type="submit"
                    value="Register"
                    className="p-2 sqr-btn1 mt-3 px-4 rounded"
                    disabled={
                      user.password &&
                      user.password.length >= 8 &&
                      user.password === user.passwordConf &&
                      user.firstName &&
                      user.lastName &&
                      user.email
                        ? false
                        : true
                    }
                  />
                    
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
