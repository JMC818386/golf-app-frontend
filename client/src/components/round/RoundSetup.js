import React, { useState , useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Link } from "react-router-dom";

const BASE_URL = 'https://8000-jmc818386-golfapp-5cplpf2dlek.ws-us94.gitpod.io/api/'

function RoundSetup() {
    const [courses, setCourses] = useState ([])

    useEffect(() => {
        const getCourses = async () => {
            let config = {
                url:'/courses/',
                baseURL: BASE_URL,
                method: 'get',
            }
            let response = await axios.request(config);
            setCourses(response.data);
        }

        getCourses();
    }, [])

    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
    };
  
    const filteredCourses = courses.filter((course) =>
      course.name.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
          <div>
            <h1>Round Setup</h1>
            <input
            type="text"
            placeholder="Search Courses"
            value={searchValue}
            onChange={handleSearchChange}
            />
            <div>
                {filteredCourses.map((c) => <button className='d-flex column p-2' key={c.id}>{c.name}</button>)}
            </div>
            <div className="col-6 d-flex column">
                <button className="m-2 p-2">9</button>
                <button className="m-2 p-2">18</button>
            </div>
            <div>
              <Link to="/round">
                <button className="m-2 p-2">BEGIN ROUND</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    

  )
}

export default RoundSetup

