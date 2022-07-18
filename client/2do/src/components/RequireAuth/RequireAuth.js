import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useGlobalContext from "../../utils/hooks/useGlobalContext";
import * as Path from "../../utils/constants/routePath.constants";

const RequireAuth = (props) => {
  const { children } = props;
  const { authenticate } = useGlobalContext();
  const location = useLocation();

  return authenticate === true ? (
    children
  ) : (
    <Navigate to={`/${Path.LOGIN}`} replace state={{ path: location.pathname }} />
  );
};

export default RequireAuth;
