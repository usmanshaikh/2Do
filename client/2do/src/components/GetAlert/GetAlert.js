import React from "react";
import Switch from "@mui/material/Switch";
import "./GetAlert.scss";

const GetAlert = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      <div className="getAlertComponentWrapper">
        <div className="flexContainer">
          <div>
            <span className="commonLabel">Get alert for this task</span>
          </div>
          <div>
            <Switch {...label} defaultChecked />
          </div>
        </div>
      </div>
    </>
  );
};

export default GetAlert;
