import React from "react";
import { Dialog, List, ListItem, ListItemText } from "@mui/material";
import "./AddTaskModal.scss";

const AddTaskModal = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <>
      <Dialog className="addTaskModalComponentWrapper" onClose={handleClose} open={open} fullWidth={true}>
        <List>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText className="title" primary="Add Task" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText className="title" primary="Add Quick Note" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText className="title" primary="Add Check List" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

export default AddTaskModal;
