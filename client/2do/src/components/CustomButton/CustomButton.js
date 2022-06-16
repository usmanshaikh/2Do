import React from "react";
import { Button } from "@mui/material";
import "./CustomButton.scss";

const CustomButton = ({
  color = "red",
  name = "name",
  size = "large",
  disabled = false,
  onClick,
  type = "button",
  isPadding = false,
}) => {
  const onButtonClick = () => {
    if (onClick) {
      // Pass any parameter
      onClick(name);
    }
  };

  return (
    <div className={`customButtonComponentWrapper ${isPadding ? "pd15" : null}`}>
      <Button
        variant="contained"
        type={type}
        disabled={disabled}
        className={`commonButton ${color} ${size}`}
        onClick={onButtonClick}>
        {name}
      </Button>
    </div>
  );
};
export default CustomButton;
