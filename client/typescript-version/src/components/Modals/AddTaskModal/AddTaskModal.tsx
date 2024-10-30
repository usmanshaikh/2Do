import { Fragment } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Dialog, List, ListItem, ListItemText } from "@mui/material";
import { ROUTES } from "../../../utils/constants";
import "./AddTaskModal.scss";

const AddTaskModal = (props) => {
  const { onClose, open } = props;
  const navigate = useNavigate();

  const handleListItemClick = (url) => {
    if (url === ROUTES.ADD_EDIT_TASK) {
      navigate({
        pathname: `/${ROUTES.TASK}/${ROUTES.ADD_EDIT_TASK}`,
        search: createSearchParams({
          edit: "false",
        }).toString(),
      });
    } else if (url === ROUTES.ADD_EDIT_CHECKLIST) {
      navigate({
        pathname: `/${ROUTES.CHECKLIST}/${ROUTES.ADD_EDIT_CHECKLIST}`,
        search: createSearchParams({
          edit: "false",
        }).toString(),
      });
    }
    onClose();
  };

  const LIST = [
    {
      title: "Add Task",
      url: ROUTES.ADD_EDIT_TASK,
    },
    {
      title: "Add Checklist",
      url: ROUTES.ADD_EDIT_CHECKLIST,
    },
  ];

  return (
    <>
      <Dialog className="addTaskModalComponentWrapper" onClose={onClose} open={open} fullWidth={true}>
        <List>
          {LIST.map((item) => {
            return (
              <Fragment key={item.title}>
                <ListItem onClick={() => handleListItemClick(item.url)}>
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
