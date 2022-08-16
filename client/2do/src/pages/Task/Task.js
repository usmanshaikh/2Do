import React, { useEffect } from "react";
import { AuthAPI } from "../../api";
import TaskCard from "../../components/Cards/TaskCard/TaskCard";
import DatePickerControl from "../../components/DatePickerControl/DatePickerControl";
import useSetCategoryAndFilterBy from "../../utils/hooks/useSetCategoryAndFilterBy";
import "./Task.scss";

const Task = () => {
  const setHeaderTitle = useSetCategoryAndFilterBy();

  const fetchMoviesHandler = async () => {
    console.log("IN");
    const payload = {
      email: "shaikhusman57@gmail.com",
      password: "usman123",
    };
    // let login = await AuthAPI.login(payload);
    console.log("COMPLETE");
    console.log({ login });
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

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
