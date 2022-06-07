import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import Login from "../pages/Auth/Login/Login";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import ResetPasswordSuccess from "../pages/Auth/ResetPassword/ResetPasswordSuccess";
import SignUp from "../pages/Auth/SignUp/SignUp";
import MyTask from "../pages/MyTask/MyTask";
import Walkthrough from "../pages/Walkthrough/Walkthrough";
import AuthRoute from "./AuthRoute";
import TaskRoute from "./TaskRoute";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password-success" element={<ResetPasswordSuccess />} />
        <Route path="/walkthrough" element={<Walkthrough />} />
        <Route path="/my-task" element={<MyTask />} />
        <Route path="*" element={<p>Not Found!!!</p>} />
      </Routes>
    </>
  );
  // return (
  //   <>
  //     <Routes>
  //       <Route path="/*" element={<AuthRoute />} />
  //       <Route path="/walkthrough" element={<Walkthrough />} />
  //       <Route path="/task/*" element={<TaskRoute />} />
  //       <Route path="*" element={<p>Not Found!!!</p>} />
  //     </Routes>
  //   </>
  // );
};
export default AppRoute;
