import { useState, useEffect } from "react";
import "./Round.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import RoundScorecard from "./RoundScorecard";

const BASE_URL =
  "https://8000-jmc818386-golfapp-5cplpf2dlek.ws-us94.gitpod.io/api/";

function Round() {
  const [holes, setHoles] = useState([]);
  // When you click click Complete Hole, make a PATCH request to update the round
  // Have another useEffect to get the Round data to update everytime round data changes
  // Save that round data into scores hook
  // Pass scores as props to RoundScorecard
  // Access scores within scorecard
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getHoles = async () => {
      let config = {
        url: "/holes/",
        baseURL: BASE_URL,
        method: "get",
      };
      let response = await axios.request(config);
      setHoles(response.data);
    };
    getHoles();
  }, []);

  console.log(holes);

  return (
    <div>
      <div className="container w-75 p-3 d-flex justify-content-center align-items-center vh-100">
        {/* {holes.map((hole) => { */}
        <div className="row d-flex justify-content-center">
          <div
            className="col vstack gap-1 d-flex justify-content-center"
            key={holes[0]?.id}
          >
            <div className="row d-flex box rounded align-items-baseline mb-2">
              <div className="col-4 text-light s-text">
                <p className="s-text d-flex justify-content-center align-items-center">
                  {holes[0]?.distance} yards
                </p>
              </div>
              <div className="col-4 text-light">
                <h1 className="l-text d-flex justify-content-center">
                  {holes[0]?.number}
                </h1>
              </div>
              <div className="col-4 text-light s-text">
                <p className="s-text d-flex justify-content-center">
                  Par {holes[0]?.par}
                </p>
              </div>
            </div>

            <div className="row d-flex box rounded mb-2">
              <div className="col-4 text-light xs-text pt-2">
                <p className="d-flex justify-content-center">DISTANCE</p>
                <p className="l-text d-flex justify-content-center">-</p>
              </div>
              <div className="col-4 text-light">
                <p className="s-text d-flex justify-content-center pt-2">STOKES</p>
                <h1 className="l-text d-flex justify-content-center">0</h1>
              </div>
              <div className="col-4 text-light s-text">
                <p className="s-text d-flex justify-content-center pt-2">-/+</p>
                <h1 className="l-text d-flex justify-content-center">-</h1>
              </div>
            </div>

            <div className="row d-flex box rounded mb-2 px-5">
              <div className="col-4 text-light xs-text d-flex justify-content-center py-4">
                <button className="m-text rounded-circle px-4 circle-btn">-</button>
              </div>
              <div className="col-4 text-light">
                <p className="s-text d-flex justify-content-center pt-2">SWINGS</p>
                <h1 className="l-text d-flex justify-content-center align-items-center">
                  0
                </h1>
              </div>
              <div className="col-4 text-light s-text d-flex justify-content-center py-4">
                <button className="m-text rounded-circle px-4 circle-btn">+</button>
              </div>
            </div>

            <div className="row d-flex box rounded px-5">
              <div className="col-4 text-light xs-text d-flex justify-content-center py-4">
                <button className="m-text rounded-circle px-4 circle-btn">-</button>
              </div>
              <div className="col-4 text-light">
                <p className="s-text d-flex justify-content-center pt-2">PUTTS</p>
                <h1 className="l-text d-flex justify-content-center align-items-center">
                  0
                </h1>
              </div>
              <div className="col-4 text-light s-text d-flex justify-content-center py-4">
                <button className="m-text rounded-circle px-4 circle-btn">+</button>
              </div>
            </div>

            <RoundScorecard scores={scores} />

            <button className="sqr-btn1 rounded">COMPLETE HOLE</button>
            <button className="sqr-btn2 rounded">MAIN MENU</button>
          </div>
        </div>
        ;{/* })} */}
      </div>
    </div>
  );
}

export default Round;
