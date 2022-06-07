import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import MyTask from "../pages/MyTask/MyTask";

const TaskRoute = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Navigate to="/my-task" />}>
          <Route path="my-task" element={<MyTask />} />
        </Route>
        {/* <Route path="" element={<MyTask />} /> */}
      </Routes>
      <Outlet />
    </>
  );
};
export default TaskRoute;
