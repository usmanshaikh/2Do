import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import { SnackbarAlert } from "../";
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks";

const Layout = ({ children }) => {
  const location = useLocation();
  const auth = useAppSelector((state: RootState) => state.auth);
  const shouldShowFilters = ["/task", "/checklist"].includes(location.pathname);

  return (
    <Box>
      <SnackbarAlert />
      {auth.isLoggedIn && (
        <>
          <Header />
          {shouldShowFilters && <Filters />}
        </>
      )}
      <main className="mainContentWrapper">{children}</main>
      {auth.isLoggedIn && <Menu />}
    </Box>
  );
};

export default Layout;
