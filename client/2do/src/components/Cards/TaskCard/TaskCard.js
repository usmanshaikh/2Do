import React, { Fragment } from "react";
import { Icon } from "@mui/material";
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type as ListType } from "react-swipeable-list";
import Images from "../../../assets/img/images.js";
import { truncateString } from "../../../utils/Helpers/Helpers.js";
import "react-swipeable-list/dist/styles.css";
import "./TaskCard.scss";

const TaskCard = () => {
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
          <Fragment key={i}>
            <SwipeableList className="swipeListTaskWrapper taskPending" type={ListType.IOS}>
              <SwipeableListItem trailingActions={trailingActions("usman")}>
                <div className="taskItemWrapper">
                  <span className="bgLine" style={{ backgroundColor: "#0693e3" }}></span>
                  <div className="flexContainer">
                    <div className="flexItemOne">
                      <Icon className="taskUnchecked">radio_button_unchecked</Icon>
                    </div>
                    <div className="flexItemTwo">
                      <span className="title">
                        {truncateString(
                          "Add NPM package for React DOM and DateTimePicker.Add NPM package for React DOM and DateTimePicker.Add NPM package for React DOM and DateTimePicker."
                        )}
                      </span>
                      <span className="time numberReg">9:00 am</span>
                    </div>
                  </div>
                </div>
              </SwipeableListItem>
            </SwipeableList>
            <SwipeableList className="swipeListTaskWrapper taskPending" type={ListType.IOS}>
              <SwipeableListItem trailingActions={trailingActions("usman")}>
                <div className="taskItemWrapper">
                  <span className="bgLine" style={{ backgroundColor: "#00d084" }}></span>
                  <div className="flexContainer">
                    <div className="flexItemOne">
                      <Icon className="taskUnchecked">radio_button_unchecked</Icon>
                    </div>
                    <div className="flexItemTwo">
                      <span className="title">
                        {truncateString("Create 2Do App by using ReactJS, NodeJs and Mongodb.")}
                      </span>
                      <span className="time numberReg">7:00 pm</span>
                    </div>
                  </div>
                </div>
              </SwipeableListItem>
            </SwipeableList>
            <SwipeableList className="swipeListTaskWrapper taskCompleted" type={ListType.IOS}>
              <SwipeableListItem trailingActions={trailingActions("usman")}>
                <div className="taskItemWrapper">
                  <span className="bgLine" style={{ backgroundColor: "#eb144c" }}></span>
                  <div className="flexContainer">
                    <div className="flexItemOne">
                      <Icon className="taskChecked">check_circle</Icon>
                    </div>
                    <div className="flexItemTwo">
                      <span className="title">
                        {truncateString(
                          "Create component and HTML structure. Create 2Do App by using ReactJS, NodeJs and Mongodb."
                        )}
                      </span>
                      <span className="time numberReg">1:00 pm</span>
                    </div>
                  </div>
                </div>
              </SwipeableListItem>
            </SwipeableList>
          </Fragment>
        );
      })}
    </>
  );
};

export default TaskCard;
