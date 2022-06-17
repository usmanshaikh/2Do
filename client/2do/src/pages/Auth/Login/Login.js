import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import * as Msg from "../../../utils/constants/message.constants";
import * as Path from "../../../utils/constants/routePath.constants";
import CustomButton from "../../../components/CustomButton/CustomButton";
import "../Auth.scss";

const validationSchema = yup.object({
  email: yup.string().email(Msg.EMAIL_INVALID).required(Msg.EMAIL_REQUIRED),
  password: yup.string().min(Msg.PASSWORD_LENGTH, Msg.PASSWORD_MIN).required(Msg.PASSWORD_REQUIRED),
});

const Login = () => {
  const navigate = useNavigate();

  const onLoginHandler = () => {
    navigate(`/${Path.TASK}`);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <div className="loginPageWrapper commonAuthWrapper">
      <h1 className="heading">Login</h1>
      <span className="subHeading">Hello Again! Welcome back</span>
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
          <div className="forgotLinkWrap">
            <Link className="aLink" to={`/${Path.AUTH}/${Path.FORGOT_PASSWORD}`}>
              Forgot Password
            </Link>
          </div>
          <div className="actionBtnWrap">
            <CustomButton name="Login" type="submit" onClick={onLoginHandler} />
          </div>
          <div className="accountOrLoginOptWrap">
            <span className="txt">
              Don't have an account?
              <b>
                <Link className="aLink" to={`/${Path.AUTH}/${Path.SIGNUP}`}>
                  Create
                </Link>
              </b>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
