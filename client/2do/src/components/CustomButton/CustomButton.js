import React from "react";
import styles from "./CustomButton.module.scss";

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

  let btnClass = styles.buttonContainer;
  if (isPadding) btnClass = `${styles.buttonContainer} ${styles.pd15} `;

  return (
    <div className={btnClass}>
      <button
        type={type}
        disabled={disabled}
        className={`${styles.commonButton} ${styles[color]} ${styles[size]}`}
        onClick={onButtonClick}>
        {name}
      </button>
    </div>
  );
};
export default CustomButton;
