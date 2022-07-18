import React from "react";
import TaskCard from "../../components/Cards/TaskCard/TaskCard";
import Calendar from "../../components/Calendar/Calendar";
import useSetCategoryAndFilterBy from "../../utils/hooks/useSetCategoryAndFilterBy";
import "./Task.scss";

const Task = () => {
  const setHeaderTitle = useSetCategoryAndFilterBy();

  return (
    <>
      <Calendar />
      <div className="taskPageWrapper">
        <TaskCard />
      </div>
    </>
  );
};

export default Task;
