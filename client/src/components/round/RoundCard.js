import "bootstrap/dist/css/bootstrap.css";
import "./Round.css";
import RoundScorecard from "./RoundScorecard";


function RoundCard() {
    return (
    <div className="mx-3 my-3">
        <div className="container card d-flex justify-content-center">
            <div className="row d-flex flex-row">
                <div className="col-8 pt-2 px-4">
                    <div className="div ml-3">
                        <p className="sm-text-mont mb-1">Golf Course Name</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="mr-5">
                            <p className="s-text-mont mb-0">00-00-0000</p>
                                <div className="px-3">
                                    <p className="sm-text-score mb-0">+0</p>
                                </div>
                            <p className="s-text-mont mb-0">Putts | 00</p>
                        </div>

                        <div className="score-total ml-auto">
                            <p className="my-0 text-light">00</p>
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
    </div>
      
    );
  }
  
  export default RoundCard;