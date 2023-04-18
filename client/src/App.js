import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import NavBar from "./components/NavBar";


function App() {
  return (
    <GlobalProvider>
      <div className="background vh-100">
        {/* <NavBar /> */}
        <div classname="container">
          <div className="row ">
            <div className="col d-flex justify-content-center align-items-center">
            <Link to="/main">
              <button className="m-2 p-2">MAIN</button>
            </Link>
            </div>
          </div>
        </div>
        <h1>{process.env.REACT_APP_MYENVVAR}</h1>
        <Outlet />
      </div>
    </GlobalProvider>
  );
}

export default App;
