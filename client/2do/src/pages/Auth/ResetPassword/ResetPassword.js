import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import * as yup from "yup";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CustomButton from "../../../components/CustomButton/CustomButton";
import * as Msg from "../../../utils/constants/message.constants";
import * as Path from "../../../utils/constants/routePath.constants";
import styles from "./ResetPassword.module.scss";

const validationSchema = yup.object({
  resetCode: yup.number().typeError(Msg.RESET_CODE).min(6, Msg.RESET_CODE).required(Msg.RESET_CODE_REQUIRED),
  newPassword: yup.string().min(Msg.PASSWORD_LENGTH, Msg.PASSWORD_MIN).required(Msg.PASSWORD_REQUIRED),
  confirmPassword: yup.string().when("newPassword", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("newPassword")], Msg.PASSWORD_NOT_MATCH),
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
      <Link to={`/${Path.AUTH}/${Path.LOGIN}`}>
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
