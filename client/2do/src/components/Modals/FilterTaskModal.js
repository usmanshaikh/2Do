import React from "react";
import { Dialog, DialogTitle, List, ListItem, ListItemText } from "@mui/material";

const FilterTaskModal = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} fullWidth={true}>
        <DialogTitle>Filter Task</DialogTitle>
        <List>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText primary="Incomplete tasks" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText primary="Completed tasks" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText primary="All tasks" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

export default FilterTaskModal;
