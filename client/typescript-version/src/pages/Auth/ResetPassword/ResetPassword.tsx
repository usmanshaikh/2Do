import { useEffect, useRef } from "react";
import * as yup from "yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { Box, Icon, TextField } from "@mui/material";
import { authApi } from "../../../api";
import { MSG, ROUTES } from "../../../utils/constants";
import { CustomButton } from "../../../components";
import { useAppDispatch } from "../../../hooks";
import { showSnackbar } from "../../../store/slices";
import { getAxiosErrorMessage } from "../../../utils/helpers";
import "../Auth.scss";

const validationSchema = yup.object({
  newPassword: yup
    .string()
    .min(MSG.VALIDATION.PASSWORD.MIN_LENGTH, MSG.VALIDATION.PASSWORD.LENGTH_ERROR)
    .required(MSG.VALIDATION.PASSWORD.REQUIRED),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], MSG.VALIDATION.PASSWORD.NOT_MATCH)
    .required(MSG.VALIDATION.CONFIRM_PASSWORD.REQUIRED),
});

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const tokenRef = useRef<string | null>(null);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values.newPassword);
    },
  });

  const handleSubmit = async (password: string) => {
    try {
      const token = tokenRef.current;
      if (token) {
        await authApi.resetPassword({ password, token });
        navigate(`/${ROUTES.RESET_PASSWORD_SUCCESS}`);
      }
    } catch (error) {
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

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
    <Box className="resetPageWrapper commonAuthWrapper">
      <Box className="backBtnWrap">
        <Link to={`/${ROUTES.LOGIN}`}>
          <Icon>keyboard_backspace</Icon>
        </Link>
      </Box>
      <h1 className="heading">Reset Password</h1>
      <span className="subHeading">
        Reset code was sent to your email. Please enter the code and create new password.
      </span>
      <Box className="formWrapper">
        <form onSubmit={formik.handleSubmit}>
          <Box className="commonInputWrap">
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
          </Box>
          <Box className="commonInputWrap">
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
          </Box>
          <Box className="actionBtnWrap">
            <CustomButton name="Change Password" type="submit" />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
