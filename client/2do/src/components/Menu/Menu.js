import React from "react";
import MenuItem from "./MenuItem";
import * as Path from "../../utils/constants/routePath.constants";
import "./Menu.scss";

const MENU_ITEM = [
  {
    icon: "check_circle",
    name: "My Task",
    url: Path.MY_TASK,
    position: 1,
  },
  {
    icon: "checklist",
    name: "Check List",
    url: Path.CHECK_LIST,
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
    url: Path.CATEGORY,
    position: 4,
  },
  {
    icon: "person",
    name: "Profile",
    url: Path.PROFILE,
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
