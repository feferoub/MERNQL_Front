import React from "react";
import Template from "./contents/template";
import { Switch, Route } from "react-router-dom";
import Account from "./pages/account";
import HomePage from "./pages/home";
import PrivateRoute from "./network/PrivateRoute";
import Login from "./pages/login";
import SignupPage from "./pages/Signup";
import UsersPage from "./pages/Users";
function Roots() {
  return (
    <div>
      <Route path="/" component={Template} />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignupPage} />

        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/users">
          <UsersPage />
        </Route>
        <PrivateRoute path="/account">
          <Account />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default Roots;
