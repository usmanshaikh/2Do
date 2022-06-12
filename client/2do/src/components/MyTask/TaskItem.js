import React from "react";
import { Icon } from "@mui/material";
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type as ListType } from "react-swipeable-list";
import Images from "../../assets/img/images.js";
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
      <SwipeAction className="swipeListTaskActionBtnWrapper" onClick={() => onEditHandler("DATA")}>
        <div className="actionBtn edited">
          <img src={Images.EditSVG} alt="edit" className="actionImg" />
        </div>
      </SwipeAction>
      <SwipeAction className="swipeListTaskActionBtnWrapper" onClick={() => onDeleteHandler("DATA")}>
        <div className="actionBtn deleted">
          <img src={Images.DeleteSVG} alt="delete" className="actionImg" />
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      {Array.from(Array(3)).map((_, i) => {
        return (
          <>
            <SwipeableList className="swipeListTaskWrapper taskPending" type={ListType.IOS}>
              <SwipeableListItem trailingActions={trailingActions("usman")}>
                <div className="taskItemWrapper">
                  <div className="flexContainer">
                    <div className="flexItemOne">
                      <Icon className="taskUnchecked">radio_button_unchecked</Icon>
                    </div>
                    <div className="flexItemTwo">
                      <span className="title">Add NPM package for React DOM and DateTimePicker.</span>
                      <span className="time numberReg">9:00 am</span>
                    </div>
                  </div>
                </div>
              </SwipeableListItem>
            </SwipeableList>
            <SwipeableList className="swipeListTaskWrapper taskPending" type={ListType.IOS}>
              <SwipeableListItem trailingActions={trailingActions("usman")}>
                <div className="taskItemWrapper">
                  <div className="flexContainer">
                    <div className="flexItemOne">
                      <Icon className="taskUnchecked">radio_button_unchecked</Icon>
                    </div>
                    <div className="flexItemTwo">
                      <span className="title">Create 2Do App by using ReactJS, NodeJs and Mongodb.</span>
                      <span className="time numberReg">7:00 pm</span>
                    </div>
                  </div>
                </div>
              </SwipeableListItem>
            </SwipeableList>
            <SwipeableList className="swipeListTaskWrapper taskCompleted" type={ListType.IOS}>
              <SwipeableListItem trailingActions={trailingActions("usman")}>
                <div className="taskItemWrapper">
                  <div className="flexContainer">
                    <div className="flexItemOne">
                      <Icon className="taskChecked">check_circle</Icon>
                    </div>
                    <div className="flexItemTwo">
                      <span className="title">Create component and HTML structure.</span>
                      <span className="time numberReg">1:00 pm</span>
                    </div>
                  </div>
                </div>
              </SwipeableListItem>
            </SwipeableList>
          </>
        );
      })}
    </>
  );
};

export default TaskItem;
