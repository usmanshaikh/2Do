import React from "react";
import { Dialog, DialogTitle, Icon, List, ListItem, ListItemText } from "@mui/material";
import "./FilterTaskModal.scss";

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
      <Dialog className="filterTaskModalComponentWrapper" onClose={handleClose} open={open} fullWidth={true}>
        <DialogTitle className="modalHeading">Category By</DialogTitle>
        <List>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText className="filterName" primary="Personal" />
            <Icon className="mIcon material-icons-round mCheckIcon">check</Icon>
          </ListItem>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText className="filterName" primary="Home" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText className="filterName" primary="Office" />
          </ListItem>
        </List>
        <DialogTitle className="modalHeading">Filter By</DialogTitle>
        <List>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText className="filterName" primary="Incomplete tasks" />
            <Icon className="mIcon material-icons-round mCheckIcon">check</Icon>
          </ListItem>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText className="filterName" primary="Completed tasks" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick()}>
            <ListItemText className="filterName" primary="All tasks" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

export default FilterTaskModal;
