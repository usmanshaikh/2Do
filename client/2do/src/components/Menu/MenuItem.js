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
    const menuClass = `menuItem ${props.name.toLowerCase()} ${location.pathname.includes(props.url) ? "active" : ""}`;
    setCurrentActiveLink(menuClass);
  }, [location]);

  const onPageChangeHandler = (url, name) => {
    if (url) {
      navigate(`/${url}`);
    } else if (name === "Add") {
      addTaskModalContext.openAddTaskModal();
    }
  };

  return (
    <>
      <Button onClick={() => onPageChangeHandler(props.url, props.name)} className={currentActiveLink}>
        <Icon className="menuIcon">{props.icon}</Icon>
        <span className="menuName">{props.name}</span>
      </Button>
    </>
  );
};

export default MenuItem;
