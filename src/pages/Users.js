import React from "react";
import { GET_USERS } from "../contents/user/queries";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {loading ? null : data.users.map((user) => <h1>{user.userName}</h1>)}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    color: theme.palette.white.main,
  },
}));
export default Users;
