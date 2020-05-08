import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { GET_USER } from "../contents/user/queries";
import { useQuery } from "@apollo/react-hooks";
import { useAuth } from "../context/auth";
import UserCard from "../contents/user/UserCard";

function Account(props) {
  const classes = useStyles();
  let history = useHistory();
  const { setAuthTokens } = useAuth();

  const { loading, error, data } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
  });

  if (loading || !data || !data.user) {
    return <div></div>;
  }
  return (
    <div className={classes.container}>
      <h2>Mon compte</h2>
      <div className={classes.cardContainer}>
        <UserCard user={data.user} />
        <div className={classes.buttonContainer}>
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
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    width: "100%",
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(6),
  },
  cardContainer: {
    marginTop: theme.spacing(6),
  },
  buttonContainer: {
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
  },
}));

export default Account;
