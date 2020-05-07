import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { SIGNUP } from "../contents/user/mutations";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import CustomTextField from "../contents/components/TextField";

function SignupModal(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorField, setErrorField] = useState(null);
  const userNameRef = useRef();
  const classes = useStyles();
  const [signup, { data }] = useMutation(SIGNUP);
  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const passwordRef = useRef();

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
      !!userName &&
      !!password &&
      password === passwordConfirm
    );
  }

  function keyPress(e) {
    if (e.keyCode === 13 && isValid()) {
      signupUser();
    }
  }

  function signupUser() {
    signup({ variables: { userName, password } });
  }

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
          <CustomTextField
            value={userName}
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
            placeholder="Nom d'utilisateur"
            icon={<AccountCircleIcon />}
            required
          />
          <CustomTextField
            value={password}
            error={errorField === "userName"}
            inputRef={passwordRef}
            keyPress={keyPress}
            onChange={(ev) => {
              if (errorField === "userName") {
                setErrorField(null);
              }
              setPassword(ev.target.value);
            }}
            placeholder="Mot de passe"
            icon={<LockIcon />}
            required
          />
          <CustomTextField
            value={passwordConfirm}
            error={errorField === "userName"}
            keyPress={keyPress}
            onChange={(ev) => {
              if (errorField === "userName") {
                setErrorField(null);
              }
              setPasswordConfirm(ev.target.value);
            }}
            placeholder="Confirmation"
            icon={<LockIcon />}
            required
          />
          <Button
            variant="contained"
            classes={{ root: classes.button, disabled: classes.disabledButton }}
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
