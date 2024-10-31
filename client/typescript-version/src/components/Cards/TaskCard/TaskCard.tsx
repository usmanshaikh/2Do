import { Fragment } from "react";
import { Box, Card, CardActionArea, Icon } from "@mui/material";
import { useModal } from "mui-modal-provider";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import { ConfirmationModal } from "../../Modals";
import { truncateString } from "../../../utils/helpers";
import { MSG } from "../../../utils/constants";
import { TaskResponse } from "../../../api/types";
import Images from "../../../assets/img";
import { DateTimeDisplay } from "../../index";
import "react-swipeable-list/dist/styles.css";
import "./TaskCard.scss";

interface Props {
  tasks: TaskResponse[];
  onStatusChange: (task: TaskResponse) => void;
  onDeleteTask: (task: TaskResponse) => void;
  onEditTask: (task: TaskResponse) => void;
}

const TaskCard = ({ tasks, onStatusChange, onDeleteTask, onEditTask }: Props) => {
  const { showModal } = useModal();

  const confirmDeleteTask = (task: TaskResponse) => {
    const initialState = {
      message: MSG.USER_FEEDBACK.CONFIRMATION_DELETE,
      onConfirm: () => onDeleteTask(task),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const renderTrailingActions = (task: TaskResponse) => (
    <TrailingActions>
      <SwipeAction onClick={() => confirmDeleteTask(task)}>
        <Box className="swipeListTaskActionBtnWrapper">
          <Box className="actionBtn deleted">
            <img src={Images.DeleteSVG} alt="delete" className="actionImg" />
          </Box>
        </Box>
      </SwipeAction>
    </TrailingActions>
  );

  const renderLeadingActions = (task: TaskResponse) => (
    <LeadingActions>
      <SwipeAction onClick={() => onEditTask(task)}>
        <Box className="swipeListTaskActionBtnWrapper">
          <Box className="actionBtn deleted">
            <img src={Images.EditSVG} alt="delete" className="actionImg" />
          </Box>
        </Box>
      </SwipeAction>
    </LeadingActions>
  );

  const handleStatusChange = (event: React.MouseEvent, task: TaskResponse) => {
    event.stopPropagation();
    onStatusChange(task);
  };

  return (
    <>
      {tasks.map((task: TaskResponse) => {
        return (
          <Fragment key={task.id}>
            <SwipeableList className="swipeListTaskWrapper taskPending" type={ListType.IOS}>
              <SwipeableListItem
                leadingActions={renderLeadingActions(task)}
                trailingActions={renderTrailingActions(task)}
                onClick={() => onEditTask(task)}>
                <Card className="taskCardWrap">
                  <Box className="taskItemWrapper">
                    <span className="bgLine" style={{ backgroundColor: task.cardColor }}></span>
                    <Box className="flexContainer">
                      <Box className="flexItemOne" onClick={(e) => handleStatusChange(e, task)}>
                        <CardActionArea className="checkCircleWrap">
                          {task.isCompleted ? (
                            <Icon className="taskChecked">check_circle</Icon>
                          ) : (
                            <Icon className="taskUnchecked">radio_button_unchecked</Icon>
                          )}
                        </CardActionArea>
                      </Box>
                      <Box className="flexItemTwo">
                        <CardActionArea className="infoWrap">
                          <span className="title">{truncateString(task.title)}</span>
                          <DateTimeDisplay dateAndTime={task.dateAndTime} alert={task.alert} />
                        </CardActionArea>
                      </Box>
                    </Box>
                  </Box>
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
