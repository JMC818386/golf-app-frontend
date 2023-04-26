import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import "./Main.css";
import logo from '../img/PocketPro_LogoMark.png';

function Main() {
  return (
    <div className="container" style={{ height: "700px" }}>
      <div className="d-flex align-items-center justify-content-center h-100">
        {/* <div className="container d-flex justify-content-center vstack gap-2 vh-100 flex-column"> */}
        {/* LOGO GOES HERE in a new row? */}
        <div className="row my-auto">
          <div className="col d-flex flex-column align-items-center">
          <img className="logo" src={logo} alt="Logo" />
            <Link to="/round-setup">
              <button className="p-4 sqr-btn2">ROUND SETUP</button>
            </Link>
            <Link to="/round-history">
              <button className="mt-3 p-4 sqr-btn2">ROUND HISTORY</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
