import React from "react";
import MenuItem from "./MenuItem";

const MENU_ITEM = [
  {
    icon: "check_circle",
    name: "My Task",
    url: "profile",
    position: 1,
  },
  {
    icon: "widgets",
    name: "Menu",
    url: "profile",
    position: 2,
  },
  {
    icon: "fact_check",
    name: "Quick",
    url: "profile",
    position: 3,
  },
  {
    icon: "person",
    name: "Profile",
    url: "profile",
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
