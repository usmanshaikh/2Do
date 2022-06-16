import React from "react";
import Switch from "@mui/material/Switch";
import "./GetAlert.scss";

const GetAlert = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      <div className="getAlertComponentWrapper">
        <span>Get alert for this task</span>
        <Switch {...label} defaultChecked />
      </div>
    </>
  );
};

export default GetAlert;
