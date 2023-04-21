import { useState } from "react";

function HoleEntry({ setScores, scores }) {
  const [strokeCount, setStrokeCount] = useState(0);
  const [swingCount, setSwingCount] = useState(0);
  const [puttCount, setPuttCount] = useState(0);

  const addHoleScore = () => {
    // make api request to save scores
    // the return of that should be added to scores
    setScores([...scores, { strokes: strokeCount }]);
    setStrokeCount(0);
  };

  const SwingIncrement = () => {
    setSwingCount(swingCount + 1);
    setStrokeCount(strokeCount + 1);
  };

  const SwingDecrement = () => {
    if (swingCount > 0) {
      setSwingCount(swingCount - 1);
      setStrokeCount(strokeCount - 1);
    }
  };

  const PuttIncrement = () => {
    setPuttCount(puttCount + 1);
    setStrokeCount(strokeCount + 1);
  };

  const PuttDecrement = () => {
    if (puttCount > 0) {
      setPuttCount(puttCount - 1);
      setStrokeCount(strokeCount - 1);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row d-flex justify-content-center">
        <div className="col vstack gap-1 d-flex justify-content-center">
          <div className="row d-flex box rounded mb-2">
            <div className="col-4 text-light xs-text pt-1">
              <p className="d-flex justify-content-center">DISTANCE</p>
              <p className="l-text d-flex justify-content-center"></p>
            </div>
            <div className="col-4 text-light">
              <p className="s-text d-flex justify-content-center mb-1 pt-1">
                STROKES
              </p>
              <h1 className="l-text d-flex justify-content-center">
                {strokeCount}
              </h1>
            </div>
            <div className="col-4 text-light s-text">
              <p className="s-text d-flex justify-content-center pt-1">-/+</p>
              <h1 className="l-text d-flex justify-content-center"></h1>
            </div>
          </div>

          <div className="row d-flex box rounded mb-2 px-5">
            <div className="col-4 text-light xs-text d-flex justify-content-center py-4">
              <button
                onClick={SwingDecrement}
                className="m-text rounded-circle px-4 circle-btn dec"
              >
                -
              </button>
            </div>
            <div className="col-4 text-light">
              <p className="s-text d-flex justify-content-center mb-0 pt-2">
                SWINGS
              </p>
              <h1 className="l-text d-flex justify-content-center align-items-center">
                {swingCount}
              </h1>
            </div>
            <div className="col-4 text-light s-text d-flex justify-content-center py-4">
              <button
                onClick={SwingIncrement}
                className="m-text rounded-circle px-3 circle-btn"
              >
                +
              </button>
            </div>
          </div>

          <div className="row d-flex box rounded px-5">
            <div className="col-4 text-light xs-text d-flex justify-content-center py-4">
              <button
                onClick={PuttDecrement}
                className="m-text rounded-circle px-4 circle-btn dec"
              >
                -
              </button>
            </div>
            <div className="col-4 text-light">
              <p className="s-text d-flex justify-content-center mb-0 pt-2">PUTTS</p>
              <h1 className="l-text d-flex justify-content-center align-items-center">
                {puttCount}
              </h1>
            </div>
            <div className="col-4 text-light s-text d-flex justify-content-center py-4">
              <button
                onClick={PuttIncrement}
                className="m-text rounded-circle px-3 circle-btn"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoleEntry;
