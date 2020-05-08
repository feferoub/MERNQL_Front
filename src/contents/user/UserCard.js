import React, { useState, useEffect } from "react";
import { Fab, Typography, Button, Modal, IconButton } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EditableTextField from "./FormComponents/EditableTextField";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { UPDATE_USER } from "./mutations";
import { CHECK_USER_EXIST } from "./queries";

const mapFieldToLabel = {
  userName: "Nom d'utilisateur",
  email: "Email",
  firstName: "Prénom",
  lastName: "Nom",
};

function Card({ user: { userName, email, firstName, lastName, ...props } }) {
  const [editMode, setEditMode] = useState(false);
  const [update, updateUserResult] = useMutation(UPDATE_USER);

  const [userState, setUserState] = useState({
    userName,
    email,
    firstName,
    lastName,
  });
  const [errorField, setErrorField] = useState(null);

  const [activeField, setActiveField] = useState(
    document.activeElement.placeholder
  );
  const [getUser, getUserResult] = useLazyQuery(CHECK_USER_EXIST, {
    fetchPolicy: "network-only",
  });
  const classes = useStyle();
  const theme = useTheme();
  useEffect(() => {
    if (
      updateUserResult &&
      updateUserResult.data &&
      updateUserResult.data.updateUser
    ) {
      setUserState(updateUserResult.data.updateUser);
    }
  }, [updateUserResult]);

  useEffect(() => {
    document.body.addEventListener(
      "focus",
      () => {
        setActiveField(document.activeElement.placeholder);
      },
      true
    );
  }, []);

  function isValid() {
    return (
      typeof userState.userName === "string" &&
      typeof userState.email === "string" &&
      !!userState.email &&
      !!userState.userName &&
      !errorField
    );
  }

  function keyPress(e) {
    if (e.keyCode === 13 && isValid()) {
      updateUser();
    }
  }

  function updateUser() {
    update({ variables: userState });
    setEditMode(!editMode);
    setErrorField(null);
  }

  useEffect(() => {
    if (getUserResult.data) {
      if (
        getUserResult.data.checkIfUserExists === "userName" &&
        userState.userName !== userName
      ) {
        setErrorField("userName");
      }
      if (
        getUserResult.data.checkIfUserExists === "email" &&
        userState.email !== email
      ) {
        setErrorField("email");
      }
    }
  }, [getUserResult]);
  return (
    <div
      className={`${classes.container} ${
        editMode ? classes.editContainer : ""
      }`}
    >
      {editMode ? (
        <Fab
          onClick={() => {
            setUserState({
              userName,
              email,
              firstName,
              lastName,
            });
            setEditMode(!editMode);
            setErrorField(null);
          }}
          size="small"
          color="primary"
          className={classes.closeIcon}
        >
          <CloseIcon style={{ color: theme.palette.white.main }} />
        </Fab>
      ) : null}
      {editMode ? (
        <Fab
          onClick={updateUser}
          size="small"
          disabled={!isValid()}
          color="primary"
          className={classes.iconContainer}
        >
          <CheckIcon style={{ color: theme.palette.secondary.main }} />
        </Fab>
      ) : null}
      {["email", "userName", "lastName", "firstName"].map((field) => {
        return (
          <EditableTextField
            error={errorField === field}
            delayed={["userName", "email"].includes(field)}
            keyPress={keyPress}
            onChange={(e) => {
              if (errorField === field) {
                setErrorField(null);
              }
              if (["userName", "email"].includes(field)) {
                getUser({ variables: { [field]: e.target.value } });
              }
              let newUserState = Object.create(userState);
              newUserState[field] = e.target.value;
              setUserState({
                userName: newUserState.userName,
                lastName: newUserState.lastName,
                firstName: newUserState.firstName,
                email: newUserState.email,
              });
            }}
            label={mapFieldToLabel[field]}
            value={userState[field]}
            disabled={!editMode}
          />
        );
      })}
      {editMode ? null : (
        <Button
          variant="outlined"
          disabled={editMode}
          className={classes.button}
          size="large"
          color="secondary"
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          Modifier
        </Button>
      )}
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  button: {
    borderRadius: 10,
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 10,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(),
    marginBottom: theme.spacing(),
    position: "relative",
  },
  iconContainer: {
    right: theme.spacing(),
    bottom: theme.spacing(),
    position: "absolute",
  },
  closeIcon: {
    left: theme.spacing(),
    bottom: theme.spacing(),
    position: "absolute",
  },
  editContainer: {
    backgroundColor: theme.palette.primary.light,
    paddingBottom: theme.spacing(6.3),
  },
}));

export default Card;
