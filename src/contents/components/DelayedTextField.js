import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import { TextField, InputAdornment } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const DELAY = 350;

function DelayedTextField({
  icon,
  keyPress,
  password,
  error,
  refer,
  ...props
}) {
  const theme = useTheme();
  const [value, setValue] = useState(props.value);
  const [writingSince, setWritingSince] = useState(null);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function getDelay() {
    return props.delay || DELAY;
  }

  function handleChange(e) {
    e.persist();
    setWritingSince(Date.now());
    setValue(e.target.value);
    setTimeout(sendChange(e), getDelay() + 10);
  }

  function sendChange(e) {
    return () => {
      if (
        (!writingSince || Date.now() - writingSince > getDelay()) &&
        e.target.value !== props.value
      ) {
        props.onChange(e);
      }
    };
  }
  return (
    <TextField
      {...props}
      value={value}
      onChange={(event) => handleChange(event)}
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

export default DelayedTextField;
