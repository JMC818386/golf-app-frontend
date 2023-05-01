import "bootstrap/dist/css/bootstrap.css";
import "./Round.css";
import RoundCard from "./RoundCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/auth.constants";
import { useGlobalState } from "../../context/GlobalState";
import request from "../../services/api.request";
import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";

function RoundHistory() {
  const [rounds, setRounds] = useState([]);
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    const getRoundCard = async () => {
      let config = {
        url: `/rounds/`,
        method: "get",
      };
      let response = await request(config);
      setRounds(response.data);
    };
    getRoundCard();
  }, []);

  return (
    <div className="background pb-5">
      <NavBar />
      <Outlet />
      <div className="container d-flex justify-content-center">
        <div className="row  my-3">
          <div className="col card text-light">
            <h3>Round History</h3>
          </div>
        </div>
      </div>
      <RoundCard rounds={rounds} />
    </div>
  );
}

export default RoundHistory;
