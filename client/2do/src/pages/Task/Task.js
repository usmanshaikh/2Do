import React, { useContext, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { TaskAPI } from "../../api";
import { TaskCard } from "../../components/Cards";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import constants from "../../utils/constants";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import Filters from "../../components/Filters/Filters";
import "./Task.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const Task = () => {
  const filter = useSelector((state) => state.filter);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  useEffect(() => {
    filter.selectedCategory?.id && fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    const payload = {
      category: filter.selectedCategory?.id,
      isCompleted: filter.selectedStatus?.isCompleted,
    };
    try {
      const res = await TaskAPI.allTasks(payload);
      setTasks(res);
    } catch (err) {
      setTasks([]);
      snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
    }
  };

  const toggleTaskCompletion = (task) => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    return updatedTask;
  };

  const handleTaskStatusChange = async (task) => {
    const updatedTask = toggleTaskCompletion(task);
    const payload = { isCompleted: updatedTask.isCompleted };
    const taskId = task.id;

    try {
      const res = await TaskAPI.changeTaskStatus(payload, taskId);
      const index = tasks.findIndex((item) => item.id === res.id);
      if (index !== -1) {
        setTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks[index] = updatedTask;
          return newTasks;
        });
      }
      snackbarAlert.showSnackbarAlert({
        msg: `${MSG.TASK_STATUS_CHANGED_TO} ${updatedTask.isCompleted ? "completed" : "pending"}.`,
        duration: 2000,
      });
    } catch (err) {
      snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
    }
  };

  const handleTaskDeletion = async (task) => {
    const taskId = task.id;
    try {
      await TaskAPI.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((item) => item.id !== taskId));
      snackbarAlert.showSnackbarAlert({ msg: MSG.TASK_DELETED, duration: 2000 });
    } catch (err) {
      snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
    }
  };

  const handleTaskEdit = (task) => {
    navigate({
      pathname: `${location.pathname}/${ROUTE.ADD_EDIT_TASK}`,
      search: createSearchParams({ taskId: task.id, edit: true }).toString(),
    });
  };

  return (
    <>
      <Box className="taskPageWrapper">
        {tasks.length ? (
          <TaskCard
            tasks={tasks}
            changeStatus={handleTaskStatusChange}
            deleteTask={handleTaskDeletion}
            editTask={handleTaskEdit}
          />
        ) : (
          <NoDataFound />
        )}
      </Box>
    </>
  );
};

export default Task;
