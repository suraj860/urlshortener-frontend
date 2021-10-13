import axios from "axios";
import React, { useContext } from "react";
import "../cssFiles/login.css";
import { AppContext } from "./context";
import Message from "./message";

function RegisterForm() {
  const { name, setName } = useContext(AppContext);
  const { password, setPassword, setPopup, popup } = useContext(AppContext);
  const { setResult } = useContext(AppContext);
  const [firstName, setFirstName] = React.useState("");

//   addeing new user data to database
  async function registerNew() {
    try {
      const response = await axios.post("https://suraj-url-backend.herokuapp.com/user/register", {
        email: name,
        password: password,
        name: firstName,
      });
      setResult(response.data);
    } catch (error) {
      console.log(error);
    }
  }

//   handle changes in form
  function handleChange(event) {
    switch (event.target.name) {
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "userName":
        setName(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  }
// handle submit
  function handleSubmit(event) {
    event.preventDefault();
    registerNew();
    setPopup(!popup);
  }
  return (
    <>
      <div className="containers">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="titles">
              <p className="welcome">Register</p>
            </div>

            <input
              className="form-control text"
              type="text"
              value={firstName}
              name="firstName"
              placeholder="Enter your first name"
              required
              onChange={handleChange}
            ></input>
            <br />

            <input
              className="form-control text"
              type="email"
              value={name}
              name="userName"
              placeholder="Register your email"
              required
              onChange={handleChange}
            ></input>
            <br />

            <input
              className="form-control text"
              type="password"
              value={password}
              name="password"
              placeholder="Create password"
              onChange={handleChange}
              required
            ></input>
            <br />

            <button
              type="submit"
              className="btn-lg btn-block btn btn-primary btns"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      {popup === true ? <Message /> : null}
    </>
  );
}

export default RegisterForm;
