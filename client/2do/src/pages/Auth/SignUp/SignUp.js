import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Icon, TextField } from "@mui/material";
import * as yup from "yup";
import CustomButton from "../../../components/CustomButton/CustomButton";
import constants from "../../../utils/constants";
import "../Auth.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const validationSchema = yup.object({
  name: yup
    .string()
    .required(MSG.NAME_REQUIRED)
    .matches(/^[aA-zZ\s]+$/, MSG.NAME_ONLY_ALPHABETS),
  email: yup.string().email(MSG.EMAIL_INVALID).required(MSG.EMAIL_REQUIRED),
  password: yup.string().min(MSG.PASSWORD_LENGTH, MSG.PASSWORD_MIN).required(MSG.PASSWORD_REQUIRED),
  confirmPassword: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("password")], MSG.PASSWORD_NOT_MATCH),
  }),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <div className="signUpPageWrapper commonAuthWrapper">
      <div className="backBtnWrap">
        <Link to={`/${ROUTE.LOGIN}`}>
          <Icon>keyboard_backspace</Icon>
        </Link>
      </div>
      <h1 className="heading">Create Account</h1>
      <span className="subHeading">Hello! Sign up to get started</span>
      <div className="formWrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="commonInputWrap">
            <TextField
              fullWidth
              variant="standard"
              id="name"
              name="name"
              label="Name"
              autoComplete="off"
              className="commonInputFormControl"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
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
          <div className="commonInputWrap">
            <TextField
              fullWidth
              variant="standard"
              id="password"
              name="password"
              label="Password"
              type="password"
              className="commonInputFormControl"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
            <CustomButton name="Sign up" type="submit" />
          </div>
        </form>
      </div>
      <div className="accountOrLoginOptWrap">
        <span className="txt">
          Already have a account?
          <b>
            <Link className="aLink" to={`/${ROUTE.LOGIN}`}>
              Login
            </Link>
          </b>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
