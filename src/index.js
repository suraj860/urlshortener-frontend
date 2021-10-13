import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Redirect from "./components/Redirect";
import Login from "./components/loginForm";
import Forget from "./components/forget";
import { ContextProvider } from "./components/context";
import Newpassword from "./components/resetPasswordForm";
import RegisterForm from "./components/registerForm";

ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/redirection/:id" component={Redirect} />
        <Route exact path="/" component={Login} />
        <Route path="/forget_pass" component={Forget} />
        <Route path="/reset/:id" component={Newpassword} />
        <Route path="/register" component={RegisterForm} />
      </Switch>
    </BrowserRouter>
  </ContextProvider>,
  document.getElementById("root")
);
