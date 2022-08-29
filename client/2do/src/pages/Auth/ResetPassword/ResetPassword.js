import React, { useContext, useEffect, useRef } from "react";
import * as yup from "yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { Icon, TextField } from "@mui/material";
import { GlobalSnackbarAlertContext } from "../../../utils/contexts";
import { AuthAPI } from "../../../api";
import constants from "../../../utils/constants";
import CustomButton from "../../../components/CustomButton/CustomButton";
import "../Auth.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const validationSchema = yup.object({
  newPassword: yup.string().min(MSG.PASSWORD_LENGTH, MSG.PASSWORD_MIN).required(MSG.PASSWORD_REQUIRED),
  confirmPassword: yup.string().when("newPassword", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("newPassword")], MSG.PASSWORD_NOT_MATCH),
  }),
});

const ResetPassword = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);
  const tokenRef = useRef();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const token = tokenRef.current;
      const payload = { password: values.newPassword };
      AuthAPI.resetPassword(payload, token)
        .then(() => {
          navigate(`/${ROUTE.RESET_PASSWORD_SUCCESS}`);
        })
        .catch((err) => {
          snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
        });
    },
  });

  const removeTokenFromURL = () => {
    tokenRef.current = searchParams.get("token");
    if (tokenRef.current) {
      searchParams.delete("token");
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    removeTokenFromURL();
  }, []);

  return (
    <div className="resetPageWrapper commonAuthWrapper">
      <div className="backBtnWrap">
        <Link to={`/${ROUTE.LOGIN}`}>
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
      </div>
    </div>
  );
};

export default ResetPassword;
