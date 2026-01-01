import "bootstrap/dist/css/bootstrap.css";
import "./Round.css";
import RoundScorecard from "./RoundScorecard";
import React, { useEffect, useState } from 'react';
import axios from 'axios';



function RoundCard() {

    const RoundCard = ({ roundId }) => {
        const [roundData, setRoundData] = useState(null);
      
        useEffect(() => {
          axios.get(`https://8000-jmc818386-golfapp-5cplpf2dlek.ws-us95.gitpod.io/api/rounds/${roundId}/${roundData}`)
            .then(response => setRoundData(response.data))
            .catch(error => console.log(error));
        }, [roundId]);
    }

    return (
        <div className="mx-3 my-3">
            {roundData && (
                <div className="container card d-flex justify-content-center">
                    <div className="row d-flex flex-row">

                        <div className="col-8 pt-2 px-4">
                            <div className="div ml-3">
                                <p className="sm-text-mont mb-1">{roundData.course_name}</p>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <div className="mr-5">
                                    <p className="s-text-mont mb-0">{roundData.date}</p>
                                        <div className="px-3">
                                            <p className="sm-text-score mb-0">{roundData.score_vs_par}</p>
                                        </div>
                                    <p className="s-text-mont mb-0">Putts | {roundData.total_putts}</p>
                                </div>

                                <div className="score-total ml-auto">
                                    <p className="my-0 text-light">{roundData.total_score}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 pt-2 pr-5 score-type">
                            <p className="s-text-mont mb-1">EAGLES | 0</p>
                            <p className="s-text-mont mb-1">BIRDIES | 0</p>
                            <p className="s-text-mont mb-1">PARS | 0</p>
                            <p className="s-text-mont mb-1">BOGIES | 0</p>
                            <p className="s-text-mont mb-1">BOGIES+ | 0</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <RoundScorecard />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
  }
  
  export default RoundCard;