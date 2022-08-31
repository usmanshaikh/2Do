import React from "react";
import { Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { AddTaskModal } from "../Modals";
import MenuItem from "./MenuItem";
import constants from "../../utils/constants";
import Images from "../../assets/img/Images";
import "./Menu.scss";

const ROUTE = constants.routePath;

const MENU_ITEM = [
  {
    icon: "check_circle",
    name: "My Task",
    url: ROUTE.TASK,
    position: 1,
  },
  {
    icon: "checklist",
    name: "Checklist",
    url: ROUTE.CHECKLIST,
    position: 2,
  },
  {
    icon: "",
    name: "Blank",
    url: "",
    position: 3,
  },
  {
    icon: "widgets",
    name: "Category",
    url: ROUTE.CATEGORY,
    position: 4,
  },
  {
    icon: "person",
    name: "Profile",
    url: ROUTE.PROFILE,
    position: 5,
  },
];
const Menu = () => {
  const { showModal } = useModal();

  const openAddTaskModalHandler = () => {
    showModal(AddTaskModal, undefined, { destroyOnClose: true });
  };

  return (
    <>
      <div className="menuComponentWrapper">
        <div className="flexContainer">
          {MENU_ITEM.map((item) => (
            <MenuItem key={item.position} icon={item.icon} name={item.name} url={item.url} />
          ))}
          <Button className="addTaskButtonWrap" onClick={openAddTaskModalHandler}>
            {/* <img src={Images.LogoNameSVG} alt="2Do" className="logo" /> */}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Menu;
