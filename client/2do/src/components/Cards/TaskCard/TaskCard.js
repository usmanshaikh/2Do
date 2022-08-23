import React, { Fragment, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardActionArea, Icon } from "@mui/material";
import { useModal } from "mui-modal-provider";
// prettier-ignore
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, Type as ListType } from "react-swipeable-list";
import { ConfirmationModal } from "../../Modals";
import { truncateString } from "../../../utils/Helpers";
import { GlobalSnackbarAlertContext } from "../../../utils/contexts";
import constants from "../../../utils/constants";
import Images from "../../../assets/img/images.js";
import DateTime from "../../DateTime/DateTime.js";
import "react-swipeable-list/dist/styles.css";
import "./TaskCard.scss";

const MSG = constants.message;

const TaskCard = (props) => {
  const { tasks, changeStatus, deleteTask, editTask } = props;
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);
  const { showModal } = useModal();

  const onDeleteHandler = (data) => {
    const initialState = {
      message: MSG.CONFIRMATION_DELETE,
      onConfirm: () => deleteTask(data),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const trailingActions = (data) => (
    <TrailingActions>
      <SwipeAction className="swipeListTaskActionBtnWrapper" onClick={() => onDeleteHandler(data)}>
        <div className="actionBtn deleted">
          <img src={Images.DeleteSVG} alt="delete" className="actionImg" />
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  const leadingActions = (data) => (
    <LeadingActions>
      <SwipeAction className="swipeListTaskActionBtnWrapper" onClick={() => editTask(data)}>
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
              <SwipeableListItem leadingActions={leadingActions(item)} trailingActions={trailingActions(item)}>
                <Card className="taskCardWrap" onClick={() => changeStatus(item)}>
                  <CardActionArea>
                    <div className="taskItemWrapper">
                      <span className="bgLine" style={{ backgroundColor: item?.cardColor?.color }}></span>
                      <div className="flexContainer">
                        <div className="flexItemOne">
                          {/* <img src={Images.Loading} alt="loading" className="loadingImg" /> */}
                          {item?.isCompleted ? (
                            <Icon className="taskChecked">check_circle</Icon>
                          ) : (
                            <Icon className="taskUnchecked">radio_button_unchecked</Icon>
                          )}
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
