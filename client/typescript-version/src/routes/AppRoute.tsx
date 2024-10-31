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
import { ProtectedRoute, GuestRoute } from "../components";
import { ROUTES } from "../utils/constants";

const AppRoute = () => {
  return (
    <>
      <Routes>
        {/* Guest-only Routes */}
        <Route element={<GuestRoute />}>
          <Route path={`/${ROUTES.LOGIN}`} element={<Login />} />
          <Route path={`/${ROUTES.SIGNUP}`} element={<SignUp />} />
          <Route path={`/${ROUTES.FORGOT_PASSWORD}`} element={<ForgotPassword />} />
          <Route path={`/${ROUTES.RESET_PASSWORD}`} element={<ResetPassword />} />
          <Route path={`/${ROUTES.RESET_PASSWORD_SUCCESS}`} element={<ResetPasswordSuccess />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={`/${ROUTES.TASK}`} element={<Task />} />
          <Route path={`/${ROUTES.CHECKLIST}`} element={<Checklist />} />
          <Route path={`/${ROUTES.CATEGORY}`} element={<Category />} />
          <Route path={`/${ROUTES.PROFILE}`} element={<Profile />} />
          <Route path={`/${ROUTES.TASK}/${ROUTES.ADD_EDIT_TASK}`} element={<AddEditTask />} />
          <Route path={`/${ROUTES.CHECKLIST}/${ROUTES.ADD_EDIT_CHECKLIST}`} element={<AddEditChecklist />} />
        </Route>

        {/* Public Routes */}
        <Route path={`/${ROUTES.VERIFY_EMAIL}`} element={<VerifyEmail />} />

        {/* Redirect home to login or task based on login status */}
        <Route path="/" element={<Navigate to={`/${ROUTES.LOGIN}`} replace />} />

        {/* Redirect all other paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoute;
