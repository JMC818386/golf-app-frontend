import "bootstrap/dist/css/bootstrap.css";
import "./Round.css";
import RoundScorecard from "./RoundScorecard";

function RoundCard({ rounds = [] }) {
  //   This is what the JSX will look like now, but you will need to map over all rounds when you have more than one which could change that slightly.
  //   console.log(rounds[0]?.course_name);
  // console.log(rounds);


  
  return (
    <div className="mx-3 my-3">
      {rounds.map((round) => (
        <div key={round.id} className="container card d-flex justify-content-center">
          <div className="row d-flex flex-row">
            <div className="col-8 pt-2 px-4">
              <div className="div ml-3">
                <p className="sm-text-mont mb-1">{round.course_name}</p>
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
                BOGIES+ | {round.hole_scores.counts.bogeys_plus}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <RoundScorecard />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoundCard;
