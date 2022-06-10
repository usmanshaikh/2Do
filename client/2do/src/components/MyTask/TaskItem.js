import React from "react";
import { Icon } from "@mui/material";
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type as ListType } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import "./TaskItem.scss";

const TaskItem = () => {
  const onEditHandler = (data) => {
    console.log("[Handle EDIT]", data);
  };

  const onDeleteHandler = (data) => {
    console.log("[Handle DELETE]", data);
  };

  const trailingActions = (data) => (
    <TrailingActions>
      <SwipeAction onClick={() => onEditHandler("DATA")}>
        <div className="actionContent edited">
          <Icon>edit</Icon>
          Edit
        </div>
      </SwipeAction>
      <SwipeAction onClick={() => onDeleteHandler("DATA")}>
        <div className="actionContent deleted">
          <Icon>delete</Icon>
          Delete
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      <div className="taskItemWrapper">
        <SwipeableList type={ListType.IOS}>
          <SwipeableListItem trailingActions={trailingActions("usman")}>
            <div className="flexContainer">
              <div className="flexItemOne">
                <Icon className="taskChecked">task_alt</Icon>
                <Icon className="taskUnchecked">radio_button_unchecked</Icon>
              </div>
              <div className="flexItemTwo">
                <span className="title">Create 2Do App</span>
                <span className="time">9:00am</span>
              </div>
            </div>
          </SwipeableListItem>
        </SwipeableList>
      </div>
    </>
  );
};

export default TaskItem;
