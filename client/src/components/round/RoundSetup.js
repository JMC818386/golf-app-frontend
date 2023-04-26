import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import "./Round.css";
import { API_URL } from "../../services/auth.constants";
import request from "../../services/api.request";
import { useGlobalState } from "../../context/GlobalState";

function RoundSetup() {
  let navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [state] = useGlobalState();

  useEffect(() => {
    if (!state.currentUser) {
      navigate("/login");
    }

    const getCourses = async () => {
      let config = {
        url: "/courses/",
        baseURL: API_URL,
        method: "get",
      };
      let response = await axios.request(config);
      setCourses(response.data);
    };

    getCourses();
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // POST new Round to database and then, save the round ID to state.
  const newRound = async (course, round_length, total_score) => {
    let config = {
      url: `/rounds/`,
      method: "post",
      data: {
        course,
        round_length,
        total_score,
      },
    };
    let response = await request(config);
    navigate(`/round/${response.data.id}/${response.data.course}`);
    // setCurrentRound(response.data);
    // currentRoundRef.current = response.data;
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // const [currentRound, setCurrentRound] = useState(null);
  // const currentRoundRef = useRef(null);

  // useEffect(() => {
  //   if (currentRoundRef.current) {
  //     setCurrentRound(currentRoundRef.current);
  //   }
  // }, [currentRoundRef.current]);

  // console.log(currentRound);

  return (
    <div className="container d-flex justify-content-center vh-100">
      <div className="row mt-5">
        <div className="col mt-5">
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center mb-4 text-light">
              <h1>Select a Course</h1>
            </div>
            <input
              type="text"
              placeholder="Search Courses"
              value={searchValue}
              className="border-0 p-1"
              onChange={handleSearchChange}
            />
            <div className="containter">
              <div className="row">
                <div className="col names mb-5 d-flex flex-column justify-content-center">
                  {filteredCourses.map((course) => (
                    <button
                      className="px-3 py-2 sqr-btn2"
                      key={course.id}
                      onClick={() => handleCourseClick(course.id)}
                    >
                      {course.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="d-flex justify-content-center mt-5 text-light">
              <h1>Round Setup</h1>
            </div> */}
            {/* <div className="container d-flex justify-content-center">
              <div className="row d-flex">
                <div className="col-6 d-flex flex-row">

                  <button className="mx-3 my-4 px-4 py-3 sqr-btn2">9</button>
                  <button className="mx-3 my-4 px-4 py-3 sqr-btn2">18</button>
                </div>
              </div>
            </div> */}
            <div className="container d-flex justify-content-center">
              <div className="row">
                <div className="col">
                  {/* <button onClick={() => newRound(selectedCourse, 18, 0)}>
                    submit round
                  </button> */}
                  <button
                    onClick={() => newRound(selectedCourse, 18, 0)}
                    className="m-1 p-3 sqr-btn1"
                    disabled={!selectedCourse}
                  >
                    BEGIN ROUND
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoundSetup;
