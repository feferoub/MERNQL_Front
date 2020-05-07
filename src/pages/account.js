import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { GET_USER } from "../contents/user/queries";
import { useQuery } from "@apollo/react-hooks";
import { useAuth } from "../context/auth";

function Account(props) {
  const classes = useStyles();
  let history = useHistory();
  const { setAuthTokens } = useAuth();

  const { loading, error, data } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div></div>;
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Mon compte</h2>
      <h2>{data && data.user && data.user.userName}</h2>
      <Button
        variant="contained"
        className={classes.button}
        size="large"
        onClick={() => {
          history.push("/home");
          setAuthTokens();
        }}
      >
        Déconnection
      </Button>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.color.secondary,
    borderRadius: 10,
  },
}));

export default Account;
