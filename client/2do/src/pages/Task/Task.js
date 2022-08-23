import React, { useContext, useEffect, useState } from "react";
import { TaskAPI } from "../../api";
import { TaskCard } from "../../components/Cards";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import { useSetCategoryAndFilterBy } from "../../utils/hooks";
import DatePickerControl from "../../components/DatePickerControl/DatePickerControl";
import "./Task.scss";

const Task = () => {
  const setHeaderTitle = useSetCategoryAndFilterBy();
  const [tasks, setTasks] = useState();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  useEffect(() => {
    allTasks();
  }, []);

  const allTasks = () => {
    TaskAPI.allTasks()
      .then((res) => setTasks(res))
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
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
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const onDeleteTaskHandler = (data) => {
    const taskId = data.id;
    TaskAPI.deleteTask(taskId)
      .then((res) => {
        setTasks(tasks.filter((item) => item.id !== data.id));
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  return (
    <>
      <DatePickerControl />
      <div className="taskPageWrapper">
        {tasks && <TaskCard tasks={tasks} changeStatus={onChangeStatusHandler} deleteTask={onDeleteTaskHandler} />}
      </div>
    </>
  );
};

export default Task;
