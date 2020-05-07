import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

function PrivateRoute({ children, location, ...rest }) {
  const { authTokens } = useAuth();
  return (
    <Route {...rest}>
      {authTokens ? (
        children
      ) : (
        <Redirect to={{ pathname: "/login", state: { referer: location } }} />
      )}
    </Route>
  );
}

export default PrivateRoute;
