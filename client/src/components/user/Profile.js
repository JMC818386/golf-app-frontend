import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./User.css";
import { useGlobalState } from "../../context/GlobalState";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [state, dispatch] = useGlobalState();
  let navigate = useNavigate();
  console.log(state);

  useEffect(() => {
    if (!state.currentUser) {
      navigate("/login");
    }
  });

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="row  d-flex justify-content-center mt-5">
        <div className="d-flex flex-column mt-5">
          <h1 className="l-text d-flex justify-content-center">
            Welcome! Your user id number is: {state.currentUser?.user_id}.
          </h1>
          <a href="/main">Start Your First Round</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
