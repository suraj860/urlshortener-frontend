
import React, { useContext } from "react";
import "../cssFiles/message.css";
import { AppContext } from "./context";
import { Link } from "react-router-dom";

function Message() {
  const { result, setPopup, popup, setResult } = useContext(AppContext);
  const { setName } = useContext(AppContext);
  const { setPassword } = useContext(AppContext);
  
  return (
    <div className="parentdiv">
      <div className="child">

          {/* rendering the response message given from server */}
        {result.message ? (
          <h3 style={{ color: "green" }}>{result.message}</h3>
        ) : (
          <h3 style={{ color: "rgb(231, 230, 230)" }}>Loading...</h3>
        )}
        <Link to="/">
          <button
            className="btn btn-primary btn-sm"
            style={{ marginTop: "25px", padding: "4px 15px" }}
            onClick={() => {
              setPopup(!popup);
              setName("");
              setPassword("");
              setResult("");
            }}
          >
            OK
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Message;