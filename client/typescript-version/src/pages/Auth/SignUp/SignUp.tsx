import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useModal } from "mui-modal-provider";
import { Box, Icon, TextField } from "@mui/material";
import { authApi } from "../../../api";
import { SuccessModal, CustomButton } from "../../../components";
import { MSG, ROUTES } from "../../../utils/constants";
import { RegisterPayload } from "../../../api/types";
import { useAppDispatch } from "../../../hooks";
import { showSnackbar } from "../../../store/slices";
import "../Auth.scss";

const validationSchema = yup.object({
  name: yup.string().required(MSG.VALIDATION.NAME.REQUIRED),
  email: yup.string().email(MSG.VALIDATION.EMAIL.INVALID).required(MSG.VALIDATION.EMAIL.REQUIRED),
  password: yup
    .string()
    .min(MSG.VALIDATION.PASSWORD.MIN_LENGTH, MSG.VALIDATION.PASSWORD.LENGTH_ERROR)
    .matches(/[A-Za-z]/, MSG.VALIDATION.PASSWORD.MUST_CONTAIN.LETTER)
    .matches(/\d/, MSG.VALIDATION.PASSWORD.MUST_CONTAIN.NUMBER)
    .required(MSG.VALIDATION.PASSWORD.REQUIRED),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], MSG.VALIDATION.PASSWORD.NOT_MATCH)
    .required(MSG.VALIDATION.CONFIRM_PASSWORD.REQUIRED),
});

const SignUp = () => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ confirmPassword, ...values }) => handleRegister(values),
  });

  const handleRegister = async (values: RegisterPayload) => {
    try {
      await authApi.register(values);
      const initialState = {
        message: MSG.USER_FEEDBACK.ACCOUNT_CREATED,
        onClose: () => navigate(`/${ROUTES.LOGIN}`),
      };
      showModal(SuccessModal, initialState, { destroyOnClose: true });
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  return (
    <Box className="signUpPageWrapper commonAuthWrapper">
      <Box className="backBtnWrap">
        <Link to={`/${ROUTES.LOGIN}`}>
          <Icon>keyboard_backspace</Icon>
        </Link>
      </Box>
      <h1 className="heading">Create Account</h1>
      <span className="subHeading">Hello! Sign up to get started</span>
      <Box className="formWrapper">
        <form onSubmit={formik.handleSubmit}>
          <Box className="commonInputWrap">
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
          </Box>
          <Box className="commonInputWrap">
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
          </Box>
          <Box className="commonInputWrap">
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
            <CustomButton name="Sign up" type="submit" />
          </Box>
        </form>
      </Box>
      <Box className="accountOrLoginOptWrap">
        <span className="txt">
          Already have a account?
          <b>
            <Link className="aLink" to={`/${ROUTES.LOGIN}`}>
              Login
            </Link>
          </b>
        </span>
      </Box>
    </Box>
  );
};

export default SignUp;
