import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Icon } from "@mui/material";
import { AddTaskModalContext } from "../../utils/contexts/AddTaskModalContext";

const MenuItem = (props) => {
  const addTaskModalContext = useContext(AddTaskModalContext);
  const [currentActiveLink, setCurrentActiveLink] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.split("/").join("");
    setCurrentActiveLink(path);
  }, [location]);

  const onPageChangeHandler = (url, name) => {
    if (url) {
      navigate(`/${url}`);
    } else if (name === "Add") {
      addTaskModalContext.openAddTaskModal();
    }
  };

  const menuItem = `menuItem ${props.name.toLowerCase()} ${currentActiveLink === props.url ? "active" : ""}`;

  return (
    <>
      <Button onClick={() => onPageChangeHandler(props.url, props.name)} className={menuItem}>
        <Icon className="menuIcon">{props.icon}</Icon>
        <span className="menuName">{props.name}</span>
      </Button>
    </>
  );
};

export default MenuItem;
