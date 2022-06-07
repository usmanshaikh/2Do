import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import * as yup from "yup";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CustomButton from "../../../components/CustomButton/CustomButton";
import * as Constants from "../../../utils/constants/message.constants";
import styles from "./ResetPassword.module.scss";

const validationSchema = yup.object({
  resetCode: yup
    .number()
    .typeError(Constants.RESET_CODE)
    .min(6, Constants.RESET_CODE)
    .required(Constants.RESET_CODE_REQUIRED),
  newPassword: yup
    .string()
    .min(Constants.PASSWORD_LENGTH, Constants.PASSWORD_MIN)
    .required(Constants.PASSWORD_REQUIRED),
  confirmPassword: yup.string().when("newPassword", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("newPassword")], Constants.PASSWORD_NOT_MATCH),
  }),
});

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      resetCode: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <div className={styles.resetPageWrapper}>
      <Link to="/login">
        <KeyboardBackspaceIcon />
      </Link>
      <h1>Reset Password</h1>
      <span>Reset code was sent to your email. Please enter the code and create new password.</span>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          variant="standard"
          id="resetCode"
          name="resetCode"
          label="Reset Code"
          autoComplete="off"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          error={formik.touched.resetCode && Boolean(formik.errors.resetCode)}
          helperText={formik.touched.resetCode && formik.errors.resetCode}
        />
        <TextField
          fullWidth
          variant="standard"
          id="newPassword"
          name="newPassword"
          label="New Password"
          type="password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
        <TextField
          fullWidth
          variant="standard"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <CustomButton name="Change Password" type="submit" />
      </form>
    </div>
  );
};

export default ResetPassword;
