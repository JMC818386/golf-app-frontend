import { Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import "bootstrap/dist/css/bootstrap.css";
import "./NavBar.css";
import { useNavigate } from 'react-router-dom';
import request from '../services/api.request';
import AuthService from "../services/auth.service";
import { useEffect, useState } from 'react';
import logo from '../img/PocketPro_LogoType.png';

function NavBar() {
  const [ state, dispatch ] = useGlobalState();
  const [ , setData ] = useState();
  let navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    AuthService.logout();
    navigate('/login');
    dispatch({
        currentUserToken: null,
        currentUser: null
    })
}

const getUser = async () => {
  try {
      let options = {
          url: `users/${state.currentUser.user_id}/`,
          method: 'GET',
      }
      let response = await request(options)
      // console.log(response.data)
      setData(response.data)
  }
  catch (error) {
      if (state.currentUser === null) {
      } else {
          console.log(error)
      }
  }
}

useEffect(() => {
  getUser()
  // eslint-disable-next-line
}, [])

  return (
    <nav>
      <ul className="nav-bar">
        <li>
          <Link to="/main">
            <img className="logo-type" src={logo} style={{ width: 110 }} alt="Logo" />
          </Link>
        </li>
        {/* <li>
          <Link className="nav-text" style={{ textDecoration: "none"}} to="/main">Home</Link>
        </li> */}
        {
          !state.currentUser && (
            <li>
              <Link className="nav-text" style={{ textDecoration: "none"}} to="/">Login</Link>
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
        {/* {
          state.currentUser && (
            <li>
              <Link className="nav-text" style={{ textDecoration: "none"}} to="/profile">Profile</Link>
            </li>
          )
        } */}
        {
          state.currentUser && (
            <li>
              <Link className="nav-text" style={{ textDecoration: "none"}} to="/login"onClick={handleLogout}>Sign Out</Link>
            </li>
          )
        }
      </ul>
    </nav>
  );
}

export default NavBar;