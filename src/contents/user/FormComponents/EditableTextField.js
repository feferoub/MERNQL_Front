import React, { useState, useEffect } from "react";
import { TextField, Typography, InputAdornment } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const DELAY = 350;

function EditableTextField({
  label,
  value,
  error,
  disabled,
  onChange,
  keyPress,
  delayed,
}) {
  const classes = useStyle();
  const theme = useTheme();
  const [valueVisible, setValueVisible] = useState(value);
  const [writingSince, setWritingSince] = useState(null);

  useEffect(() => {
    setValueVisible(value);
  }, [value]);

  function getDelay() {
    return DELAY;
  }

  function handleChange(e) {
    e.persist();
    setWritingSince(Date.now());
    setValueVisible(e.target.value);
    setTimeout(sendChange(e), getDelay() + 10);
  }

  function sendChange(e) {
    return () => {
      if (
        (!writingSince || Date.now() - writingSince > getDelay()) &&
        e.target.value !== value
      ) {
        onChange(e);
      }
    };
  }

  return (
    <div className={classes.container}>
      <Typography variant="h7" style={{ color: theme.palette.white.main }}>
        {label}
      </Typography>
      <TextField
        value={valueVisible}
        disabled={disabled}
        onChange={(event) => {
          if (delayed) {
            handleChange(event);
          } else {
            onChange(event);
          }
        }}
        InputProps={{
          color: "secondary",
          inputProps: {
            style: {
              paddingTop: theme.spacing.unit,
              paddingBottom: theme.spacing.unit,
              color: theme.palette.white.main,
              fontWeight: "bold",
            },
          },
          onKeyDown: keyPress,

          endAdornment: error ? (
            <InputAdornment
              position="end"
              style={{ marginTop: 0, marginLeft: theme.spacing.unit * -3 }}
            >
              <ErrorOutlineIcon color="secondary" />
            </InputAdornment>
          ) : null,
        }}
        style={{ marginBottom: "10px", borderRadius: "10px" }}
      />
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
}));

export default EditableTextField;
