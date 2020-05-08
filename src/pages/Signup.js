import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { SIGNUP } from "../contents/user/mutations";
import { CHECK_USER_EXIST } from "../contents/user/queries";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import CustomTextField from "../contents/components/TextField";
import DelayedTextField from "../contents/components/DelayedTextField";

function SignupModal(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorField, setErrorField] = useState(null);
  const classes = useStyles();
  const [signup, { data }] = useMutation(SIGNUP);
  const [getUser, getUserResult] = useLazyQuery(CHECK_USER_EXIST, {
    fetchPolicy: "network-only",
  });
  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);
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

  const referer =
    props.location.state && props.location.state.referer
      ? props.location.state.referer
      : "/account";

  useEffect(() => {
    if (data && data.signup) {
      setAuthTokens(data.signup);
      setLoggedIn(true);
    }
  }, [data]);

  function isValid() {
    return (
      typeof userName === "string" &&
      typeof password === "string" &&
      typeof email === "string" &&
      !!email &&
      !!userName &&
      !!password &&
      password === passwordConfirm &&
      !errorField
    );
  }

  function keyPress(e) {
    if (e.keyCode === 13 && isValid()) {
      signupUser();
    }
  }

  function signupUser() {
    signup({ variables: { userName, password, email } });
  }

  useEffect(() => {
    if (getUserResult.data) {
      if (getUserResult.data.checkIfUserExists === "userName") {
        setErrorField("userName");
      }
      if (getUserResult.data.checkIfUserExists === "email") {
        setErrorField("email");
      }
    }
  }, [getUserResult]);

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      open
      onClose={() => props.history.push("/home")}
    >
      <div className={classes.container}>
        <DialogContent className={classes.content}>
          <DelayedTextField
            value={userName}
            autoFocus
            error={errorField === "userName"}
            keyPress={keyPress}
            onChange={(ev) => {
              if (errorField === "userName") {
                setErrorField(null);
              }
              setUserName(ev.target.value);
              getUser({ variables: { userName: ev.target.value } });
            }}
            placeholder="Nom d'utilisateur"
            icon={
              <AccountCircleIcon
                color={activeField === "Nom d'utilisateur" ? "secondary" : ""}
              />
            }
            required
          />
          {console.log(activeField)}
          <DelayedTextField
            value={email}
            error={errorField === "email"}
            keyPress={keyPress}
            onChange={(ev) => {
              if (errorField === "email") {
                setErrorField(null);
              }
              setEmail(ev.target.value);
              getUser({ variables: { email: ev.target.value } });
            }}
            placeholder="Adresse email"
            icon={
              <AlternateEmailIcon
                color={activeField === "Adresse email" ? "secondary" : ""}
              />
            }
            required
          />
          <CustomTextField
            password
            value={password}
            error={errorField === "password"}
            keyPress={keyPress}
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
          />
          <CustomTextField
            password
            value={passwordConfirm}
            error={errorField === "passwordConfirm"}
            keyPress={keyPress}
            onChange={(ev) => {
              if (errorField === "passwordConfirm") {
                setErrorField(null);
              }
              setPasswordConfirm(ev.target.value);
            }}
            placeholder="Confirmation"
            icon={
              <LockIcon
                color={activeField === "Confirmation" ? "secondary" : ""}
              />
            }
            required
          />
          <Button
            variant="contained"
            classes={{
              root: classes.button,
              disabled: classes.disabledButton,
            }}
            disabled={!isValid()}
            onClick={signupUser}
            size="large"
            color="secondary"
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
    "&$disabledButton": {
      backgroundColor: theme.palette.secondary.disabled,
      color: theme.palette.white.disabled,
    },
  },
  disabledButton: {},
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    borderRadius: 10,
    paddingBottom: 10,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default SignupModal;
