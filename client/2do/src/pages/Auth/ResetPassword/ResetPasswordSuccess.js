import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton/CustomButton.js";
import * as Path from "../../../utils/constants/routePath.constants";
import Images from "../../../assets/img/images.js";
import "./ResetPasswordSuccess.scss";

const ResetPasswordSuccess = () => {
  const navigate = useNavigate();

  const onLoginHandler = () => {
    navigate(`/${Path.LOGIN}`);
  };

  return (
    <>
      <div className="resetPasswordSuccessPageWrapper">
        <div>
          <img src={Images.ResetPasswordSuccess} alt="delete" className="fluidImg successImg" />
          <h1 className="heading">Success!</h1>
          <span className="info">
            You have succesfully change password. Please use your new passwords when logging in.
          </span>
          <CustomButton name="Login" onClick={onLoginHandler} />
        </div>
      </div>
    </>
  );
};

export default ResetPasswordSuccess;
