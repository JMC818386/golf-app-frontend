import "bootstrap/dist/css/bootstrap.css";
import "./Round.css";
import RoundScorecard from "./RoundScorecard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/auth.constants";
import request from "../../services/api.request";

function RoundCard({ rounds = [] }) {
  const [scores, setScores] = useState([]);
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortOrder, setSortOrder] = useState("date");
  const [filter, setFilter] = useState("");

  const uniqueCourseNames = [...new Set(rounds.map(round => round.course_name))];

  useEffect(() => {
    const getRoundScores = async () => {
      let config = {
        url: `/rounds/`,
        baseURL: API_URL,
        method: "get",
      };
      let response = await axios.request(config);
      setScores(response.data);
      console.log(response.data);
    };
    getRoundScores();
  }, []);

  const handleSortDirectionChange = (event) => {
    setSortDirection(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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

  const filteredRounds = filter
    ? sortedRounds.filter((round) => round.course_name.includes(filter))
    : sortedRounds;

  return (
    <div className="containermx-3">
      <div className="row d-flex align-items-center justify-content-center flex-row mb-3">
        <div className="col-6 d-flex justify-content-center flex-column sort s-text">
          <div className="form-check">
            <input
              type="checkbox"
              id="sort-by-total-score"
              className="form-check-input mx-2"
              checked={sortOrder === "stroke_total"}
              onChange={handleSortOrderChange}
              value="stroke_total"
            />
            <label htmlFor="sort-by-total-score" className="form-check-label">
              Total Score
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="sort-by-date"
              className="form-check-input mx-2"
              checked={sortOrder === "date"}
              onChange={handleSortOrderChange}
              value="date"
            />
            <label htmlFor="sort-by-date" className="form-check-label">
              Date
            </label>
          </div>
        </div>

        <div className="col-6 d-flex flex-column direction s-text">
          <div className="form-check">
            <input
              type="checkbox"
              id="sort-direction-asc"
              className="form-check-input mx-2"
              checked={sortDirection === "asc"}
              onChange={handleSortDirectionChange}
              value="asc"
            />
            <label htmlFor="sort-direction-asc" className="form-check-label">
              Ascending
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="sort-direction-desc"
              className="form-check-input mx-2"
              checked={sortDirection === "desc"}
              onChange={handleSortDirectionChange}
              value="desc"
            />
            <label htmlFor="sort-direction-desc" className="form-check-label">
              Descending
            </label>
          </div>
        </div>

        <div className="row d-flex justify-content-center flex-column s-text">
          <div className="col justify-content-center">
            <span className="d-flex justify-content-center mt-3">Filter by Course</span>
            <div className="input-group d-flex justify-content-center">
              <select
                className="form-control filter s-text "
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="">All Courses</option>
                {uniqueCourseNames.map((courseName) => (
                  <option key={courseName} value={courseName}>
                    {courseName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {filteredRounds.map((round) => (
        <div
          key={round.id}
          className="container card d-flex justify-content-center mb-3"
        >
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
