import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../utils/hooks";
import constants from "../../utils/constants";

const ROUTE = constants.routePath;

/**
 * If the User is logged in then it will be allowed to proceed otherwise redirected to the Login page.
 * And If the user is logged in and tries to access routes that have moduleName === 'auth' then it will redirect to the Task page.
 */
const RequireAuth = (props) => {
  const { children } = props;
  const { authenticate } = useGlobalContext();
  const location = useLocation();

  if (children.props.moduleName === "auth") {
    return authenticate === true ? (
      <Navigate to={`/${ROUTE.TASK}`} replace state={{ path: location.pathname }} />
    ) : (
      children
    );
  }

  return authenticate === true ? (
    children
  ) : (
    <Navigate to={`/${ROUTE.LOGIN}`} replace state={{ path: location.pathname }} />
  );
};

export default RequireAuth;
