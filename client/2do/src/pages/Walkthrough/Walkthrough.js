import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import Slider from "../../components/Walkthrough/Slider/Slider";
import * as Path from "../../utils/constants/routePath.constants";
import styles from "./Walkthrough.module.scss";

const Walkthrough = () => {
  const navigate = useNavigate();

  const onGoToLoginPageHandler = () => {
    navigate(`/${Path.AUTH}/${Path.LOGIN}`);
  };

  return (
    <>
      <div className={styles.walkthroughPageWrapper}>
        <Slider />
        <div className={styles.actionGrpButton}>
          <div className="w100">
            <CustomButton color="white" name="Get Started" onClick={onGoToLoginPageHandler} isPadding={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Walkthrough;
