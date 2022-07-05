import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Icon } from "@mui/material";
import { useModal } from "mui-modal-provider";
import AddTaskModal from "../Modals/AddTaskModal/AddTaskModal";

const MenuItem = (props) => {
  const [currentActiveLink, setCurrentActiveLink] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const { showModal } = useModal();

  useEffect(() => {
    const menuClass = `menuItem ${props.name.toLowerCase()} ${location.pathname.includes(props.url) ? "active" : ""}`;
    setCurrentActiveLink(menuClass);
  }, [location]);

  const onPageChangeHandler = (url, name) => {
    if (url) {
      navigate(`/${url}`);
    } else if (name === "Add") {
      showModal(AddTaskModal, undefined, { destroyOnClose: true });
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
