import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import * as Path from "../../utils/constants/routePath.constants";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path === `/${Path.AUTH}/` || path === `/${Path.AUTH}`) navigate(Path.LOGIN);
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
};
export default Auth;
