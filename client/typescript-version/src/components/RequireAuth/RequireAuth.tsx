import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks";

interface RequireAuthProps {
  children: React.ReactNode; // Define children as a ReactNode
  moduleName?: string; // Optional prop for module name
}

/**
 * If the User is logged in then it will be allowed to proceed otherwise redirected to the Login page.
 * And If the user is logged in and tries to access routes that have moduleName === 'auth' then it will redirect to the Task page.
 */
const RequireAuth: React.FC<RequireAuthProps> = ({ children, moduleName }) => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Handle redirection for the "auth" module
  if (moduleName === "auth") {
    if (auth.isLoggedIn) {
      return <Navigate to={`/${ROUTES.TASK}`} replace state={{ path: location.pathname }} />;
    }
    return <>{children}</>; // If not authenticated, show children
  }

  // Default authentication check
  if (auth.isLoggedIn) {
    return <>{children}</>; // Render children if authenticated
  }

  // Redirect to login if not authenticated
  return <Navigate to={`/${ROUTES.LOGIN}`} replace state={{ path: location.pathname }} />;
};

export default RequireAuth;
