import React, { useEffect, useState } from "react";
import { Icon } from "@mui/material";
import "./ChooseColor.scss";

const COLOR_PICKER = [
  { color: "#728cfb", id: 1 },
  { color: "#673ab7", id: 2 },
  { color: "#ff6900", id: 3 },
  { color: "#0693e3", id: 4 },
  { color: "#eb144c", id: 5 },
  { color: "#ffeb3b", id: 6 },
  { color: "#00d084", id: 7 },
  { color: "#555555", id: 8 },
  { color: "#fa28ff", id: 9 },
  { color: "#cddc39", id: 10 },
];

const ChooseColor = (props) => {
  const [color, setColor] = useState(COLOR_PICKER[0]);
  const [currentActiveColorId, setCurrentActiveColorId] = useState(1);

  const chooseColorHandler = (item) => {
    setCurrentActiveColorId(item.id);
    setColor(item);
  };

  useEffect(() => {
    props.onChooseColor(color);
  }, [color]);

  return (
    <>
      <div className="chooseColorComponentWrapper">
        <span className="commonLabel">Choose Color</span>
        <div className="flexContainer">
          {COLOR_PICKER.map((item) => {
            return (
              <div
                key={item.id}
                className="flexItem"
                style={{ backgroundColor: item.color }}
                onClick={() => chooseColorHandler(item)}>
                <span className="colorBox">
                  {currentActiveColorId === item.id && <Icon className="material-icons-round checkIcon">done</Icon>}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChooseColor;
