import React, { useContext, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { TaskAPI } from "../../api";
import { TaskCard } from "../../components/Cards";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import { useSetCategoryAndFilterBy } from "../../utils/hooks";
import DatePickerControl from "../../components/DatePickerControl/DatePickerControl";
import constants from "../../utils/constants";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import "./Task.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const Task = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setHeaderTitle = useSetCategoryAndFilterBy();
  const [tasks, setTasks] = useState();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  useEffect(() => {
    allTasks();
  }, []);

  const allTasks = (data) => {
    TaskAPI.allTasks(data)
      .then((res) => setTasks(res))
      .catch((err) => {
        setTasks();
        snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
      });
  };

  const onChangeStatusHandler = (data) => {
    data.isCompleted ? (data.isCompleted = false) : (data.isCompleted = true);
    const payload = { isCompleted: data.isCompleted };
    const taskId = data.id;
    TaskAPI.changeTaskStatus(payload, taskId)
      .then((res) => {
        const idx = tasks.findIndex((item) => item.id === res.id);
        if (idx !== -1) {
          tasks[idx] = data;
          setTasks([...tasks]);
        }
        let status;
        res.isCompleted ? (status = "completed") : (status = "pending");
        const msg = `${MSG.TASK_STATUS_CHANGED_TO} ${status}.`;
        snackbarAlert.showSnackbarAlert({ msg, duration: 2000 });
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const onDeleteTaskHandler = (data) => {
    const taskId = data.id;
    TaskAPI.deleteTask(taskId)
      .then((res) => {
        setTasks(tasks.filter((item) => item.id !== data.id));
        snackbarAlert.showSnackbarAlert({ msg: MSG.TASK_DELETED, duration: 2000 });
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const onEditTaskHandler = (data) => {
    const taskId = data.id;
    navigate({
      pathname: `${location.pathname}/${ROUTE.ADD_EDIT_TASK}`,
      search: createSearchParams({
        taskId,
        edit: true,
      }).toString(),
    });
  };

  return (
    <>
      <DatePickerControl selectedDate={allTasks} />
      <div className="taskPageWrapper">
        {tasks && tasks.length ? (
          <TaskCard
            tasks={tasks}
            changeStatus={onChangeStatusHandler}
            deleteTask={onDeleteTaskHandler}
            editTask={onEditTaskHandler}
          />
        ) : (
          <NoDataFound />
        )}
      </div>
    </>
  );
};

export default Task;
