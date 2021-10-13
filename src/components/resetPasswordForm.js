import axios from "axios";
import React from "react";
import Message from "./message";
import { AppContext } from "./context";

function Newpassword(props) {
  const [pass, setPass] = React.useState("");
  const [confPass, setConfPass] = React.useState("");
  const { setResult, setPopup, popup } = React.useContext(AppContext);

//   api call for changeing the password
  async function resetPassword() {
      try{
        const response = await axios.post("https://suraj-url-backend.herokuapp.com/new_password", {
            token: props.match.params.id,
            newpassword: pass,
          });
        setResult(response.data);
      }catch(error){
          console.log(error)
      }
   
  }

  //handle changes in the form

  function handleChange(event) {
    switch (event.target.name) {
      case "createPass":
        setPass(event.target.value);
        break;
      case "reEnter":
        setConfPass(event.target.value);
        break;

      default:
        break;
    }
  }

//   handle submit button

  function handleSubmit(event) {
    event.preventDefault();
    if (pass === confPass) {
      resetPassword();
      setPopup(!popup);
     
    } else {
      return;
    }
  }

  return (
    <>
      <div className="containers">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="titles">
              <p className="welcome">Create New Password</p>
            </div>

            <input
              className="form-control text"
              type="password"
              value={pass}
              name="createPass"
              placeholder="Enter new password"
              required
              onChange={handleChange}
            ></input>
            <br />

            <input
              className="form-control text"
              type="password"
              value={confPass}
              name="reEnter"
              placeholder="Re-enter your password"
              onChange={handleChange}
              required
            ></input>
            <br />
            <hr />
            <button
              type="submit"
              className="btn-lg btn-block btn btn-primary btns"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
      {popup === true ? <Message /> : null}
    </>
  );
}
export default Newpassword;
