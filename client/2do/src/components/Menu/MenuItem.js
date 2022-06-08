import React from "react";
import Icon from "@mui/material/Icon";

const MenuItem = (props) => {
  return (
    <>
      <div>
        <Icon>{props.icon}</Icon>
        <span>{props.name}</span>
      </div>
    </>
  );
};

export default MenuItem;
