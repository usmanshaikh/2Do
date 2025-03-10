import { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { taskApi } from "../../api";
import { TaskCard } from "../../components";
import { MSG, ROUTES } from "../../utils/constants";
import { NoDataFound } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { showSnackbar } from "../../store/slices";
import { TaskResponse } from "../../api/types";
import { ChangeTaskStatusPayload, TaskAllPayload } from "../../api/taskApi/types";
import { RootState } from "../../store";
import { getAxiosErrorMessage } from "../../utils/helpers";
import "./Task.scss";

const Task = () => {
  const filter = useAppSelector((state: RootState) => state.filter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  useEffect(() => {
    filter.selectedCategory?._id && fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    const payload: TaskAllPayload = {
      category: filter.selectedCategory?._id,
      isCompleted: filter.selectedStatus?.isCompleted as boolean,
    };
    try {
      const { data } = await taskApi.allTasks(payload);
      setTasks(data.data);
    } catch (error) {
      setTasks([]);
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

  const toggleTaskCompletion = (task: TaskResponse) => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    return updatedTask;
  };

  const handleTaskStatusChange = async (task: TaskResponse) => {
    const updatedTask = toggleTaskCompletion(task);
    const payload: ChangeTaskStatusPayload = { isCompleted: updatedTask.isCompleted, _id: task._id };
    try {
      const { data } = await taskApi.changeTaskStatus(payload);
      const index = tasks.findIndex((item) => item._id === data.data._id);
      if (index !== -1) {
        setTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks[index] = updatedTask;
          return newTasks;
        });
      }
      dispatch(
        showSnackbar({
          message: `${MSG.USER_FEEDBACK.TASK.STATUS_CHANGED} ${updatedTask.isCompleted ? "completed" : "pending"}.`,
          type: "info",
        })
      );
    } catch (error) {
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

  const handleTaskDeletion = async (task: TaskResponse) => {
    const taskId = task._id;
    try {
      await taskApi.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((item) => item._id !== taskId));
      dispatch(showSnackbar({ message: MSG.USER_FEEDBACK.TASK.DELETED, type: "info" }));
    } catch (error) {
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

  const handleTaskEdit = (task: TaskResponse) => {
    navigate({
      pathname: `${location.pathname}/${ROUTES.ADD_EDIT_TASK}`,
      search: createSearchParams({ taskId: task._id, edit: "true" }).toString(),
    });
  };

  return (
    <>
      <Box className="taskPageWrapper">
        {tasks.length ? (
          <TaskCard
            tasks={tasks}
            onStatusChange={handleTaskStatusChange}
            onDeleteTask={handleTaskDeletion}
            onEditTask={handleTaskEdit}
          />
        ) : (
          <NoDataFound />
        )}
      </Box>
    </>
  );
};

export default Task;
