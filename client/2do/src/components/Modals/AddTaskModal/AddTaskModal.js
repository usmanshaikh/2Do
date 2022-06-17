import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, List, ListItem, ListItemText } from "@mui/material";
import * as Path from "../../../utils/constants/routePath.constants";
import "./AddTaskModal.scss";

const AddTaskModal = (props) => {
  const navigate = useNavigate();

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (url) => {
    if (url === "ADD_TASK") {
      navigate(`/${Path.TASK}/${Path[url]}`);
    } else if (url === "ADD_CHECK_LIST") {
      navigate(`/${Path.CHECK_LIST}/${Path[url]}`);
    }
    onClose();
  };

  const LIST = [
    {
      title: "Add Task",
      url: "ADD_TASK",
    },
    {
      title: "Add Check List",
      url: "ADD_CHECK_LIST",
    },
  ];

  return (
    <>
      <Dialog className="addTaskModalComponentWrapper" onClose={handleClose} open={open} fullWidth={true}>
        <List>
          {LIST.map((item) => {
            return (
              <Fragment key={item.title}>
                <ListItem button onClick={() => handleListItemClick(item.url)}>
                  <ListItemText className="title" primary={item.title} />
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Dialog>
    </>
  );
};

export default AddTaskModal;
