import axios from "axios";
import React, { useContext } from "react";
import "../cssFiles/login.css";
import { AppContext } from "./context";
import Message from "./message";
import { Link } from "react-router-dom";
import App from "./App";

function Login() {
  const { name, setName } = useContext(AppContext);
  const { password, setPassword } = useContext(AppContext);
  const { result, setResult, setPopup, popup } = useContext(AppContext);

  //log in with the information provided by the user
  async function getData() {
    try {
      const response = await axios.post("https://suraj-url-backend.herokuapp.com/user/login", {
        email: name,
        password: password,
      });
     
      setResult(response.data);
      window.localStorage.setItem("auth-key", response.data.authToken);
    
    } catch (error) {
      console.log(error);
    }
  }

  //handle the changes in the form
  function handleChange(event) {
    switch (event.target.name) {
      case "userName": {
        setName(event.target.value);

        break;
      }
      case "password": {
        setPassword(event.target.value);

        break;
      }
      default: {
        break;
      }
    }
  }

  //handle submit
  function handleSubmit(event) {
    event.preventDefault();
    getData();
    setPopup(!popup);
  }
  return (
    <>
    {/* if user has not successfully logedin than render the sign in form again  */}
      {result.length === 0 ? (
        <div className="containers">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="titles">
                <p className="welcome">Please Login to use Shortner</p>
              </div>

              <input
                className="form-control text"
                type="email"
                value={name}
                name="userName"
                placeholder="Enter your email"
                required
                onChange={handleChange}
              ></input>
              <br />

              <input
                className="form-control text"
                type="password"
                value={password}
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              ></input>
              <br />

              <button
                type="submit"
                className="btn-lg btn-block btn btn-primary btns"
              >
                Login
              </button>
              <div>
                <hr />
                <div className="resetDiv">
                  <Link
                    to="/forget_pass"
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                  >
                    Forget Password ?{" "}
                  </Link>

                  <Link to="/register" style={{ marginBottom: "0" }}>
                    SignUp/Register
                  </Link>
                </div>
              </div>
            </form>
          </div>
          {/* if user log in successfully than render the url shortner */}
        </div>
        
      ) : result.length !== 0 && result.message === "Logged In Successfully" ? (
        <App />
      ) : (
        <Message />
      )}

      {/* {
            popup===true ? <Message/> : null
        } */}
    </>
  );
}

export default Login;
