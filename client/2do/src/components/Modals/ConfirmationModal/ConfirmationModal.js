import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import "./ConfirmationModal.scss";

const ConfirmationModal = (props) => {
  const { onClose, open } = props;

  const onYesHandler = () => {
    onClose();
  };

  const onCancelHandler = () => {
    onClose();
  };

  return (
    <>
      <Dialog className="confirmationModalComponentWrapper" onClose={onCancelHandler} open={open} fullWidth={true}>
        <DialogTitle>Confirmaion Modal</DialogTitle>
        <DialogContent dividers>
          <h1>Confirmation </h1>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onCancelHandler}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onYesHandler}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
