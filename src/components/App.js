import React from "react";
import axios from "axios";
import NavBar from "./navbar";
import "../cssFiles/app.css";

function App() {
  const [longurl, setUrl] = React.useState("");
  const [newUrl, setNew] = React.useState("");
  const [list, setList] = React.useState([]);
  const [state, setState] = React.useState(true);

  //setting token in header for that creating an axios instance
  const authToken = window.localStorage.getItem("auth-key");
  const instance = axios.create({
    baseURL: "https://suraj-url-backend.herokuapp.com",
    headers: {
      "auth-token": authToken,
    },
  });

  //api call for creating an new url
  async function generateUrl() {
    try{
      const response = await instance.post("/create_url", {
        url: longurl,
      });
      setNew(response.data);
    }catch(error){
      console.log(error)
    }
   
  }
//get list of all the apis created up to date present in database
  async function getList() {
    try{
      const response = await axios.get("https://suraj-url-backend.herokuapp.com/getUrls");
      setList(response.data);
    }catch(error){
      console.log(error)
    }
   
  }

  //handle change in the form
  function handleChange(event) {
    switch (event.target.name) {
      case "longurl":
        setUrl(event.target.value);
        break;

      default:
        break;
    }
  }

  //handle submit
  function handleSubmit(event) {
    event.preventDefault();
    generateUrl();
    setUrl("");
  }

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 optionCol">
            <button
              onClick={() => {
                setState(true);
              }}
              className="btn btn-primary btn-block btnss"
            >
              Generate New URL
            </button>
            <br />
            <button
              onClick={() => {
                setState(!state);
                getList();
              }}
              className="btn btn-primary btn-block"
            >
              All URLS
            </button>
          </div>
          <div className="col-lg-10 dataCol">
            <div>
              {state === true ? (
                <form onSubmit={handleSubmit} className="forms">
                  <p className="title">URL SHORTNER</p>
                  <input
                    type="text"
                    className="urlText form-control"
                    name="longurl"
                    placeholder="Enter url"
                    value={longurl}
                    onChange={handleChange}
                  ></input>
                  <br />
                  <button type="submit" className="btn btn-primary">
                    Get Url
                  </button>
                  <br />
                  <p style={{ marginTop: "14px" }}>
                    Copy and paste the below provided short link in new tab of
                    your browser
                  </p>
                  <p className="link">{newUrl}</p>
                </form>
              ) : (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <td>
                        {" "}
                        USE BASE URL :
                        https://suraj-url-backend.herokuapp.com/redirection/V2_XCP3OR +{" "}
                        <span style={{ color: "rgb(0, 138, 192)" }}>
                          Short_Id{" "}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Long Url</td>
                      <td>Short_Id for Url</td>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item) => {
                      return (
                        <tr  key={item._id}>
                          <td style={{ color: "rgb(0, 138, 192)" }}>
                            {item.url}
                          </td>
                          <td style={{ color: "rgb(0, 138, 192)" }}>
                            {item.shortUrl}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
