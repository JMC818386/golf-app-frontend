import "./Round.css";
import "bootstrap/dist/css/bootstrap.css";

// (props) OR {scores}
//  === props.scores.strokes OR scores.strokes

function Scorecard({ scores }) {
  return (
    <div>
      <table class="table">
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
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || "-"}</td>
          </tr>
        </tbody>
      </table>

      <table class="table">
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
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
            <td>{scores?.strokes || 0}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Scorecard;
