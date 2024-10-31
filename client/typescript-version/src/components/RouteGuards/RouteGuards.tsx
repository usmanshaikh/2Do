import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store";
import { ROUTES } from "../../utils/constants";

// Only accessible by logged-in users
export const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={`/${ROUTES.LOGIN}`} replace />;
};

// Only accessible by guests
export const GuestRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return !isLoggedIn ? <Outlet /> : <Navigate to={`/${ROUTES.TASK}`} replace />;
};
