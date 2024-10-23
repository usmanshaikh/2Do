import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../utils/hooks";
import { getLocalAccessToken } from "../../utils/helpers";
import Menu from "../../components/Menu/Menu";
import Header from "../../components/Header/Header";
import Filters from "../Filters/Filters";

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { setAuthenticateHandler } = useGlobalContext();

  const shouldShowFilters = ["/task", "/checklist"].includes(location.pathname);

  useEffect(() => {
    const isAccessToken = getLocalAccessToken();
    if (isAccessToken) {
      setMenuVisible(true);
      setAuthenticateHandler(true);
    } else {
      setMenuVisible(false);
      setAuthenticateHandler(false);
    }
  }, [location.pathname]);

  return (
    <Box>
      {isMenuVisible && <Header />}
      {shouldShowFilters && <Filters />}
      <main className="mainContentWrapper">{children}</main>
      {isMenuVisible && <Menu />}
    </Box>
  );
};

export default Layout;
