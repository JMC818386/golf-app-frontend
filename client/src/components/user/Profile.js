import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./User.css";
import { useGlobalState } from "../../context/GlobalState";

const Profile = () => {
  const [state, dispatch] = useGlobalState();

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="row  d-flex justify-content-center mt-5">
        <div className="d-flex flex-column mt-5">
          <h1 className="l-text d-flex justify-content-center">
            Your user id number is: {state.currentUser.user_id}.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
