import React from "react";
import { Icon } from "@mui/material";
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import "./TaskItem.scss";

const TaskItem = () => {
  const handleReject = () => {
    console.log("[Handle REJECT]");
  };

  const handleDelete = () => {
    console.log("[Handle DELETE]");
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.info("swipe action triggered")}>Action name</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={handleReject()}>
        <div className="actionContent rejected">
          <Icon>edit</Icon>
          Edit
        </div>
      </SwipeAction>
      <SwipeAction onClick={handleDelete()}>
        <div className="actionContent deleted">
          <Icon>delete</Icon>
          Delete
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      <div>
        <SwipeableList>
          <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
            <Icon>radio_button_unchecked</Icon>
            <Icon>task_alt</Icon>
            Item content
          </SwipeableListItem>
        </SwipeableList>
      </div>
    </>
  );
};

export default TaskItem;
