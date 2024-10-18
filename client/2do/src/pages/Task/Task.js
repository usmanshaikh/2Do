import React, { useContext, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { CategoryAPI, TaskAPI } from "../../api";
import { TaskCard } from "../../components/Cards";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import { useDidMountEffect, useGlobalContext } from "../../utils/hooks";
import { filterByToBoolean } from "../../utils/Helpers";
import moment from "moment";
import DatePickerControl from "../../components/DatePickerControl/DatePickerControl";
import constants from "../../utils/constants";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import "./Task.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const Task = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);
  const { filterOptions, filterOptionsDispatchHandler, filterOptionsModalOpen, setHeaderTitleHandler } =
    useGlobalContext();

  useEffect(() => {
    const headerTitle = filterOptions.categoryName;
    if (headerTitle) setHeaderTitleHandler(headerTitle);
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    CategoryAPI.allCategories()
      .then((res) => {
        if (!filterOptions.category || !filterOptions.isCompleted) {
          const path = res[0];
          const categoryColor = path.cardColor.color;
          const categoryName = path.categoryName;
          const category = path.id;
          const isCompleted = MSG.FITER_BY_ALL;
          const dispatchPayload = { type: "setState", categoryColor, categoryName, category, isCompleted };
          filterOptionsDispatchHandler(dispatchPayload);
        }
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  useEffect(() => {
    if (!filterOptionsModalOpen && (filterOptions.category || filterOptions.isCompleted)) {
      allTasks();
    }
  }, [filterOptionsModalOpen, filterOptions]);

  useDidMountEffect(() => {
    allTasks();
  }, [selectedDate]);

  const allTasks = () => {
    let payload = {};
    payload.category = filterOptions.category;
    payload.isCompleted = filterByToBoolean(filterOptions.isCompleted);
    if (selectedDate) payload.dateAndTime = selectedDate;
    if (!payload.category && !payload.isCompleted && !payload.selectedDate) return;
    TaskAPI.allTasks(payload)
      .then((res) => {
        setTasks(res);
        if (!res.length) setIsLoading(true);
        else setIsLoading(false);
      })
      .catch((err) => {
        setTasks();
        setIsLoading(true);
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
      <DatePickerControl onSelectDate={(data) => setSelectedDate(data)} />
      <div className="taskPageWrapper">
        {tasks && tasks.length ? (
          <TaskCard
            tasks={tasks}
            changeStatus={onChangeStatusHandler}
            deleteTask={onDeleteTaskHandler}
            editTask={onEditTaskHandler}
          />
        ) : null}
        {isLoading && <NoDataFound />}
      </div>
    </>
  );
};

export default Task;
