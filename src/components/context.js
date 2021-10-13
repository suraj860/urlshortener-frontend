import React from "react";
export const AppContext = React.createContext();


export const ContextProvider = (props) => {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [popup, setPopup] = React.useState(false);
  return (
    <AppContext.Provider
      value={{
        result,
        setResult,
        popup,
        setPopup,
        name,
        setName,
        password,
        setPassword,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
