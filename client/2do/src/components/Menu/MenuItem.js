import React, { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Icon } from "@mui/material";
import { useModal } from "mui-modal-provider";
import AddTaskModal from "../Modals/AddTaskModal/AddTaskModal";
import * as Path from "../../utils/constants/routePath.constants";
import useGlobalContext from "../../utils/hooks/useGlobalContext";

const MenuItem = (props) => {
  const [currentActiveLink, setCurrentActiveLink] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { CFBY_state } = useGlobalContext();

  useEffect(() => {
    const menuClass = `menuItem ${props.name.toLowerCase()} ${location.pathname.includes(props.url) ? "active" : ""}`;
    setCurrentActiveLink(menuClass);
  }, [location]);

  const onNavigateHandler = (url, name) => {
    if (url === Path.TASK || url === Path.CHECK_LIST) {
      navigate({
        pathname: `/${url}`,
        search: createSearchParams({
          categoryBy: CFBY_state.categoryBy.toLowerCase(),
          filterBy: CFBY_state.filterBy.toLowerCase(),
        }).toString(),
      });
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
