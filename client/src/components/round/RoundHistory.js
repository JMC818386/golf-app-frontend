import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Round.css";
import RoundCard from "./RoundCard";


function RoundHistory() {
    return (

    <div> 
        <div className="container d-flex justify-content-center">
            <div className="row  my-3">
                <div className="col card text-light">
                    <h3>Round History</h3>
                </div>
            </div>
        </div>   
        <RoundCard />
        <RoundCard />
        <RoundCard />
        <RoundCard />
        <RoundCard />
    </div>
      
    );
  }
  
  export default RoundHistory;