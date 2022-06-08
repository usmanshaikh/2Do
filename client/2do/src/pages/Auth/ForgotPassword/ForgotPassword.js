import React from "react";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import * as yup from "yup";
import CustomButton from "../../../components/CustomButton/CustomButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import * as Msg from "../../../utils/constants/message.constants";
import * as Path from "../../../utils/constants/routePath.constants";
import styles from "./ForgotPassword.module.scss";

const validationSchema = yup.object({
  email: yup.string().email(Msg.EMAIL_INVALID).required(Msg.EMAIL_REQUIRED),
});

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <div className={styles.forgotPageWrapper}>
      <Link to={`/${Path.AUTH}/${Path.LOGIN}`}>
        <KeyboardBackspaceIcon />
      </Link>
      <h1>Forgot Password</h1>
      <span>Please enter your email below to received your password reset instructions</span>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          variant="standard"
          id="email"
          name="email"
          label="Email"
          autoComplete="off"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <CustomButton name="Send Request" type="submit" />
      </form>
      <Link to={`/${Path.AUTH}/${Path.RESET_PASSWORD}`}>Reset Password</Link>
    </div>
  );
};

export default ForgotPassword;
