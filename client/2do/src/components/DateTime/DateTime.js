import React from "react";
import { Icon } from "@mui/material";
import "./DateTime.scss";

const DateTime = () => {
  return (
    <>
      <div className="dateTimeComponentWrapper">
        <Icon className="alarmIcon material-icons-round">alarm</Icon>
        <p className="dateTimeTxtWrap">
          <span className="dateTime">8:36 am</span>
          <span className="dateTime">&nbsp;-&nbsp;</span>
          <span className="dateTime">16 Jun 22</span>
        </p>
      </div>
    </>
  );
};

export default DateTime;