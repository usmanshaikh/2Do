import { Navigate, Route, Routes } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  ResetPassword,
  ResetPasswordSuccess,
  SignUp,
  Task,
  AddEditTask,
  Category,
  Profile,
  Checklist,
  AddEditChecklist,
  VerifyEmail,
} from "../pages";
import { NotFound, RequireAuth } from "../components";
import { ROUTES } from "../utils/constants";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={`/${ROUTES.LOGIN}`} replace />} />
        <Route
          path={`/${ROUTES.LOGIN}`}
          element={
            <RequireAuth moduleName={"auth"}>
              <Login />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ROUTES.SIGNUP}`}
          element={
            <RequireAuth moduleName={"auth"}>
              <SignUp />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ROUTES.FORGOT_PASSWORD}`}
          element={
            <RequireAuth moduleName={"auth"}>
              <ForgotPassword />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ROUTES.RESET_PASSWORD}`}
          element={
            <RequireAuth moduleName={"auth"}>
              <ResetPassword />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ROUTES.RESET_PASSWORD_SUCCESS}`}
          element={
            <RequireAuth moduleName={"auth"}>
              <ResetPasswordSuccess />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ROUTES.CATEGORY}`}
          element={
            <RequireAuth>
              <Category />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ROUTES.PROFILE}`}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path={`/${ROUTES.VERIFY_EMAIL}`} element={<VerifyEmail />} />
        <Route
          path={`/${ROUTES.TASK}`}
          element={
            <RequireAuth>
              <Task />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ROUTES.TASK}/${ROUTES.ADD_EDIT_TASK}`}
          element={
            <RequireAuth>
              <AddEditTask />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ROUTES.CHECKLIST}`}
          element={
            <RequireAuth>
              <Checklist />
            </RequireAuth>
          }
        />
        <Route
          path={`/${ROUTES.CHECKLIST}/${ROUTES.ADD_EDIT_CHECKLIST}`}
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
