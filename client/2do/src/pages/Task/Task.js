import React from "react";
import TaskCard from "../../components/Cards/TaskCard/TaskCard";
import DatePickerControl from "../../components/DatePickerControl/DatePickerControl";
import useSetCategoryAndFilterBy from "../../utils/hooks/useSetCategoryAndFilterBy";
import "./Task.scss";

const Task = () => {
  const setHeaderTitle = useSetCategoryAndFilterBy();

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
