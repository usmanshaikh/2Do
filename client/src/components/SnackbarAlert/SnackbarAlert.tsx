import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { hideSnackbar } from "../../store/slices/snackbarSlice";
import { RootState } from "../../store";
import "./SnackbarAlert.scss";

const SnackbarAlert = () => {
  const dispatch = useDispatch();
  const { isVisible, message, type } = useSelector((state: RootState) => state.snackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={isVisible}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert
        className={`snackbarAlertComponentWrapper ${type}`}
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
