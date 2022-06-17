import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Icon, TextField } from "@mui/material";
import * as yup from "yup";
import CustomButton from "../../../components/CustomButton/CustomButton";
import * as Msg from "../../../utils/constants/message.constants";
import * as Path from "../../../utils/constants/routePath.constants";
import "../Auth.scss";

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
    <div className="resetPageWrapper commonAuthWrapper">
      <div className="backBtnWrap">
        <Link to={`/${Path.AUTH}/${Path.LOGIN}`}>
          <Icon>keyboard_backspace</Icon>
        </Link>
      </div>
      <h1 className="heading">Reset Password</h1>
      <span className="subHeading">
        Reset code was sent to your email. Please enter the code and create new password.
      </span>
      <div className="formWrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="commonInputWrap">
            <TextField
              fullWidth
              variant="standard"
              id="resetCode"
              name="resetCode"
              label="Reset Code"
              autoComplete="off"
              className="commonInputFormControl"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              error={formik.touched.resetCode && Boolean(formik.errors.resetCode)}
              helperText={formik.touched.resetCode && formik.errors.resetCode}
            />
          </div>
          <div className="commonInputWrap">
            <TextField
              fullWidth
              variant="standard"
              id="newPassword"
              name="newPassword"
              label="New Password"
              type="password"
              className="commonInputFormControl"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
            />
          </div>
          <div className="commonInputWrap">
            <TextField
              fullWidth
              variant="standard"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              className="commonInputFormControl"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </div>
          <div className="actionBtnWrap">
            <CustomButton name="Change Password" type="submit" />
          </div>
        </form>
        <Link to={`/${Path.AUTH}/${Path.RESET_PASSWORD_SUCCESS}`}>Success</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
