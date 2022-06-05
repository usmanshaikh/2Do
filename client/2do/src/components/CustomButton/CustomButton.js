import React from "react";
import styles from "./CustomButton.module.scss";

const CustomButton = ({ color = "red", name = "name", size = "large", disabled = false, onClick }) => {
  const onButtonClick = () => {
    if (onClick) {
      onClick(name);
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        disabled={disabled}
        className={`${styles.commonButton} ${styles[color]} ${styles[size]}`}
        onClick={onButtonClick}>
        {name}
      </button>
    </div>
  );
};
export default CustomButton;
