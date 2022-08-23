import React, { Fragment } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Dialog, List, ListItem, ListItemText } from "@mui/material";
import constants from "../../../utils/constants";
import "./AddTaskModal.scss";

const ROUTE = constants.routePath;

const AddTaskModal = (props) => {
  const { onClose, open } = props;
  const navigate = useNavigate();

  const handleListItemClick = (url) => {
    if (url === ROUTE.ADD_EDIT_TASK) {
      navigate({
        pathname: `/${ROUTE.TASK}/${ROUTE.ADD_EDIT_TASK}`,
        search: createSearchParams({
          edit: false,
        }).toString(),
      });
    } else if (url === ROUTE.ADD_EDIT_CHECKLIST) {
      navigate({
        pathname: `/${ROUTE.CHECKLIST}/${ROUTE.ADD_EDIT_CHECKLIST}`,
        search: createSearchParams({
          edit: false,
        }).toString(),
      });
    }
    onClose();
  };

  const LIST = [
    {
      title: "Add Task",
      url: ROUTE.ADD_EDIT_TASK,
    },
    {
      title: "Add Checklist",
      url: ROUTE.ADD_EDIT_CHECKLIST,
    },
  ];

  return (
    <>
      <Dialog className="addTaskModalComponentWrapper" onClose={onClose} open={open} fullWidth={true}>
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
