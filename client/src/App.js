import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import NavBar from "./components/NavBar";


function App() {
  return (
    <GlobalProvider>
      <div className="background h-100">
        <NavBar />
        
        <h1>{process.env.REACT_APP_MYENVVAR}</h1>
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
    </GlobalProvider>
  );
}

export default App;
