import React from "react"
import "bootstrap/dist/css/bootstrap.css";
import "./User.css";
import { useGlobalState } from "../../context/GlobalState";

const CreateConfirm = () => {
  const [ state ] = useGlobalState();

  return (

    <div className="container d-flex justify-content-center mt-5">
      <div className="row  d-flex justify-content-center mt-5">
        <div className="d-flex flex-column mt-5">
          <h1 className="l-text">You have successfully created an account!</h1>
        </div>
      </div>
    </div>
  )
}

export default CreateConfirm