import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOGIN } from "../contents/user/queries";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import CustomTextField from "../contents/components/TextField";

function ConnectionModal(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const [errorField, setErrorField] = useState(null);
  const [login, { data, error }] = useLazyQuery(LOGIN);
  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const passwordRef = useRef();
  const userNameRef = useRef();
  const [activeField, setActiveField] = useState(
    document.activeElement.placeholder
  );

  useEffect(() => {
    document.body.addEventListener(
      "focus",
      () => {
        setActiveField(document.activeElement.placeholder);
      },
      true
    );
  }, []);
  let history = useHistory();
  const referer =
    props.location.state && props.location.state.referer
      ? props.location.state.referer
      : "/account";

  useEffect(() => {
    if (data && data.login) {
      setAuthTokens(data.login);
      setLoggedIn(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.message.includes("userName")) {
        userNameRef.current.focus();
        setErrorField("userName");
      }
      if (error.message.includes("password")) {
        passwordRef.current.focus();
        setErrorField("password");
      }
    }
  }, [error]);

  function keyPress(e) {
    if (e.keyCode === 13 && !!username && !!password) {
      loginUser();
    } else if (e.keyCode === 13 && !!username) {
      passwordRef.current.focus();
    }
  }

  function loginUser() {
    login({ variables: { userName: username, password, email: username } });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <Dialog
      open
      onClose={() => props.history.goBack()}
      classes={{ paper: classes.paper }}
    >
      <div className={classes.container}>
        <DialogContent className={classes.content}>
          <CustomTextField
            value={username}
            autoFocus
            error={errorField === "userName"}
            inputRef={userNameRef}
            keyPress={keyPress}
            onChange={(ev) => {
              if (errorField === "userName") {
                setErrorField(null);
              }
              setUserName(ev.target.value);
            }}
            placeholder="Nom d'utilisateur / Email"
            icon={
              <AccountCircleIcon
                color={
                  activeField === "Nom d'utilisateur / Email" ? "secondary" : ""
                }
              />
            }
            required
          />
          <CustomTextField
            value={password}
            keyPress={keyPress}
            error={errorField === "password"}
            onChange={(ev) => {
              if (errorField === "password") {
                setErrorField(null);
              }
              setPassword(ev.target.value);
            }}
            placeholder="Mot de passe"
            icon={
              <LockIcon
                color={activeField === "Mot de passe" ? "secondary" : ""}
              />
            }
            required
            inputRef={passwordRef}
            password
          />
          <Button
            variant="contained"
            className={classes.button}
            onClick={loginUser}
            color="secondary"
            size="large"
          >
            Login
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => history.push("/signup")}
            size="large"
          >
            S'inscrire
          </Button>
        </DialogContent>
      </div>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#FAFAFA00",
    borderRadius: 10,
  },
  text: {
    marginBottom: "10px",
    borderRadius: "10px",
  },
  input: {
    paddingTop: "0px",
    backgroundColor: "#FAFAFA",
  },
  button: {
    width: "100%",
    borderRadius: 10,
    marginBottom: theme.spacing.unit,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    paddingBottom: 10,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default ConnectionModal;
