import React, { useContext } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { AuthAPI } from "../../../api";
import { useGlobalContext } from "../../../utils/hooks";
import { GlobalSnackbarAlertContext } from "../../../utils/contexts";
import { setLocalAccessToken, setLocalRefreshToken } from "../../../utils/helpers";
import constants from "../../../utils/constants";
import CustomButton from "../../../components/CustomButton/CustomButton";
import "../Auth.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const validationSchema = yup.object({
  email: yup.string().email(MSG.EMAIL_INVALID).required(MSG.EMAIL_REQUIRED),
  password: yup.string().min(MSG.PASSWORD_LENGTH, MSG.PASSWORD_MIN).required(MSG.PASSWORD_REQUIRED),
});

const Login = () => {
  const navigate = useNavigate();
  const { setAuthenticateHandler } = useGlobalContext();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  const login = (payload) => {
    AuthAPI.login(payload)
      .then((res) => {
        const accessToken = res.tokens.access.token;
        const refreshToken = res.tokens.refresh.token;
        setLocalAccessToken(accessToken);
        setLocalRefreshToken(refreshToken);
        setAuthenticateHandler(true);
        navigate(`/${ROUTE.TASK}`);
      })
      .catch((err) => {
        snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
      });
  };

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
            <Link className="aLink" to={`/${ROUTE.FORGOT_PASSWORD}`}>
              Forgot Password
            </Link>
          </div>
          <div className="actionBtnWrap">
            <CustomButton name="Login" type="submit" />
          </div>
          <div className="accountOrLoginOptWrap">
            <span className="txt">
              Don't have an account?
              <b>
                <Link className="aLink" to={`/${ROUTE.SIGNUP}`}>
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
