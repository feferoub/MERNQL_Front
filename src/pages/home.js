import React from "react";
import { makeStyles } from "@material-ui/styles";

function Home(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2>Home</h2>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(6),
  },
}));

export default Home;
