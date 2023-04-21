import { Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import "bootstrap/dist/css/bootstrap.css";
import "./NavBar.css";

function NavBar() {
  const [ state, dispatch ] = useGlobalState();

  return (
    <nav>
      <ul className="nav-bar">
        <li>
          <Link className="nav-text" style={{ textDecoration: "none"}} to="/">Home</Link>
        </li>
        {
          !state.currentUser && (
            <li>
              <Link className="nav-text" style={{ textDecoration: "none"}} to="/login">Login</Link>
            </li>
          )
        }
        {
          !state.currentUser && (
            <li>
              <Link className="nav-text" style={{ textDecoration: "none"}} to="/register">Register</Link>
            </li>
          )
        }
        {
          state.currentUser && (
            <li>
              <Link className="nav-text" style={{ textDecoration: "none"}} to="/profile">Profile</Link>
            </li>
          )
        }
      </ul>
    </nav>
  );
}

export default NavBar;