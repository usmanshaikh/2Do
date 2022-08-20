import React, { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GlobalSnackbarAlertContext } from "../../../utils/contexts";
import { AuthAPI } from "../../../api";
import images from "../../../assets/img/images";
import "./VerifyEmail.scss";

const VerifyEmail = () => {
  const [isVerifyEmailSuccess, setIsVerifyEmailSuccess] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);
  const tokenRef = useRef();

  useEffect(() => {
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

  return (
    <>
      {isVerifyEmailSuccess && (
        <div className="verifyEmailPageWrapper">
          <div>
            <img src={images.ResetPasswordSuccess} alt="delete" className="fluidImg successImg" />
            <h1 className="heading">Congratulations!</h1>
            <span className="info">Your account has been verified.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
