import "bootstrap/dist/css/bootstrap.css";
import "./Round.css";
import RoundScorecard from "./RoundScorecard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/auth.constants";
import request from "../../services/api.request";

function RoundCard({ rounds = [] }) {
  const [scores, setScores] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortOrder, setSortOrder] = useState("stroke_total");
  //   This is what the JSX will look like now, but you will need to map over all rounds when you have more than one which could change that slightly.
  //   console.log(rounds[0]?.course_name);
  // console.log(rounds);

  useEffect(() => {
    const getRoundScores = async () => {
      let config = {
        url: `/rounds/`,
        baseURL: API_URL,
        method: "get",
      };
      let response = await axios.request(config);
      setScores(response.data);
      console.log(response.data)
    };
    getRoundScores();
  }, []);

  const handleSortDirectionChange = (event) => {
    setSortDirection(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedRounds = rounds.sort((a, b) => {
    if (sortOrder === "stroke_total") {
      return sortDirection === "asc"
        ? a.stroke_total - b.stroke_total
        : b.stroke_total - a.stroke_total;
    } else {
      return sortDirection === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date);
    }
  });

  // //Sorts stroke_total from highest to lowest (DESC)
  // rounds.sort((a, b) => b.stroke_total - a.stroke_total);

  // //Sorts stroke_total from highest to lowest (DESC)
  // rounds.sort((a, b) => a.stroke_total - b.stroke_total);
  
  return (
    <div className="container mx-3 my-5">
      <div className="row d-flex align-items-center justify-content-center flex-row mb-3">
        <div className="col-6 d-flex flex-column direction">
          <label htmlFor="sort-direction">Sort Direction:</label>
          <div className="div">
            <select
              id="sort-direction"
              className="form-select mx-2 sort-direction"
              value={sortDirection}
              onChange={handleSortDirectionChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="col-6 d-flex justify-content-center flex-column sort">
          <label htmlFor="sort-order">Sort Order:</label>
          <div className="div">
            <select
              id="sort-order"
              className="form-select mx-2 sort-direction"
              value={sortOrder}
              onChange={handleSortOrderChange}
              >
              <option value="stroke_total">Total Strokes</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>
      </div>
      {rounds.map((round) => (
        <div key={round.id} className="container card d-flex justify-content-center mb-3">
          <div className="row d-flex flex-row">
            <div className="col-8 pt-2 px-4">
              <div className="div ml-3">
                <p className="mb-1 course-name">{round.course_name}</p>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div className="mr-5">
                  <p className="s-text-mont mb-0">{round.formatted_date}</p>
                  <div className="px-3">
                    <p className="sm-text-score mb-0">
                      {round.strokes_difference}
                    </p>
                  </div>
                  <p className="s-text-mont mb-0">Putts | {round.putt_total}</p>
                </div>

                <div className="score-total ml-auto">
                  <p className="my-0 text-light">{round.stroke_total}</p>
                </div>
              </div>
            </div>
            <div className="col-4 pt-2 pr-5 score-type">
              <p className="s-text-mont mb-1">
                EAGLES | {round.hole_scores.counts.eagles}
              </p>
              <p className="s-text-mont mb-1">
                BIRDIES | {round.hole_scores.counts.birdies}
              </p>
              <p className="s-text-mont mb-1">
                PARS | {round.hole_scores.counts.pars}
              </p>
              <p className="s-text-mont mb-1">
                BOGIES | {round.hole_scores.counts.bogeys}
              </p>
              <p className="s-text-mont mb-1">
                BOGIES+ | {round.hole_scores.counts.bogey_plus}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <RoundScorecard scores={round.hole_scores.scores} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoundCard;
