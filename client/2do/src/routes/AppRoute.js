import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import * as Path from "../utils/constants/routePath.constants";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import Login from "../pages/Auth/Login/Login";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import ResetPasswordSuccess from "../pages/Auth/ResetPassword/ResetPasswordSuccess";
import SignUp from "../pages/Auth/SignUp/SignUp";
import Task from "../pages/Task/Task";
import AddEditTask from "../pages/Task/AddEditTask/AddEditTask";
import Category from "../pages/Category/Category";
import Profile from "../pages/Profile/Profile";
import Walkthrough from "../pages/Walkthrough/Walkthrough";
import NotFound from "../components/NotFound/NotFound";
import CheckList from "../pages/CheckList/CheckList";
import AddEditCheckList from "../pages/CheckList/AddEditCheckList/AddEditCheckList";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={`/${Path.LOGIN}`} replace />} />
        <Route path={`/${Path.LOGIN}`} element={<Login />} />
        <Route path={`/${Path.SIGNUP}`} element={<SignUp />} />
        <Route path={`/${Path.FORGOT_PASSWORD}`} element={<ForgotPassword />} />
        <Route path={`/${Path.RESET_PASSWORD}`} element={<ResetPassword />} />
        <Route path={`/${Path.RESET_PASSWORD_SUCCESS}`} element={<ResetPasswordSuccess />} />
        <Route path={`/${Path.WALKTHROUGH}`} element={<Walkthrough />} />
        <Route path={`/${Path.CATEGORY}`} element={<Category />} />
        <Route path={`/${Path.PROFILE}`} element={<Profile />} />
        <Route path={`/${Path.TASK}`} element={<Task />} />
        <Route path={`/${Path.TASK}/${Path.ADD_EDIT_TASK}`} element={<AddEditTask />} />
        <Route path={`/${Path.CHECK_LIST}`} element={<CheckList />} />
        <Route path={`/${Path.CHECK_LIST}/${Path.ADD_EDIT_CHECK_LIST}`} element={<AddEditCheckList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoute;
