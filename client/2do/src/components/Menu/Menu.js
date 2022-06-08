import React from "react";
import MenuItem from "./MenuItem";
import * as Path from "../../utils/constants/routePath.constants";

const MENU_ITEM = [
  {
    icon: "check_circle",
    name: "My Task",
    url: Path.MY_TASK,
    position: 1,
  },
  {
    icon: "widgets",
    name: "Category",
    url: Path.CATEGORY,
    position: 2,
  },
  {
    icon: "fact_check",
    name: "Quick",
    url: Path.QUICK,
    position: 3,
  },
  {
    icon: "person",
    name: "Profile",
    url: Path.PROFILE,
    position: 4,
  },
];
const Menu = () => {
  return (
    <>
      {MENU_ITEM.map((item) => (
        <MenuItem key={item.position} icon={item.icon} name={item.name} url={item.url} />
      ))}
    </>
  );
};

export default Menu;
