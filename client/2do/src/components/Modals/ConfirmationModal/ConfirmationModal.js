import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import "./ConfirmationModal.scss";

/**
 *
 * @param {{ title: string, message: string, onConfirm: (), type: ('success'|'danger') }} props
 */

const ConfirmationModal = (props) => {
  const { onClose, open, title, message, onConfirm, type = "success" } = props;

  const onYesHandler = () => {
    onConfirm("yes");
    onClose();
  };

  const onCancelHandler = () => {
    onClose();
  };

  return (
    <>
      <Dialog className="confirmationModalComponentWrapper" onClose={onCancelHandler} open={open} fullWidth={true}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <h1>{message}</h1>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onCancelHandler}>
            Cancel
          </Button>
          <Button variant="contained" color={type === "danger" ? "error" : "success"} onClick={onYesHandler}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
