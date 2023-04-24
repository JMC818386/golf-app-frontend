import { useState, useEffect } from "react";
import "./Round.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import HoleEntry from "./HoleEntry";
import RoundScorecard from "./RoundScorecard";
import { useParams } from "react-router-dom";
import { API_URL } from "../../services/auth.constants";
import { useGlobalState } from "../../context/GlobalState";
import request from "../../services/api.request";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/GlobalState";

// When you click Complete Hole, make a PATCH request to update the round
// Have another useEffect to get the Round data to update everytime round data changes
// Save that round data into scores hook
// Pass scores as props to RoundScorecard
// Access scores within scorecard
function Round() {
  let navigate = useNavigate();
  let { roundId, courseId } = useParams();
  // const { authToken } = useAuth();
  const [state, dispatch] = useGlobalState();

  const [holes, setHoles] = useState([]);
  const [scores, setScores] = useState([]);
  // const [scores, setScores] = useState(
  //   Array(holes.length).fill({ strokeCount: 0, swingCount: 0, puttCount: 0 })
  // );
  const [currentHole, setCurrentHole] = useState(0);
  // const [courseId, setCourseId] = useState(0);
  // TODO: set up a roundId state variable
  const [strokeCount, setStrokeCount] = useState(0);
  const [swingCount, setSwingCount] = useState(0);
  const [puttCount, setPuttCount] = useState(0);
  const [swingFadeClass, setSwingFadeClass] = useState("");
  const [puttFadeClass, setPuttFadeClass] = useState("");
  const [distance, setDistance] = useState(null);
  const [holeStrokes, setHoleStrokes] = useState(Array(18).fill(0));


  const handleCompleteHoleClick = (holeNumber, strokes) => {
    // Update the stroke count for the given hole
    const newHoleStrokes = [...holeStrokes];
    newHoleStrokes[holeNumber - 1] = strokes;
    setHoleStrokes(newHoleStrokes);
  };

  const frontNineScore = holeStrokes.slice(0, 9).reduce((a, b) => a + b, 0);
  const backNineScore = holeStrokes.slice(9).reduce((a, b) => a + b, 0);
  const totalScore = frontNineScore + backNineScore;

  //Distance from green calcuation function:
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const R = 6371e3;
        const φ1 = (latitude * Math.PI) / 180;
        const φ2 = (37.9891992 * Math.PI) / 180;
        const Δφ = ((37.9891992 - latitude) * Math.PI) / 180;
        const Δλ = ((-84.4722445 - longitude) * Math.PI) / 180;

        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = (R * c) / 0.9144;

        setDistance(Math.round(d));
        if (distance === 0) {
          return (
            <div className="loading">
              <div className="spinner"></div>
              <h1></h1>
            </div>
          );
        }
      });
    }
  }, [currentHole]);

  // This gets all the hole information based on rounds
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

  const updateScore = (newScore) => {
    const newScores = [...scores];
    newScores[currentHole] = newScore;
    setScores(newScores);
  };

  const completeHole = async () => {
    // TODO: POST Hole Score to Round
    updateScore(scores[currentHole]);
    // const { strokeCount, swingCount, puttCount } = scores[currentHole];
    let config = {
      url: `/hole-scores/`,
      method: "post",
      data: {
        hole_round: roundId,
        hole: holes[currentHole].number,
        strokes: strokeCount,
        swings: swingCount,
        putts: puttCount,
      },
    };

    let response = await request(config);
    setCurrentHole(currentHole + 1);
    setStrokeCount(0);
    setSwingCount(0);
    setPuttCount(0);
    // console.log(currentHole);
  };

  const completeRound = () => {
    updateScore();
    navigate("/round-history");
  }


  // console.log(holes);

  const SwingIncrement = () => {
    setSwingFadeClass("fade-out");
    setTimeout(() => {
      setSwingCount(swingCount + 1);
      setStrokeCount(strokeCount + 1);
      setSwingFadeClass("fade-in");
    }, 300);
  };

  const SwingDecrement = () => {
    if (swingCount > 0) {
      setSwingFadeClass("fade-out");
      setTimeout(() => {
        setSwingCount(swingCount - 1);
        setStrokeCount(strokeCount - 1);
        setSwingFadeClass("fade-in");
      }, 300);
    }
  };

  const PuttIncrement = () => {
    setPuttFadeClass("fade-out");
    setTimeout(() => {
      setPuttCount(puttCount + 1);
      setStrokeCount(strokeCount + 1);
      setPuttFadeClass("fade-in");
    }, 300);
  };

  const PuttDecrement = () => {
    if (puttCount > 0) {
      setPuttFadeClass("fade-out");
      setTimeout(() => {
        setPuttCount(puttCount - 1);
        setStrokeCount(strokeCount - 1);
        setPuttFadeClass("fade-in");
      }, 300);
    }
  };

  const isLastHole = currentHole === holes.length - 1;

  if (holes.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <h1></h1>
      </div>
    );
  }

  return (
    <div>
      <div className="container p-3 d-flex justify-content-center align-items-center h-100">
        {/* {holes.map((hole) => { */}
        <div className="row d-flex justify-content-center">
          {/* <p>{courseId}</p> */}
          <div
            className="col vstack gap-1 d-flex justify-content-center"
            key={holes[currentHole]?.id}
          >
            <div className="row d-flex box rounded align-items-baseline mb-2">
              <div className="col-4 text-light s-text">
                <p className="s-text d-flex justify-content-center">
                  {holes[currentHole]?.distance} yards
                </p>
              </div>
              <div className="col-4 text-light d-flex justify-content-center align-items-center">
                <h1 className="xl-text d-flex justify-content-center pt-2 pb-0">
                  {holes[currentHole]?.number}
                </h1>
              </div>
              <div className="col-4 text-light s-text">
                <p className="s-text d-flex justify-content-center">
                  Par {holes[currentHole]?.par}
                </p>
              </div>
            </div>

            <div className="row d-flex box rounded mb-2">
              <div className="col-4 text-light xs-text pt-1">
                <p className="d-flex justify-content-center">DISTANCE</p>
                <p className="s-text d-flex justify-content-center pt-2 orange-text">
                  {distance} yards
                </p>
              </div>
              <div className="col-4 text-light">
                <p className="s-text d-flex justify-content-center mb-1 pt-1">
                  STROKES
                </p>
                <div className={`${swingFadeClass}`}>
                  <h1
                    className={`l-text d-flex justify-content-center ${puttFadeClass}`}
                  >
                    {strokeCount}
                  </h1>
                </div>
              </div>
              <div className="col-4 text-light s-text">
                <p className="s-text d-flex justify-content-center pt-1">-/+</p>
                <h1 className="l-text d-flex justify-content-center"></h1>
              </div>
            </div>

            <div className="row d-flex box rounded mb-2 px-5">
              <div className="col-4 text-light xs-text d-flex justify-content-center py-4">
                <button
                  onClick={SwingDecrement}
                  className="m-text rounded-circle px-4 circle-btn dec"
                >
                  -
                </button>
              </div>
              <div className="col-4 text-light">
                <p className="s-text d-flex justify-content-center mb-0 pt-2">
                  SWINGS
                </p>
                <h1
                  className={`l-text d-flex justify-content-center align-items-center ${swingFadeClass}`}
                >
                  {swingCount}
                </h1>
              </div>
              <div className="col-4 text-light s-text d-flex justify-content-center py-4">
                <button
                  onClick={SwingIncrement}
                  className="m-text rounded-circle px-3 circle-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="row d-flex box rounded px-5">
              <div className="col-4 text-light xs-text d-flex justify-content-center py-4">
                <button
                  onClick={PuttDecrement}
                  className="m-text rounded-circle px-4 circle-btn dec"
                >
                  -
                </button>
              </div>
              <div className="col-4 text-light">
                <p className="s-text d-flex justify-content-center mb-0 pt-2">
                  PUTTS
                </p>
                <h1
                  className={`l-text d-flex justify-content-center align-items-center ${puttFadeClass}`}
                >
                  {puttCount}
                </h1>
              </div>
              <div className="col-4 text-light s-text d-flex justify-content-center py-4">
                <button
                  onClick={PuttIncrement}
                  className="m-text rounded-circle px-3 circle-btn"
                >
                  +
                </button>
              </div>
            </div>

          {/* Scorecard Tables */}
            <div>
              <table className="table">
                {/* thead is your top HEADER row of table */}
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">1</th>
                    <th scope="col">2</th>
                    <th scope="col">3</th>
                    <th scope="col">4</th>
                    <th scope="col">5</th>
                    <th scope="col">6</th>
                    <th scope="col">7</th>
                    <th scope="col">8</th>
                    <th scope="col">9</th>
                    <th scope="col">36</th>
                    <th scope="col">-</th>
                  </tr>
                </thead>
                <tbody>
                  {/* tr a row in the table */}
                  <tr>
                    <td>F</td>
                    {holeStrokes.slice(0, 9).map((strokes, index) => (
                      <td key={index}>{strokes}</td>
                    ))}
                    <td>{frontNineScore}</td>
                  </tr>
                </tbody>
              </table>

              <table className="table">
                {/* thead is your top HEADER row of table */}
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">10</th>
                    <th scope="col">11</th>
                    <th scope="col">12</th>
                    <th scope="col">13</th>
                    <th scope="col">14</th>
                    <th scope="col">15</th>
                    <th scope="col">16</th>
                    <th scope="col">17</th>
                    <th scope="col">18</th>
                    <th scope="col">36</th>
                    <th scope="col">72</th>
                  </tr>
                </thead>
                <tbody>
                  {/* tr a row in the table */}
                  <tr>
                    <td>B</td>
                    {holeStrokes.slice(9).map((strokes, index) => (
                      <td key={index + 9}>{strokes}</td>
                    ))}
                    <td>{backNineScore}</td>
                    <td>{totalScore}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {isLastHole ? (
              <button className="sqr-btn1 rounded" onClick={() => {completeHole(); completeRound();}}>COMPLETE ROUND</button>
            ) : (
              <button className="sqr-btn1 rounded" onClick={() => {completeHole(); handleCompleteHoleClick(currentHole + 1, strokeCount);}}>
                COMPLETE HOLE
              </button>
            )}
          </div>
        </div>
        {/* })} */}
      </div>
    </div>
  );
}

export default Round;
