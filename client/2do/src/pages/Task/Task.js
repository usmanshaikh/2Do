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

  return (
    <>
      <DatePickerControl />
      <div className="taskPageWrapper">{tasks && <TaskCard tasks={tasks} />}</div>
    </>
  );
};

export default Task;
