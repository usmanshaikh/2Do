import React, { useContext } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useModal } from "mui-modal-provider";
import { Icon, TextField } from "@mui/material";
import { GlobalSnackbarAlertContext } from "../../../utils/contexts";
import { AuthAPI } from "../../../api";
import { SuccessModal } from "../../../components/Modals";
import CustomButton from "../../../components/CustomButton/CustomButton";
import constants from "../../../utils/constants";
import "../Auth.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const validationSchema = yup.object({
  name: yup
    .string()
    .required(MSG.NAME_REQUIRED)
    .matches(/^[a-zA-Z\s]+$/, MSG.NAME_ONLY_ALPHABETS), // Correct regex for name validation
  email: yup.string().email(MSG.EMAIL_INVALID).required(MSG.EMAIL_REQUIRED),
  password: yup
    .string()
    .min(8, MSG.PASSWORD_MIN) // Minimum length of 8
    .matches(/[A-Za-z]/, MSG.PASSWORD_MUST_CONTAIN_LETTER) // At least one letter
    .matches(/\d/, MSG.PASSWORD_MUST_CONTAIN_NUMBER) // At least one number
    .required(MSG.PASSWORD_REQUIRED),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], MSG.PASSWORD_NOT_MATCH) // Must match password
    .required(MSG.CONFIRM_PASSWORD_REQUIRED), // Make it required
});

const SignUp = () => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      delete values.confirmPassword;
      register(values);
    },
  });

  const register = (payload) => {
    AuthAPI.register(payload)
      .then((res) => {
        const initialState = {
          message: MSG.ACCOUNT_CREATED,
          onClose: () => navigateTo(),
        };
        showModal(SuccessModal, initialState, { destroyOnClose: true });
      })
      .catch((err) => {
        snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
      });
  };

  const navigateTo = () => {
    navigate(`/${ROUTE.LOGIN}`);
  };

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
