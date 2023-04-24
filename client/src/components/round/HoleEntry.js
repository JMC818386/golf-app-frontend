import { useState, useEffect } from "react";

function HoleEntry({ setScores, scores, hole }) {
  const [strokeCount, setStrokeCount] = useState(0);
  const [swingCount, setSwingCount] = useState(0);
  const [puttCount, setPuttCount] = useState(0);
  const [swingFadeClass, setSwingFadeClass] = useState("");
  const [puttFadeClass, setPuttFadeClass] = useState("");
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const R = 6371e3;
        const φ1 = (latitude * Math.PI) / 180;
        const φ2 = (37.9891992 * Math.PI) / 180;
        const Δφ = ((37.9891992 - latitude) * Math.PI) / 180;
        const Δλ = ((-84.4722445 - longitude) * Math.PI) / 180;

        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = (R * c) / 0.9144;

        setDistance(Math.round(d));
        if (distance === 0) {
          return (
            <div className="loading">
              <div className="spinner"></div>
              <h1></h1>
            </div>
          );
        }
      });
    }
  }, [hole]);

  const addHoleScore = () => {
    // make api request to save scores
    // the return of that should be added to scores
    setScores([...scores, { strokes: strokeCount }]);
    setStrokeCount(0);
  };

  const SwingIncrement = () => {
    setSwingFadeClass("fade-out");
    setTimeout(() => {
      setSwingCount(swingCount + 1);
      setStrokeCount(strokeCount + 1);
      setSwingFadeClass("fade-in");
    }, 300);
  };

  const SwingDecrement = () => {
    if (swingCount > 0) {
      setSwingFadeClass("fade-out");
      setTimeout(() => {
        setSwingCount(swingCount - 1);
        setStrokeCount(strokeCount - 1);
        setSwingFadeClass("fade-in");
      }, 300);
    }
  };

  const PuttIncrement = () => {
    setPuttFadeClass("fade-out");
    setTimeout(() => {
      setPuttCount(puttCount + 1);
      setStrokeCount(strokeCount + 1);
      setPuttFadeClass("fade-in");
    }, 300);
  };

  const PuttDecrement = () => {
    if (puttCount > 0) {
      setPuttFadeClass("fade-out");
      setTimeout(() => {
        setPuttCount(puttCount - 1);
        setStrokeCount(strokeCount - 1);
        setPuttFadeClass("fade-in");
      }, 300);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center h-100 fade-in">
      <div className="row d-flex justify-content-center">
        <div className="col vstack gap-1 d-flex justify-content-center">
          <div className="row d-flex box rounded mb-2">
            <div className="col-4 text-light xs-text pt-1">
              <p className="d-flex justify-content-center">DISTANCE</p>
              <p className="s-text d-flex justify-content-center pt-2 orange-text">
                {distance} yards
              </p>
            </div>
            <div className="col-4 text-light">
              <p className="s-text d-flex justify-content-center mb-1 pt-1">
                STROKES
              </p>
              <div className={`${swingFadeClass}`}>
                <h1
                  className={`l-text d-flex justify-content-center ${puttFadeClass}`}
                >
                  {strokeCount}
                </h1>
              </div>
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
              <h1
                className={`l-text d-flex justify-content-center align-items-center ${swingFadeClass}`}
              >
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
              <p className="s-text d-flex justify-content-center mb-0 pt-2">
                PUTTS
              </p>
              <h1
                className={`l-text d-flex justify-content-center align-items-center ${puttFadeClass}`}
              >
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
