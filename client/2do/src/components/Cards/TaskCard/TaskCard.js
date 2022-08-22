import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardActionArea, Icon } from "@mui/material";
import { useModal } from "mui-modal-provider";
// prettier-ignore
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type as ListType } from "react-swipeable-list";
import { ConfirmationModal } from "../../Modals";
import { truncateString } from "../../../utils/Helpers";
import constants from "../../../utils/constants";
import Images from "../../../assets/img/images.js";
import DateTime from "../../DateTime/DateTime.js";
import "react-swipeable-list/dist/styles.css";
import "./TaskCard.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const TaskCard = ({ tasks }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showModal } = useModal();

  const onEditTaskHandler = (data) => {
    navigate(`${location.pathname}/${ROUTE.ADD_EDIT_TASK}`);
  };

  const onDeleteHandler = (data) => {
    const initialState = {
      message: MSG.CONFIRMATION_DELETE,
      onConfirm: () => confirmDeleteTaskHandler(),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const confirmDeleteTaskHandler = () => {
    console.log("confirmDeleteTaskHandler");
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

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction className="swipeListTaskActionBtnWrapper" onClick={() => onEditTaskHandler()}>
        <div className="actionBtn deleted">
          <img src={Images.EditSVG} alt="delete" className="actionImg" />
        </div>
      </SwipeAction>
    </LeadingActions>
  );
  return (
    <>
      {tasks.map((item) => {
        return (
          <Fragment key={item?.id}>
            <SwipeableList className="swipeListTaskWrapper taskPending" type={ListType.IOS}>
              <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
                <Card className="taskCardWrap">
                  <CardActionArea>
                    <div className="taskItemWrapper">
                      <span className="bgLine" style={{ backgroundColor: item?.cardColor?.color }}></span>
                      <div className="flexContainer">
                        <div className="flexItemOne">
                          <Icon className="taskUnchecked">radio_button_unchecked</Icon>
                        </div>
                        <div className="flexItemTwo">
                          <span className="title">{truncateString(item?.title)}</span>
                          <DateTime dateAndTime={item?.dateAndTime} alert={item?.alert} />
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
    </>
  );
};

export default TaskCard;
