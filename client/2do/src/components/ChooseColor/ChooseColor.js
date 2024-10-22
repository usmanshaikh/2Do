import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import "./ChooseColor.scss";

const ChooseColor = (props) => {
  const { cardColor, isEdit, onChooseColor } = props;
  const [color, setColor] = useState("#f96060");

  useEffect(() => {
    if (isEdit && cardColor) setColor(cardColor);
  }, [cardColor]);

  useEffect(() => {
    onChooseColor({ cardColor: color });
  }, [color, onChooseColor]);

  return (
    <>
      <div className="chooseColorComponentWrapper">
        <span className="commonLabel">Choose Color</span>
        <div className="colorPickerBox">
          <HexColorPicker color={color} onChange={(color) => setColor(color)} />
        </div>
      </div>
    </>
  );
};

export default ChooseColor;
