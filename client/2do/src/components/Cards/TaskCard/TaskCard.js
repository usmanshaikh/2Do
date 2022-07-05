import React, { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardActionArea, Icon } from "@mui/material";
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type as ListType } from "react-swipeable-list";
import ConfirmationModal from "../../Modals/ConfirmationModal/ConfirmationModal.js";
import { truncateString } from "../../../utils/Helpers/Helpers.js";
import * as Path from "../../../utils/constants/routePath.constants";
import Images from "../../../assets/img/images.js";
import DateTime from "../../DateTime/DateTime.js";
import "react-swipeable-list/dist/styles.css";
import "./TaskCard.scss";

const TaskCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const onEditTaskHandler = (data) => {
    navigate(`${location.pathname}/${Path.ADD_EDIT_TASK}`);
  };

  const onDeleteHandler = (data) => {
    setOpenConfirmationModal(true);
  };

  const closeConfirmationModalHandler = () => {
    setOpenConfirmationModal(false);
  };

  const trailingActions = (data) => (
    <TrailingActions>
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
                <Card onClick={onEditTaskHandler} className="taskCardWrap">
                  <CardActionArea>
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
                          <DateTime />
                        </div>
                      </div>
                    </div>
                  </CardActionArea>
                </Card>
              </SwipeableListItem>
            </SwipeableList>
            <SwipeableList className="swipeListTaskWrapper taskPending" type={ListType.IOS}>
              <SwipeableListItem trailingActions={trailingActions("usman")}>
                <Card onClick={onEditTaskHandler} className="taskCardWrap">
                  <CardActionArea>
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
                          <DateTime />
                        </div>
                      </div>
                    </div>
                  </CardActionArea>
                </Card>
              </SwipeableListItem>
            </SwipeableList>
            <SwipeableList className="swipeListTaskWrapper taskCompleted" type={ListType.IOS}>
              <SwipeableListItem trailingActions={trailingActions("usman")}>
                <Card onClick={onEditTaskHandler} className="taskCardWrap">
                  <CardActionArea>
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
                          <DateTime />
                        </div>
                      </div>
                    </div>
                  </CardActionArea>
                </Card>
              </SwipeableListItem>
            </SwipeableList>
          </Fragment>
        );
      })}
      <ConfirmationModal open={openConfirmationModal} onClose={closeConfirmationModalHandler} />
    </>
  );
};

export default TaskCard;
