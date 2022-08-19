import React, { useEffect } from "react";
import { TaskAPI } from "../../api";
import { TaskCard } from "../../components/Cards";
import DatePickerControl from "../../components/DatePickerControl/DatePickerControl";
import { useSetCategoryAndFilterBy } from "../../utils/hooks";
import "./Task.scss";

const Task = () => {
  const setHeaderTitle = useSetCategoryAndFilterBy();

  useEffect(() => {
    first();
  }, []);

  const first = async () => {
    let task = TaskAPI.allTasks();
    task = TaskAPI.allTasks();
    task = TaskAPI.allTasks();
    task = TaskAPI.allTasks();
    task = TaskAPI.allTasks();
    task = TaskAPI.allTasks();
    task = TaskAPI.allTasks();
    task = TaskAPI.allTasks();
  };

  return (
    <>
      <DatePickerControl />
      <div className="taskPageWrapper">
        <TaskCard />
      </div>
    </>
  );
};

export default Task;
