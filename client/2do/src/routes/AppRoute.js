import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import * as Path from "../utils/constants/routePath.constants";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import Login from "../pages/Auth/Login/Login";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import ResetPasswordSuccess from "../pages/Auth/ResetPassword/ResetPasswordSuccess";
import SignUp from "../pages/Auth/SignUp/SignUp";
import Task from "../pages/Task/Task";
import Category from "../pages/Category/Category";
import Profile from "../pages/Profile/Profile";
import Walkthrough from "../pages/Walkthrough/Walkthrough";
import NotFound from "../components/NotFound/NotFound";
import AddCheckList from "../pages/CheckList/AddCheckList/AddCheckList";
import AddTask from "../pages/Task/AddTask/AddTask";
import CheckList from "../pages/CheckList/CheckList";
import EditCheckList from "../pages/CheckList/EditCheckList/EditCheckList";
import EditTask from "../pages/Task/EditTask/EditTask";

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
        <Route path={`/${Path.TASK}/${Path.ADD_TASK}`} element={<AddTask />} />
        <Route path={`/${Path.TASK}/${Path.EDIT_TASK}`} element={<EditTask />} />
        <Route path={`/${Path.CHECK_LIST}`} element={<CheckList />} />
        <Route path={`/${Path.CHECK_LIST}/${Path.ADD_CHECK_LIST}`} element={<AddCheckList />} />
        <Route path={`/${Path.CHECK_LIST}/${Path.EDIT_CHECK_LIST}`} element={<EditCheckList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoute;
