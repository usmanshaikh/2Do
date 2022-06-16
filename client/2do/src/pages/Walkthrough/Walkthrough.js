import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import Slider from "../../components/Slider/Slider";
import * as Path from "../../utils/constants/routePath.constants";
import "./Walkthrough.scss";

const Walkthrough = () => {
  const navigate = useNavigate();

  const onGoToLoginPageHandler = () => {
    navigate(`/${Path.AUTH}/${Path.LOGIN}`);
  };

  return (
    <>
      <div className="walkthroughPageWrapper">
        <Slider />
        <div className="actionGrpButton">
          <div className="w100">
            <CustomButton color="white" name="Get Started" onClick={onGoToLoginPageHandler} isPadding={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Walkthrough;
