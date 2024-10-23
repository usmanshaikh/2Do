import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { setPageTitle } from "../../utils/helpers";
import "./Header.scss";

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const title = setPageTitle(location);
    setTitle(title);
  }, [location]);

  return (
    <>
      <Box className="headerComponentWrapper">
        <Box className="titleBox">
          <Box>
            <span className="title">{title}</span>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
