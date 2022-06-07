import React from "react";
import { Link } from "react-router-dom";
import styles from "./ResetPassword.module.scss";

const ResetPasswordSuccess = () => {
  return (
    <>
      <div className={styles.resetPageWrapper}>
        <h1>Password Reset</h1>
        <span>Your password has been reset successfully</span>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default ResetPasswordSuccess;
