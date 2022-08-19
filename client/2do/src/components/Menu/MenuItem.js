import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Icon } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { AddTaskModal } from "../Modals";
import constants from "../../utils/constants";
import { useGlobalContext, useNavigateWithParams } from "../../utils/hooks";

const ROUTE = constants.routePath;

const MenuItem = (props) => {
  const [currentActiveLink, setCurrentActiveLink] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { CFBY_state } = useGlobalContext();
  const { navigateWithParams } = useNavigateWithParams();

  useEffect(() => {
    const menuClass = `menuItem ${props.name.toLowerCase()} ${location.pathname.includes(props.url) ? "active" : ""}`;
    setCurrentActiveLink(menuClass);
  }, [location]);

  const onNavigateHandler = (url, name) => {
    if (url === ROUTE.TASK || url === ROUTE.CHECKLIST) {
      navigateWithParams(`/${url}`, CFBY_state.categoryBy, CFBY_state.filterBy);
    } else if (url) {
      navigate(`/${url}`);
    }
    if (name === "Add") {
      showModal(AddTaskModal, undefined, { destroyOnClose: true });
    }
  };

  return (
    <>
      <Button onClick={() => onNavigateHandler(props.url, props.name)} className={currentActiveLink}>
        <Icon className="menuIcon">{props.icon}</Icon>
        <span className="menuName">{props.name}</span>
      </Button>
    </>
  );
};

export default MenuItem;
