import React from "react";
import MenuItem from "./MenuItem";
import constants from "../../utils/constants";
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
  {
    icon: "add",
    name: "Add",
    url: "",
    position: 6,
  },
];
const Menu = () => {
  return (
    <>
      <div className="menuComponentWrapper">
        <div className="flexContainer">
          {MENU_ITEM.map((item) => (
            <MenuItem key={item.position} icon={item.icon} name={item.name} url={item.url} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
