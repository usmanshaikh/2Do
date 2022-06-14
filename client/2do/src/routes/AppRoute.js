import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import * as Path from "../utils/constants/routePath.constants";
import Auth from "../pages/Auth/Auth";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import Login from "../pages/Auth/Login/Login";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import ResetPasswordSuccess from "../pages/Auth/ResetPassword/ResetPasswordSuccess";
import SignUp from "../pages/Auth/SignUp/SignUp";
import MyTask from "../pages/MyTask/MyTask";
import Category from "../pages/Category/Category";
import Quick from "../pages/Quick/Quick";
import Profile from "../pages/Profile/Profile";
import Walkthrough from "../pages/Walkthrough/Walkthrough";
import NotFound from "../components/NotFound/NotFound";
import AddCheckList from "../pages/AddCheckList/AddCheckList";
import AddQuickNote from "../pages/AddQuickNote/AddQuickNote";
import AddTask from "../pages/AddTask/AddTask";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={`/${Path.AUTH}`} replace />} />
        <Route path={`/${Path.AUTH}`} element={<Auth />}>
          <Route path={`${Path.LOGIN}`} element={<Login />} />
          <Route path={`${Path.SIGNUP}`} element={<SignUp />} />
          <Route path={`${Path.FORGOT_PASSWORD}`} element={<ForgotPassword />} />
          <Route path={`${Path.RESET_PASSWORD}`} element={<ResetPassword />} />
          <Route path={`${Path.RESET_PASSWORD_SUCCESS}`} element={<ResetPasswordSuccess />} />
        </Route>
        <Route path={`/${Path.WALKTHROUGH}`} element={<Walkthrough />} />
        <Route path={`/${Path.MY_TASK}`} element={<MyTask />} />
        <Route path={`/${Path.CATEGORY}`} element={<Category />} />
        <Route path={`/${Path.QUICK}`} element={<Quick />} />
        <Route path={`/${Path.ADD_TASK}`} element={<AddTask />} />
        <Route path={`/${Path.ADD_QUICK_NOTE}`} element={<AddQuickNote />} />
        <Route path={`/${Path.ADD_CHECK_LIST}`} element={<AddCheckList />} />
        <Route path={`/${Path.PROFILE}`} element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoute;
