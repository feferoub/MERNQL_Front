import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { TextField, InputAdornment } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

function CustomTextField({ icon, keyPress, password, error, refer, ...props }) {
  const theme = useTheme();

  return (
    <TextField
      {...props}
      variant="filled"
      InputProps={{
        type: password ? "password" : "",
        autoComplete: password ? "new-password" : "",
        startAdornment: (
          <InputAdornment position="start" style={{ marginTop: 0 }}>
            {icon}
          </InputAdornment>
        ),
        endAdornment: error ? (
          <InputAdornment position="end" style={{ marginTop: 0 }}>
            <ErrorOutlineIcon color="secondary" />
          </InputAdornment>
        ) : null,
        color: "secondary",
        onKeyDown: keyPress,
        inputProps: {
          style: {
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            paddingLeft: theme.spacing.unit * 2,
            color: theme.palette.white.main,
          },
        },
      }}
      style={{ marginBottom: "10px", borderRadius: "10px" }}
    />
  );
}

export default CustomTextField;
