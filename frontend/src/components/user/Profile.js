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
    <div className="d-flex mt-5">
      <div className="box profile d-flex justify-content-center mt-5 p-5">
        <div className="div">
          <div className="container d-flex justify-content-center">
            <div className="row d-flex justify-content-center">
              <div className="col d-flex justify-content-center mt-4">
                <h1 className="m-text d-flex justify-content-center mx-1">Chip</h1>
                <h1 className="m-text d-flex justify-content-center mx-1 mb-1">McPutterson</h1>
              </div>
              <div className="col-3 d-flex flex-column justify-content-center">
                <h1 className="xxl-text d-flex justify-content-center mb-0">80</h1>
                <p className="xs-text d-flex justify-content-center mb-0">ROUND</p>
                <p className="xs-text d-flex justify-content-center mb-3">AVERAGE</p>
              </div>
            </div>
          </div>
          <div className="container d-flex justify-content-center">
            <div className="row d-flex justify-content-center">
              <div className="col d-flex justify-content-center">
                <h1 className="s-text d-flex justify-content-center mx-1">Overall Statistics</h1>
              </div>
            </div>
          </div>
          <div className="container d-flex justify-content-center mt-2">
            <div className="row d-flex justify-content-center">
              <div className="col-4 d-flex flex-column justify-content-center">
                <p className="xs-text d-flex justify-content-center mb-0">ROUNDS</p>
                <h1 className="l-text d-flex justify-content-center">25</h1>
              </div>
              <div className="col-4 d-flex flex-column justify-content-center">
                <p className="xs-text d-flex justify-content-center mb-0 mx-4">-/+</p>
                <h1 className="l-text d-flex justify-content-center pt-0 mt-0">+8</h1>
              </div>
              <div className="col-4 d-flex flex-column justify-content-center">
                <p className="xs-text d-flex justify-content-center mb-0">PUTTS</p>
                <h1 className="l-text d-flex justify-content-center pt-0 mt-0">36</h1>
              </div>
            </div>
          </div>
          <div className="container d-flex justify-content-center mt-2">
            <div className="row d-flex justify-content-center">
              <div className="col-4 d-flex flex-column justify-content-center">
                <p className="xs-text d-flex justify-content-center mb-0">PARS</p>
                <h1 className="l-text d-flex justify-content-center">12</h1>
              </div>
              <div className="col-4 d-flex flex-column justify-content-center">
                <p className="xs-text d-flex justify-content-center mb-0 mx-4">BIRDIES</p>
                <h1 className="l-text d-flex justify-content-center">3</h1>
              </div>
              <div className="col-4 d-flex flex-column justify-content-center">
                <p className="xs-text d-flex justify-content-center mb-0">EAGLES</p>
                <h1 className="l-text d-flex justify-content-center pt-0 mt-0">0</h1>
              </div>
            </div>
          </div>
          <div className="container d-flex justify-content-center mt-2">
            <div className="row d-flex justify-content-center">
              <div className="col-4 d-flex flex-column justify-content-center">
                <p className="xs-text d-flex justify-content-center mb-0">BOGIES</p>
                <h1 className="l-text d-flex justify-content-center">0</h1>
              </div>
              <div className="col-4 d-flex flex-column justify-content-center">
                <p className="xs-text d-flex justify-content-center mb-0 mx-4">BOGIES+</p>
                <h1 className="l-text d-flex justify-content-center">0</h1>
              </div>
              <div className="col-4 d-flex flex-column justify-content-center">
                <p className="xs-text d-flex justify-content-center mb-0">BOGIES++</p>
                <h1 className="l-text d-flex justify-content-center pt-0 mt-0">0</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Profile;

  {/* Welcome! Your user id number is: {state.currentUser?.user_id}. */}


{/* <div className="div">
  <a href="/main">Start Your First Round</a>
</div> */}
