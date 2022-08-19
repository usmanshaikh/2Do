import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import Checklist from "../pages/Checklist/Checklist";
import AddEditChecklist from "../pages/Checklist/AddEditChecklist/AddEditChecklist";
import RequireAuth from "../components/RequireAuth/RequireAuth";
import constants from "../utils/constants";

const Path = constants.routePath;

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={`/${Path.LOGIN}`} replace />} />
        <Route
          path={`/${Path.LOGIN}`}
          element={
            <RequireAuth>
              <Login moduleName={"auth"} />
            </RequireAuth>
          }
        />
        <Route
          path={`/${Path.SIGNUP}`}
          element={
            <RequireAuth>
              <SignUp moduleName={"auth"} />
            </RequireAuth>
          }
        />
        <Route
          path={`/${Path.FORGOT_PASSWORD}`}
          element={
            <RequireAuth>
              <ForgotPassword moduleName={"auth"} />
            </RequireAuth>
          }
        />
        <Route
          path={`/${Path.RESET_PASSWORD}`}
          element={
            <RequireAuth>
              <ResetPassword moduleName={"auth"} />
            </RequireAuth>
          }
        />
        <Route
          path={`/${Path.RESET_PASSWORD_SUCCESS}`}
          element={
            <RequireAuth>
              <ResetPasswordSuccess moduleName={"auth"} />
            </RequireAuth>
          }
        />
        <Route
          path={`/${Path.WALKTHROUGH}`}
          element={
            <RequireAuth>
              <Walkthrough moduleName={"auth"} />
            </RequireAuth>
          }
        />
        <Route
          path={`/${Path.CATEGORY}`}
          element={
            <RequireAuth>
              <Category />
            </RequireAuth>
          }
        />
        <Route
          path={`/${Path.PROFILE}`}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path={`/${Path.TASK}`}
          element={
            <RequireAuth>
              <Task />
            </RequireAuth>
          }
        />
        <Route
          path={`/${Path.TASK}/${Path.ADD_EDIT_TASK}`}
          element={
            <RequireAuth>
              <AddEditTask />
            </RequireAuth>
          }
        />
        <Route
          path={`/${Path.CHECKLIST}`}
          element={
            <RequireAuth>
              <Checklist />
            </RequireAuth>
          }
        />
        <Route
          path={`/${Path.CHECKLIST}/${Path.ADD_EDIT_CHECKLIST}`}
          element={
            <RequireAuth>
              <AddEditChecklist />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoute;
