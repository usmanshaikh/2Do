import React, { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import { useLocation, useNavigate } from "react-router-dom";

const MenuItem = (props) => {
  const [currentActiveLink, setCurrentActiveLink] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.split("/").join("");
    setCurrentActiveLink(path);
  }, [location]);

  const onPageChangeHandler = (url) => {
    navigate(`/${url}`);
  };

  const menuItem = `menuItem ${props.name.toLowerCase()} ${currentActiveLink === props.url ? "active" : ""}`;

  return (
    <>
      <div onClick={() => onPageChangeHandler(props.url)} className={menuItem}>
        <Icon className="menuIcon">{props.icon}</Icon>
        <span className="menuName">{props.name}</span>
      </div>
    </>
  );
};

export default MenuItem;
