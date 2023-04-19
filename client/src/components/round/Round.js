import { useState, useEffect } from "react";
import "./Round.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import HoleEntry from "./HoleEntry";
import RoundScorecard from "./RoundScorecard";
import { useParams } from "react-router-dom";

const BASE_URL =
  "https://8000-jmc818386-golfapp-5cplpf2dlek.ws-us94.gitpod.io/api/";

// When you click Complete Hole, make a PATCH request to update the round
// Have another useEffect to get the Round data to update everytime round data changes
// Save that round data into scores hook
// Pass scores as props to RoundScorecard
// Access scores within scorecard
function Round() {
  let { courseId } = useParams();

  const [scores, setScores] = useState([]);
  //useEffect to call API for course/hole information
  //array of holes
  const [holes, setHoles] = useState([]);
  const [currentHole, SetCurrentHole] = useState(0);

  const completeHole = () => {
    // const currentIndex = holes.indexOf(currentHole);
    // const nextIndex = (currentIndex + 1) % holes.length;
    SetCurrentHole(currentHole + 1);
    console.log(currentHole);
  };

  useEffect(() => {
    const getHoles = async () => {
      let config = {
        url: `/holes/?selected_course=${courseId}`,
        baseURL: BASE_URL,
        method: "get",
      };
      let response = await axios.request(config);
      // let data = response.data.map(hole => ({
      //   course_id: hole.course_id,
      //   number: hole.number,
      //   par: hole.par,
      //   distance: hole.distance
      // }));
      setHoles(response.data);
    };
    getHoles();
  }, []);

  console.log(holes);

  if (holes.length == 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="container w-75 p-3 d-flex justify-content-center align-items-center h-100">
        {/* {holes.map((hole) => { */}
        <div className="row d-flex justify-content-center">
          <div
            className="col vstack gap-1 d-flex justify-content-center"
            key={holes[currentHole]?.id}
          >
            <div className="row d-flex box rounded align-items-baseline mb-2">
              <div className="col-4 text-light s-text">
                <p className="s-text d-flex justify-content-center align-items-center">
                  {holes[currentHole]?.distance} yards
                </p>
              </div>
              <div className="col-4 text-light">
                <h1 className="l-text d-flex justify-content-center">
                  {holes[currentHole]?.number}
                </h1>
              </div>
              <div className="col-4 text-light s-text">
                <p className="s-text d-flex justify-content-center">
                  Par {holes[currentHole]?.par}
                </p>
              </div>
            </div>

            <HoleEntry setScores={setScores} scores={scores} holes={holes} />
            <RoundScorecard scores={scores} />

            <button className="sqr-btn1 rounded" onClick={completeHole}>
              COMPLETE HOLE
            </button>
            <button className="sqr-btn2 rounded">MAIN MENU</button>
          </div>
        </div>
        {/* })} */}
      </div>
    </div>
  );
}

export default Round;
