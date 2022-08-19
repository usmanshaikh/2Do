import React from "react";
import { TaskCard } from "../../components/Cards";
import DatePickerControl from "../../components/DatePickerControl/DatePickerControl";
import { useSetCategoryAndFilterBy } from "../../utils/hooks";
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
