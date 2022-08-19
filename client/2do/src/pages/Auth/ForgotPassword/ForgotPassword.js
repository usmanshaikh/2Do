import React from "react";
import { useFormik } from "formik";
import { Icon, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import * as yup from "yup";
import CustomButton from "../../../components/CustomButton/CustomButton";
import constants from "../../../utils/constants";
import "../Auth.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const validationSchema = yup.object({
  email: yup.string().email(MSG.EMAIL_INVALID).required(MSG.EMAIL_REQUIRED),
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
    <div className="forgotPageWrapper commonAuthWrapper">
      <div className="backBtnWrap">
        <Link to={`/${ROUTE.LOGIN}`}>
          <Icon>keyboard_backspace</Icon>
        </Link>
      </div>
      <h1 className="heading">Forgot Password</h1>
      <span className="subHeading">Please enter your email below to received your password reset instructions</span>
      <div className="formWrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="commonInputWrap">
            <TextField
              fullWidth
              variant="standard"
              id="email"
              name="email"
              label="Email"
              autoComplete="off"
              className="commonInputFormControl"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className="actionBtnWrap">
            <CustomButton name="Send Request" type="submit" />
          </div>
        </form>
      </div>
      <Link to={`/${ROUTE.RESET_PASSWORD}`}>Reset Password</Link>
    </div>
  );
};

export default ForgotPassword;
