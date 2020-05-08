import React, { useState, useEffect } from "react";
import { AuthContext } from "../context/auth";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

var clearTimer;

function Authorisation(props) {
  let history = useHistory();

  let rawToken = Cookies.get("token");
  if (!rawToken) {
    rawToken = null;
  }

  const [authTokens, setAuthTokens] = useState(rawToken);
  useEffect(() => {
    window.addEventListener(
      "message",
      (message) => {
        if (message.data === "Disconnect") {
          setTokens();
          history.push("/home");
        }
      },
      false
    );
  }, []);

  const setTokens = (data) => {
    window.clearTimeout(clearTimer);
    if (data) {
      Cookies.set("token", data);
      clearTimer = setTimeout(() => {
        Cookies.remove("token");
        history.push("/home");
        setAuthTokens(null);
      }, 1000 * 60 * 15);
    } else {
      Cookies.remove("token");
    }
    setAuthTokens(data);
  };
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default Authorisation;
