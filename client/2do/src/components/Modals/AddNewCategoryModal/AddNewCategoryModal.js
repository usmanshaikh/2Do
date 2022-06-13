import React from "react";
import { Dialog } from "@mui/material";
import "./AddNewCategoryModal.scss";

const AddNewCategoryModal = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <>
      <Dialog className="addTaskModalComponentWrapper" onClose={handleClose} open={open} fullWidth={true}>
        <h1>Add New Category Modal</h1>
      </Dialog>
    </>
  );
};

export default AddNewCategoryModal;
