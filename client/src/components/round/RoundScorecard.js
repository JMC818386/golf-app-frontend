import "./Round.css";
import "bootstrap/dist/css/bootstrap.css";

// (props) OR {scores}
//  === props.scores.strokes OR scores.strokes

function Scorecard({ scores = [] }) {
  const holeScores = Array(18).fill(0);
  console.log(scores);

  scores.forEach((score) => {
    holeScores[score.hole_number - 1] = score.strokes;
  });

  return (
    <div>
      <table className="table">
        {/* thead is your top HEADER row of table */}
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
          {/* tr a row in the table */}
          <tr>
            <th scope="row">F</th>
            {/* td is where the data in a row goes aka a bunch of strokes or 0s */}
            <td>{holeScores[0]}</td>
            <td>{holeScores[1]}</td>
            <td>{holeScores[2]}</td>
            <td>{holeScores[3]}</td>
            <td>{holeScores[4]}</td>
            <td>{holeScores[5]}</td>
            <td>{holeScores[6]}</td>
            <td>{holeScores[7]}</td>
            <td>{holeScores[8]}</td>
            <td>{holeScores.slice(0,8).reduce((a, b) => a + b, 0)}</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

      <table className="table">
        {/* thead is your top HEADER row of table */}
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
          {/* tr a row in the table */}
          <tr>
            <th scope="row">B</th>
            {/* td is where the data in a row goes aka a bunch of strokes or 0s */}
            <td>{holeScores[9]}</td>
            <td>{holeScores[10]}</td>
            <td>{holeScores[11]}</td>
            <td>{holeScores[12]}</td>
            <td>{holeScores[13]}</td>
            <td>{holeScores[14]}</td>
            <td>{holeScores[15]}</td>
            <td>{holeScores[16]}</td>
            <td>{holeScores[17]}</td>
            <td>{holeScores.slice(8).reduce((a, b) => a + b, 0)}</td>
            <td>{holeScores.reduce((a, b) => a + b, 0)}</td>

          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Scorecard;
