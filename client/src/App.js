import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import NavBar from "./components/NavBar";


function App() {
  return (
      <div className="background vh-100">
        <NavBar />
        <Outlet />
      
        <div className="container d-flex justify-content-center">
            <div className="row">
              <div className="col-12 d-flex justify-content-center align-items-center">
                <Link to="/main">
                  <button className="p-2 sqr-btn2-main rounded mt-auto">MAIN MENU</button>
                </Link>
              </div>
            </div>
        </div>
      </div>
  );
}

export default App;
