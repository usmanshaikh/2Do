import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import Slider from "../../components/Walkthrough/Slider/Slider";
import styles from "./Walkthrough.module.scss";

const Walkthrough = () => {
  return (
    <>
      <div className={styles.walkthroughPageWrapper}>
        <Slider />
        <div className={styles.actionGrpButton}>
          <div className="w100">
            <CustomButton color="white" name="Get Started" />
            <CustomButton color="transparent" name="Log In" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Walkthrough;
