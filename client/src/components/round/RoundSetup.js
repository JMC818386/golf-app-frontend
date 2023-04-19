import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import "./Round.css";

const BASE_URL =
  "https://8000-jmc818386-golfapp-5cplpf2dlek.ws-us94.gitpod.io/api/";

function RoundSetup() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      let config = {
        url: "/courses/",
        baseURL: BASE_URL,
        method: "get",
      };
      let response = await axios.request(config);
      setCourses(response.data);
    };

    getCourses();
   
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  console.log(filteredCourses);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBeginRound = () => {
    console.log(selectedCourse);
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center mb-4 text-light">
              <h1>Round Setup</h1>
            </div>
            <input
              type="text"
              placeholder="Search Courses"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <div className="containter">
              <div className="row">
                <div className="col d-flex flex-column justify-content-center">
                  {filteredCourses.map((course) => (
                  <button className="p-2 sqr-btn2" key={course.id} onClick={() => handleCourseClick(course.name)}>{course.name}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-5 text-light">
              <h1>Round Setup</h1>
            </div>
            <div className="container d-flex justify-content-center">
              <div className="row d-flex">
                <div className="col-6 d-flex flex-row">

                  <button className="mx-3 my-4 px-4 py-3 sqr-btn2">9</button>
                  <button className="mx-3 my-4 px-4 py-3 sqr-btn2">18</button>
                </div>
              </div>
            </div>
            <div className="container d-flex justify-content-center">
              <div className="row">
                <div className="col">
                {/* <Link to="/round:courseId" className="m-2 p-3 sqr-btn1">
                  BEGIN ROUND
                </Link> */}
                <Link to="/round:courseId">
                  <button className="m-2 p-3 sqr-btn1" onClick={handleBeginRound} disabled={!selectedCourse}>BEGIN ROUND</button>
                </Link>
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
