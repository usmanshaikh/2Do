import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GlobalSnackbarAlertContext } from "../../../utils/contexts";
import { AuthAPI } from "../../../api";
import CustomButton from "../../../components/CustomButton/CustomButton";
import constants from "../../../utils/constants";
import images from "../../../assets/img/images";
import * as Helpers from "../../../utils/Helpers";
import "./VerifyEmail.scss";

const ROUTE = constants.routePath;

const VerifyEmail = () => {
  const [isVerifyEmailSuccess, setIsVerifyEmailSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const tokenRef = useRef();
  let [searchParams, setSearchParams] = useSearchParams();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  useEffect(() => {
    const isAccessToken = Helpers.getLocalAccessToken();
    if (isAccessToken) setIsLoggedIn(true);

    removeTokenFromURL();
    verifyEmail();
  }, []);

  const removeTokenFromURL = () => {
    tokenRef.current = searchParams.get("token");
    if (tokenRef.current) {
      searchParams.delete("token");
      setSearchParams(searchParams);
    }
  };

  const verifyEmail = () => {
    const token = tokenRef.current;
    AuthAPI.verifyEmail(token)
      .then(() => {
        setIsVerifyEmailSuccess(true);
      })
      .catch((err) => {
        snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
      });
  };

  const onLoginHandler = () => {
    navigate(`/${ROUTE.LOGIN}`);
  };

  return (
    <>
      {isVerifyEmailSuccess && (
        <div className="verifyEmailPageWrapper">
          <div>
            <img src={images.ResetPasswordSuccess} alt="delete" className="fluidImg successImg" />
            <h1 className="heading">Congratulations!</h1>
            <span className="info">Your account has been verified.</span>
            {!isLoggedIn && <CustomButton name="Login" onClick={onLoginHandler} />}
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
