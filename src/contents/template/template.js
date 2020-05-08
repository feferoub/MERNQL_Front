import React from "react";
import { IconButton } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import { useTheme } from "@material-ui/core/styles";

function Template(props) {
  const theme = useTheme();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <IconButton
        onClick={() => {
          props.history.push("/home");
        }}
      >
        <HomeIcon style={{ fontSize: 40, color: theme.palette.white.main }} />
      </IconButton>
      <IconButton
        color="secondary"
        onClick={() => {
          props.history.push("/account");
        }}
      >
        <AccountCircleIcon style={{ fontSize: 40 }} />
      </IconButton>
    </div>
  );
}

export default Template;
