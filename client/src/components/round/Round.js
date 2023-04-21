import { useState, useEffect } from "react";
import "./Round.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import HoleEntry from "./HoleEntry";
import RoundScorecard from "./RoundScorecard";
import { useParams } from "react-router-dom";
import { API_URL } from "../../services/auth.constants";

// When you click Complete Hole, make a PATCH request to update the round
// Have another useEffect to get the Round data to update everytime round data changes
// Save that round data into scores hook
// Pass scores as props to RoundScorecard
// Access scores within scorecard
function Round() {
  let { roundId, courseId } = useParams();

  const [scores, setScores] = useState([]);
  const [holes, setHoles] = useState([]);
  const [currentHole, setCurrentHole] = useState(0);
  // const [courseId, setCourseId] = useState(0);
  // TODO: set up a roundId state variable

  useEffect(() => {
    // const viewRound = async () => {
    //   let config = {
    //     url: `/rounds/${roundId}`,
    //     baseURL: BASE_URL,
    //     method: "get",
    //   };
    //   let response = await axios.request(config);
    //   console.log(response.data);
    //   currentRound(response.data);
    // };
    // viewRound();

    const getHoles = async () => {
      let config = {
        url: `/holes/`,
        baseURL: API_URL,
        method: "get",
        params: {
          selected_course: courseId,
        },
      };
      let response = await axios.request(config);
      setHoles(response.data);
    };
    getHoles();
  }, [courseId]);

  // const updateScore = (newScore) => {
  //   let newScores = [...scores];
  //   newScores[currentHole] = newScore;
  //   setScores(newScores)
  // }

  const completeHole = () => {
    // TODO: POST Hole Score to Round
    // const { strokeCount, swingCount, puttCount } = scores[currentHole];
    //   let config = {
    //     url: `/hole-scores/${roundId}`,
    //     method:"patch",
    //     data: {
    //       hole_scores_attributes: [
    //         {
    //           course_id: courseId,
    //           hole_id: holes[currentHole].id,
    //           stroke: strokeCount,
    //           swing: swingCount,
    //           putt: puttCount,
    //         },
    //       ],
    //     },
    //   };
    //   let response = axios.request(config);
    //   completeHole(response.data);
      setCurrentHole(currentHole + 1);
    // console.log(currentHole);
  };

  // console.log(holes);

  if (holes.length === 0) {
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
          </div>
        </div>
        {/* })} */}
      </div>
    </div>
  );
}

export default Round;
