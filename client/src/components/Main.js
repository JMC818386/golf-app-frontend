import "bootstrap/dist/css/bootstrap.css";
import { Link, Outlet } from "react-router-dom";
import "./Main.css";


function Main() {
    return (

    <div>    
      <div className="container d-flex align-items-center h-100">
        <div className="row vstack gap-1 d-flex column justify-content-center align-items-center">
            <div className="col  d-flex column justify-content-center">
                <Link to="/round-setup">
                <button className="mt-5 p-4 sqr-btn2">ROUND SETUP</button>
                </Link>
            </div>
            <div className="col d-flex column justify-content-center">
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