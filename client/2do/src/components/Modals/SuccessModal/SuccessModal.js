import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

/**
 * @param {{ message: string, onClose: () }} props
 */
const SuccessModal = (props) => {
  const { open, message, onClose } = props;

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    onClose();
  };

  return (
    <>
      <Dialog
        className="successModalComponentWrapper commonModalWrapper"
        onClose={handleClose}
        open={open}
        fullWidth={true}>
        <DialogTitle className="modalTitle success">Success</DialogTitle>
        <DialogContent className="modalContentWrap">
          <p className="modalMsg">{message}</p>
        </DialogContent>
        <DialogActions className="actionBtnFlexContainer">
          <Button onClick={handleClose} className="cancelBtn actionBtn">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SuccessModal;
