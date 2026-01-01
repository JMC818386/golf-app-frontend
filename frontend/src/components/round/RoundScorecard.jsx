import "./Round.css";
import "bootstrap/dist/css/bootstrap.css";


function Scorecard({ scores = [] }) {
  const holeScores = Array(18).fill(0);
  const holePars = Array(18).fill(0);
  console.log(scores);

  scores.forEach((score) => {
    holeScores[score.hole_number - 1] = score.strokes;
    holePars[score.hole_number - 1] = score.par;
  });

  const getScoreClass = (strokes, par) => {
    if (!strokes || !par) return '';
    const diff = strokes - par;

    if (diff <= -2) return 'eagle';
    if (diff === -1) return 'birdie';
    if (diff === 0) return 'par';
    if (diff === 1) return 'bogey';
    if (diff >= 2) return 'double-bogey';
    return '';
  };

  const renderScore = (index) => {
    const score = holeScores[index];
    const par = holePars[index];
    const scoreClass = getScoreClass(score, par);

    return (
      <td key={index}>
        <span className={`score ${scoreClass}`}>
          {score || '-'}
        </span>
      </td>
    );
  };

  return (
    <div className="scorecard-container">
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">1</th>
            <th scope="col">2</th>
            <th scope="col">3</th>
            <th scope="col">4</th>
            <th scope="col">5</th>
            <th scope="col">6</th>
            <th scope="col">7</th>
            <th scope="col">8</th>
            <th scope="col">9</th>
            <th scope="col">36</th>
            <th scope="col">-</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">F</th>
            {renderScore(0)}
            {renderScore(1)}
            {renderScore(2)}
            {renderScore(3)}
            {renderScore(4)}
            {renderScore(5)}
            {renderScore(6)}
            {renderScore(7)}
            {renderScore(8)}
            <td>{holeScores.slice(0, 9).reduce((a, b) => a + b, 0) || '-'}</td>
            <td>-</td>
          </tr>
          <tr className="par-row">
            <td>PAR</td>
            {holePars.slice(0, 9).map((par, index) => (
              <td key={`par-${index}`}>{par || '-'}</td>
            ))}
            <td>{holePars.slice(0, 9).reduce((a, b) => a + b, 0) || '-'}</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">10</th>
            <th scope="col">11</th>
            <th scope="col">12</th>
            <th scope="col">13</th>
            <th scope="col">14</th>
            <th scope="col">15</th>
            <th scope="col">16</th>
            <th scope="col">17</th>
            <th scope="col">18</th>
            <th scope="col">36</th>
            <th scope="col">72</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">B</th>
            {renderScore(9)}
            {renderScore(10)}
            {renderScore(11)}
            {renderScore(12)}
            {renderScore(13)}
            {renderScore(14)}
            {renderScore(15)}
            {renderScore(16)}
            {renderScore(17)}
            <td>{holeScores.slice(9).reduce((a, b) => a + b, 0) || '-'}</td>
            <td>{holeScores.reduce((a, b) => a + b, 0) || '-'}</td>

          </tr>
          <tr className="par-row">
            <td>PAR</td>
            {holePars.slice(9, 18).map((par, index) => (
              <td key={`par-${index + 9}`}>{par || '-'}</td>
            ))}
            <td>{holePars.slice(9, 18).reduce((a, b) => a + b, 0) || '-'}</td>
            <td>{holePars.reduce((a, b) => a + b, 0) || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Scorecard;
