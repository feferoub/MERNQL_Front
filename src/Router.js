import React, { useState } from "react";
import Template from "./contents/template/Template";
import { Switch, Route } from "react-router-dom";
import Account from "./pages/Account";
import HomePage from "./pages/Home";
import PrivateRoute from "./network/PrivateRoute";
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import UsersPage from "./pages/Users";
function Roots() {
  const [showTemplate, setShowTemplate] = useState(true);
  return (
    <div>
      {showTemplate ? <Route path="/" component={Template} /> : null}
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
