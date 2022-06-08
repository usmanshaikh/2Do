import React from "react";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";

const MenuItem = (props) => {
  const navigate = useNavigate();

  const onPageChangeHandler = (url) => {
    navigate(`/${url}`);
  };

  return (
    <>
      <div onClick={() => onPageChangeHandler(props.url)}>
        <Icon>{props.icon}</Icon>
        <span>{props.name}</span>
      </div>
    </>
  );
};

export default MenuItem;
