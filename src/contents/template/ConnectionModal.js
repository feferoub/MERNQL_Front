import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOGIN } from "../user/queries";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";

function ConnectionModal({ open, onClose }) {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const [login, { loading, data }] = useLazyQuery(LOGIN);
  console.log(useAuth());
  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (data && data.login) {
      setAuthTokens(data.login);
      setLoggedIn(true);
    }
  }, [data]);

  function customTextField(field, setField, name, icon) {
    return (
      <TextField
        value={field}
        required
        variant="filled"
        autoFocus
        onChange={(ev) => {
          setField(ev.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ marginTop: 0 }}>
              {icon}
            </InputAdornment>
          ),
          color: "secondary",
          inputProps: {
            style: {
              paddingTop: theme.spacing.unit * 2,
              paddingBottom: theme.spacing.unit * 2,
              paddingLeft: theme.spacing.unit * 2,

              color: theme.color.white,
            },
          },
        }}
        placeholder={name}
        className={classes.text}
      />
    );
  }

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <div className={classes.container}>
        <DialogContent className={classes.content}>
          {customTextField(
            username,
            setUserName,
            "Nom d'utilisateur",
            <AccountCircleIcon />
          )}
          {customTextField(password, setPassword, "Mot de passe", <LockIcon />)}
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => login({ variables: { username, password } })}
            size="large"
          >
            Login
          </Button>
        </DialogContent>
      </div>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.color.secondary,
    borderRadius: 10,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    paddingBottom: 10,
    backgroundColor: theme.color.primary,
  },
}));

export default ConnectionModal;
