import React, { forwardRef, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./SnackbarAlert.scss";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = (props) => {
  const { config, childFn } = props;
  const { msg, type = "success", duration = 4000 } = config;
  const [snackbarAlertOpen, setSnackbarAlertOpen] = useState(false);

  useEffect(() => {
    childFn.current = openSnackbarAlert;
  }, []);

  const openSnackbarAlert = () => {
    setSnackbarAlertOpen(true);
  };

  const closeSnackbarAlert = () => {
    setSnackbarAlertOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={snackbarAlertOpen}
      autoHideDuration={duration}
      onClose={closeSnackbarAlert}>
      <Alert
        className={`snackbarAlertComponentWrapper ${type}`}
        onClose={closeSnackbarAlert}
        severity={type}
        sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
