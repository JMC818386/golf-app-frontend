import { useState, useEffect } from "react";
import "./Round.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Outlet, useParams } from "react-router-dom";
import { API_URL } from "../../services/auth.constants";
import { useGlobalState } from "../../context/GlobalState";
import request from "../../services/api.request";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import BottomNav from "../BottomNav";

function Round() {
  let navigate = useNavigate();
  let { roundId, courseId } = useParams();
  const [state, dispatch] = useGlobalState();
  const [holes, setHoles] = useState([]);
  const [scores, setScores] = useState([]);
  const [currentHole, setCurrentHole] = useState(0);
  const [strokeCount, setStrokeCount] = useState(0);
  const [swingCount, setSwingCount] = useState(0);
  const [puttCount, setPuttCount] = useState(0);
  const [swingFadeClass, setSwingFadeClass] = useState("");
  const [puttFadeClass, setPuttFadeClass] = useState("");
  const [strokeFadeClass, setStrokeFadeClass] = useState("");
  const [distance, setDistance] = useState(null);
  const [holeStrokes, setHoleStrokes] = useState(Array(18).fill(0));
  const [round, setRound] = useState([]);
  const [strokes, setStrokes] = useState(0);
  const [par, setPar] = useState(0);
  const [scoreDifference, setScoreDifference] = useState(0);

  const handleCompleteHoleClick = (holeNumber, strokes) => {
    const newHoleStrokes = [...holeStrokes];
    newHoleStrokes[holeNumber - 1] = strokes;
    setHoleStrokes(newHoleStrokes);
  };

  const frontNineScore = holeStrokes.slice(0, 9).reduce((a, b) => a + b, 0);
  const backNineScore = holeStrokes.slice(9).reduce((a, b) => a + b, 0);
  const totalScore = frontNineScore + backNineScore;

  // Load existing round data on mount
  useEffect(() => {
    const loadRoundData = async () => {
      try {
        let config = {
          url: `/rounds/${roundId}/`,
          method: "get",
        };
        let response = await request(config);
        setRound(response.data);

        // Load existing hole scores
        if (response.data.hole_scores && response.data.hole_scores.scores) {
          const existingScores = Array(18).fill(0);
          response.data.hole_scores.scores.forEach((score) => {
            existingScores[score.hole_number - 1] = score.strokes;
          });
          setHoleStrokes(existingScores);

          // Find the first hole without a score (next hole to play)
          const nextHoleIndex = existingScores.findIndex(score => score === 0);
          if (nextHoleIndex !== -1) {
            setCurrentHole(nextHoleIndex);
          } else {
            // All holes have scores, go to last hole
            setCurrentHole(17);
          }
        }
      } catch (error) {
        console.error('Error loading round data:', error);
      }
    };
    loadRoundData();
  }, [roundId]);

  const getRoundData = async () => {
    let config = {
      url: `/rounds/${roundId}/`,
      method: "get",
    };
    let response = await request(config);
    setRound(response.data);
  };


  useEffect(() => {
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
      // console.log(response.data);
    };
    getHoles();
  }, [courseId]);

  //Distance from green calcuation function:
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const R = 6371e3;
        const φ1 = (latitude * Math.PI) / 180;
        const φ2 = (holes[currentHole]?.latitude * Math.PI) / 180;
        const Δφ = ((holes[currentHole]?.latitude - latitude) * Math.PI) / 180;
        const Δλ =
          ((holes[currentHole]?.longitude - longitude) * Math.PI) / 180;

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
  }, [currentHole, distance]);

  const updateScore = (newScore) => {
    const newScores = [...scores];
    newScores[currentHole] = newScore;
    setScores(newScores);
  };

  const completeHole = async () => {
    updateScore(scores[currentHole]);
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
    setStrokeFadeClass("fade-out");
    setTimeout(() => {
      setStrokeCount(0);
      setSwingFadeClass("fade-in");
    }, 150);

    setSwingFadeClass("fade-out");
    setTimeout(() => {
      setSwingCount(0);
      setSwingFadeClass("fade-in");
    }, 150);

    setPuttFadeClass("fade-out");
    setTimeout(() => {
      setPuttCount(0);
      setPuttFadeClass("fade-in");
    }, 150);

    getRoundData();
  };

  const completeRound = () => {
    updateScore();
    // Clear active round from localStorage
    localStorage.removeItem('activeRoundId');
    localStorage.removeItem('activeRoundCourse');
    navigate("/round-history");
  };

  const SwingIncrement = () => {
    setSwingFadeClass("fade-out");
    setTimeout(() => {
      setSwingCount(swingCount + 1);
      setStrokeCount(strokeCount + 1);
      setSwingFadeClass("fade-in");
    }, 150);
  };

  const SwingDecrement = () => {
    if (swingCount > 0) {
      setSwingFadeClass("fade-out");
      setTimeout(() => {
        setSwingCount(swingCount - 1);
        setStrokeCount(strokeCount - 1);
        setSwingFadeClass("fade-in");
      }, 150);
    }
  };

  const PuttIncrement = () => {
    setPuttFadeClass("fade-out");
    setTimeout(() => {
      setPuttCount(puttCount + 1);
      setStrokeCount(strokeCount + 1);
      setPuttFadeClass("fade-in");
    }, 150);
  };

  const PuttDecrement = () => {
    if (puttCount > 0) {
      setPuttFadeClass("fade-out");
      setTimeout(() => {
        setPuttCount(puttCount - 1);
        setStrokeCount(strokeCount - 1);
        setPuttFadeClass("fade-in");
      }, 150);
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
    <div className="background">
      <NavBar />
      <Outlet />
      <div className="round-container">
        <div className="round-content">
          <div
            className="round-stack"
            key={holes[currentHole]?.id}
          >
            <p className="text-title d-flex justify-content-center mb-0">
              {holes[0]?.course_name}
            </p>
            <div className="row d-flex box rounded align-items-center mb-2">
              <div className="col-4 text-light s-text">
                <p className="d-flex xs-text justify-content-center mb-0">DISTANCE</p>
                <p className="s-text d-flex justify-content-center mb-0">
                  {holes[currentHole]?.distance} yards
                </p>
              </div>
              <div className="col-4 text-light d-flex justify-content-center align-items-center">
                <h1 className="xl-text d-flex justify-content-center pt-2 pb-0">
                  {holes[currentHole]?.number}
                </h1>
              </div>
              <div className="col-4 text-light s-text">
                <p className="s-text d-flex justify-content-center pt-3">
                  Par {holes[currentHole]?.par}
                </p>
              </div>
            </div>

            <div className="row box d-flex align-items-center rounded mb-2">
              <div className="col-4 text-light xs-text pt-1">
                <p className="d-flex justify-content-center mb-0 ">CURRENT DISTANCE</p>
                <p className="s-text d-flex justify-content-center orange-text mb-0">
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
                <h1 className="m-text d-flex justify-content-center">
                  {"-"}
                  {/* TODO: update the above line to the below line once to-par score is working */}
                  {/* {round.strokes_difference || "-"} */}
                </h1>
              </div>
            </div>

            <div className="row d-flex box rounded px-5 mb-2">
              <div className="col-4 text-light xs-text d-flex justify-content-center py-3">
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
              <div className="col-4 text-light s-text d-flex justify-content-center py-3">
                <button
                  onClick={SwingIncrement}
                  className="m-text rounded-circle px-3 circle-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="row d-flex box rounded px-5 mb-2">
              <div className="col-4 text-light xs-text d-flex justify-content-center py-3">
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
              <div className="col-4 text-light s-text d-flex justify-content-center py-3">
                <button
                  onClick={PuttIncrement}
                  className="m-text rounded-circle px-3 circle-btn"
                >
                  +
                </button>
              </div>
            </div>
            <div className="card mb-2">
              <table className="table table-sm">
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
                  <tr>
                    <td>F</td>
                    {holeStrokes.slice(0, 9).map((strokes, index) => {
                      const par = holes[index]?.par || 0;
                      const scoreClass = strokes && par ? (() => {
                        const diff = strokes - par;
                        if (diff <= -2) return 'eagle';
                        if (diff === -1) return 'birdie';
                        if (diff === 0) return 'par';
                        if (diff === 1) return 'bogey';
                        if (diff >= 2) return 'double-bogey';
                        return '';
                      })() : '';
                      return (
                        <td key={index}>
                          <span className={`score ${scoreClass}`}>
                            {strokes || '-'}
                          </span>
                        </td>
                      );
                    })}
                    <td>{frontNineScore || '-'}</td>
                    <td>-</td>
                  </tr>
                  <tr className="par-row">
                    <td>PAR</td>
                    {holes.slice(0, 9).map((hole, index) => (
                      <td key={`par-${index}`}>{hole?.par || '-'}</td>
                    ))}
                    <td>{holes.slice(0, 9).reduce((sum, hole) => sum + (hole?.par || 0), 0) || '-'}</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>

              <table className="table table-sm">
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
                  <tr>
                    <td>B</td>
                    {holeStrokes.slice(9).map((strokes, index) => {
                      const holeIndex = index + 9;
                      const par = holes[holeIndex]?.par || 0;
                      const scoreClass = strokes && par ? (() => {
                        const diff = strokes - par;
                        if (diff <= -2) return 'eagle';
                        if (diff === -1) return 'birdie';
                        if (diff === 0) return 'par';
                        if (diff === 1) return 'bogey';
                        if (diff >= 2) return 'double-bogey';
                        return '';
                      })() : '';
                      return (
                        <td key={holeIndex}>
                          <span className={`score ${scoreClass}`}>
                            {strokes || '-'}
                          </span>
                        </td>
                      );
                    })}
                    <td>{backNineScore || '-'}</td>
                    <td>{totalScore || '-'}</td>
                  </tr>
                  <tr className="par-row">
                    <td>PAR</td>
                    {holes.slice(9, 18).map((hole, index) => (
                      <td key={`par-${index + 9}`}>{hole?.par || '-'}</td>
                    ))}
                    <td>{holes.slice(9, 18).reduce((sum, hole) => sum + (hole?.par || 0), 0) || '-'}</td>
                    <td>{holes.reduce((sum, hole) => sum + (hole?.par || 0), 0) || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {isLastHole ? (
              <button
                className="sqr-btn1 rounded"
                onClick={() => {
                  completeHole();
                  completeRound();
                }}
              >
                COMPLETE ROUND
              </button>
            ) : (
              <button
                className="sqr-btn1 rounded"
                onClick={() => {
                  completeHole();
                  handleCompleteHoleClick(currentHole + 1, strokeCount);
                }}
              >
                COMPLETE HOLE
              </button>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default Round;
