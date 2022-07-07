import React from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import "./ConfirmationModal.scss";

/**
 *
 * @param {{ message: string, onConfirm: (), type: ('success'|'danger') }} props
 */

const ConfirmationModal = (props) => {
  const { onClose, open, message, onConfirm, type = "success" } = props;

  const onYesHandler = () => {
    onConfirm("yes");
    onClose();
  };

  const onCancelHandler = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        className="confirmationModalComponentWrapper commonModalWrapper"
        onClose={onCancelHandler}
        open={open}
        fullWidth={true}>
        <DialogContent className="modalContentWrap">
          <p className="modalMsg">{message}</p>
        </DialogContent>
        <DialogActions className="actionBtnFlexContainer">
          <Button autoFocus onClick={onCancelHandler} className="cancelBtn actionBtn">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onYesHandler}
            className={`yesBtn actionBtn ${type === "danger" ? "dangerBtn " : "successBtn "}`}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
