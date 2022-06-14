import React, { Fragment } from "react";
import { Icon } from "@mui/material";
import "./ChooseColor.scss";

const ChooseColor = () => {
  return (
    <>
      <div className="chooseColorComponentWrapper">
        <span className="label">Choose Color</span>
        <div className="flexContainer">
          {Array.from(Array(10)).map((_, i) => {
            return (
              <Fragment key={i}>
                <div className="flexItem">
                  <span className="colorBox">
                    {i === 0 && <Icon className="material-icons-round checkIcon">done</Icon>}
                  </span>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChooseColor;
