import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Outlet } from "react-router-dom";
import { GlobalProvider } from './context/GlobalState';
import NavBar from './components/NavBar';
import RoundSetup from './components/round/RoundSetup';


function App() {
  return (
    <GlobalProvider>
      <RoundSetup />
      <NavBar />
      <h1>{process.env.REACT_APP_MYENVVAR}</h1>
      <Outlet />
    </GlobalProvider>
  );
}

export default App;