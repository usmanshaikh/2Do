import React from "react";
import styles from "./CustomButton.module.scss";

const CustomButton = ({ color = "red", name = "name", size = "large", disabled = false, onClick, type = "button" }) => {
  const onButtonClick = () => {
    if (onClick) {
      // Pass any parameter
      onClick(name);
    }
  };

  return (
    <div className={styles.buttonContainer}>
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
